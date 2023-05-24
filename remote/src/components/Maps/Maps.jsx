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
import C_tumbler1 from '../../images/C_tumbler1.svg'
import C_tumbler2 from '../../images/C_tumbler2.svg'
import C_tumbler3 from '../../images/C_tumbler3.svg'

const Maps = (props) => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  // Original SVG string
  const originalSvgString = `<svg width="72" height="90" viewBox="0 0 72 90" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M72 36.5389C72 8.66111 48.4639 0.162938 36.1784 0.00114142C36.1198 -0.00142678 36.0586 0.00114142 36 0.00114142C35.9414 0.00114142 35.8802 0.00114142 35.8216 0.00114142C23.5361 0.162938 0 8.66111 0 36.5389C0 64.4167 29.0008 84.798 35.8216 89.7366V89.996C35.8777 89.9549 35.9414 89.9087 36 89.865C36.0612 89.9087 36.1223 89.9549 36.1784 89.996V89.7366C42.9966 84.798 72 64.1779 72 36.5389Z" fill="#2F44FF"/>
  </svg>`;

  // New fill color and additional SVG element
  const fillColor = '#FF0000'; // Red color
  const newSvgElement = '<circle cx="36" cy="36" r="10" fill="#FF0000"/>';
  const modifiedSvgString = originalSvgString.replace('fill="#2F44FF"', `fill="${fillColor}"`) 

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


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
        src: C_tumbler1,
        //src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(C_tumbler1),
        scale: 0.09,
        className :"marker-icon"
      })),
    });

    const markerStyle2 = new Style({
      image: new Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 2],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        src: C_tumbler2,
        //src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(C_tumbler1),
        scale: 0.09,
        className :"marker-icon"
      })),
    });

    const markerStyle3 = new Style({
      image: new Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 2],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        src: C_tumbler3,
        //src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(C_tumbler1),
        scale: 0.09,
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
        props.setClickedCafe(feature.get('item'))
      }
    });

    const features = props.newMarkers.map((marker) => {
      const point = new Point(fromLonLat([marker.x, marker.y]));
      const feature = new Feature({
        geometry: point,
        item  : marker
      });

      if(rand(1, 5) === 1){
        feature.setStyle(markerStyle);
      }else if(rand(1, 5) === 2){
        feature.setStyle(markerStyle2);
      }else{
        feature.setStyle(markerStyle3);
      }
      
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
