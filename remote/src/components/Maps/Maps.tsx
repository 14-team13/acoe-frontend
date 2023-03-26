import 'ol/ol.css';
import { useEffect, useState, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { Map, View } from 'ol';
import { fromLonLat, get as getProjection } from 'ol/proj';
import { XYZ } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

const MapWrap = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Maps = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapObj = new Map({
      view: new View({
        center: fromLonLat([126.930583, 37.566801]),
        zoom: 16,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({ url: "http://xdworld.vworld.kr:8080/2d/Base/202002/{z}/{x}/{y}.png" }),
        }),
      ],
      target: mapRef.current
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });


    // Add markers to the vector layer
    const newMarkers = [
      { lon: 126.9327183, lat: 37.570655, name: '공간커피' },
      { lon: 126.9263647, lat: 37.5630577, name: '테일러커피 연남점' },
      { lon: 126.930583, lat: 37.566801, name: '스타벅스 연희동점' },
    ];

    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      }),
    });

    const newFeatures = newMarkers.map((marker) => {
      const point = new Point(fromLonLat([marker.lon, marker.lat]));
      const feature = new Feature({
        geometry: point,
        name: marker.name,
      });
      feature.setStyle(markerStyle);
      return feature;
    });


    mapObj.on('click', (evt) => {
      let feature = mapObj.forEachFeatureAtPixel(evt.pixel,
        (feature) => {
          return feature;
        });

      if (feature) {
        // console.log(feature)
        alert(feature.get('name'));
      }
    });


    vectorSource.addFeatures(newFeatures);

    mapObj.addLayer(vectorLayer);
    mapObj.setTarget(mapRef.current);

    return () => mapObj.setTarget('');
  }, []);

  return <MapWrap ref={mapRef} />;
};

export default Maps;
