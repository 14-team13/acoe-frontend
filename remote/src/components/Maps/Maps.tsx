import 'ol/ol.css';
import { useEffect, useState, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { Map, View } from 'ol';
import { fromLonLat, get as getProjection } from 'ol/proj';
import { XYZ } from "ol/source";
import { Tile as TileLayer } from "ol/layer";


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

    mapObj.setTarget(mapRef.current);

    return () => mapObj.setTarget('');
  }, []);

  return <MapWrap ref={mapRef} />;
};

export default Maps;
