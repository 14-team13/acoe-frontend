import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import markerSvg from '../../images/marker.svg'

const Maps = (props) => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapObj = new Map({
      view: new View({
        center: fromLonLat([126.930583, 37.566801]),
        zoom: 16,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
            crossOrigin: 'anonymous'
          }),
        }),
      ],
      target: mapRef.current
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    
    const markerStyle = new Style({
      image: new Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 2],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        src: markerSvg,
        scale: 0.75,
        className :"marker-icon"
      })),
    });


    mapObj.on("click", (evt) => {
      const feature = mapObj.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => {
          return feature;
        }
      );

      if (feature) {
        alert(feature.get("name"));
      }
    });

    const features = props.newMarkers.map((marker) => {
      const point = new Point(fromLonLat([marker.x, marker.y]));
      const feature = new Feature({
        geometry: point,
        name: marker.cafeNm,
      });
      feature.setStyle(markerStyle);
      return feature;
    });

    vectorSource.clear();
    vectorSource.addFeatures(features);

    mapObj.addLayer(vectorLayer);
    mapObj.setTarget(mapRef.current);

    return () => {
      mapObj.setTarget('');
    };
  }, [props.newMarkers]);

  return (
    <div className="map-wrap" ref={mapRef} />
  )
}

export default Maps;
