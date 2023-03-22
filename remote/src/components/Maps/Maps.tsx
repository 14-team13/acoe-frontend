import 'ol/ol.css';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Map, View } from 'ol';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';

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
        center: [-11000000, 4600000],
        zoom: 2,
      }),
      layers: [new Tile({ source: new OSM() })],
    });

    mapObj.setTarget(mapRef.current);

    return () => mapObj.setTarget('');
  }, []);

  return <MapWrap ref={mapRef} />;
};

export default Maps;
