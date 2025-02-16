// src/components/MapLocation.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icon images in Leaflet with Webpack/CRA
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new L.Icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIconRetinaUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface MapLocationProps {
  initialLat: number;
  initialLng: number;
}

const MapLocationView: React.FC<MapLocationProps> = ({ initialLat, initialLng }) => {
  const [position] = useState<LatLngExpression>([initialLat, initialLng]);

  // Custom component to update the map center
  const MapCenterUpdater = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Map */}
      <div style={{ width: '100%', height: '500px' }}>
        <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={defaultIcon} />
          <MapCenterUpdater center={position} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapLocationView;
