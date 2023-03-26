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
        center: fromLonLat([126.92054263154023, 37.56311839665308]),
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
    mapObj.addLayer(vectorLayer);

    // Add markers to the vector layer
    const newMarkers = [
      { lon: 126.92054263154023, lat: 37.56311839665308, name: 'Marker 1' },
      { lon: 127.92054263154023, lat: 36, name: 'Marker 2' },
      { lon: -0.118092, lat: 51.509865, name: 'Marker 3' },
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
    vectorSource.addFeatures(newFeatures);
    mapObj.setTarget(mapRef.current);

    return () => mapObj.setTarget('');
  }, []);

  return <MapWrap ref={mapRef} />;
};

export default Maps;
