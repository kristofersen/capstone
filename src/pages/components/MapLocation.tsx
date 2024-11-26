  // src/components/MapLocation.tsx
  import React, { useState, useEffect } from 'react';
  import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
  import L, { LatLngExpression, Marker as LeafletMarker } from 'leaflet';
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
    onLocationChange: (lat: number, lng: number) => void;
  }

  const MapLocation: React.FC<MapLocationProps> = ({ initialLat, initialLng, onLocationChange }) => {
    const [position, setPosition] = useState<LatLngExpression>([initialLat, initialLng]);
    const [marker, setMarker] = useState<LeafletMarker | null>(null);
    const [address, setAddress] = useState<string>("");

    // Custom hook for handling map events
    const MapEventHandler = () => {
      useMapEvents({
        click(e) {
          if (marker) {
            marker.setLatLng(e.latlng);
            setPosition(e.latlng);
            onLocationChange(e.latlng.lat, e.latlng.lng);
          }
        }
      });
      return null;
    };

    // Custom component to update the map center
    const MapCenterUpdater = ({ center }: { center: LatLngExpression }) => {
      const map = useMap();
      useEffect(() => {
        map.setView(center, map.getZoom());
      }, [center, map]);
      return null;
    };

    useEffect(() => {
      if (marker) {
        marker.on('dragend', () => {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          onLocationChange(newPosition.lat, newPosition.lng);
        });
      }
    }, [marker, onLocationChange]);

    // Function to search for an address using the Nominatim API
    const searchAddress = async () => {
      if (!address) return;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const results = await response.json();

        if (results && results.length > 0) {
          const lat = parseFloat(results[0].lat);
          const lng = parseFloat(results[0].lon);
          const newLatLng: LatLngExpression = [lat, lng];

          // Update the marker position and map center
          setPosition(newLatLng);
          if (marker) {
            marker.setLatLng(newLatLng);
          }
          onLocationChange(lat, lng);
        } else {
          alert("Address not found. Please try a different address.");
        }
      } catch (error) {
        console.error("Failed to fetch address data:", error);
        alert("Error fetching address. Please try again.");
      }
    };

    return (
      <div style={{ position: 'relative' }}>
        {/* Center-aligned Address input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button onClick={(e) => { e.preventDefault(); searchAddress(); }}>Search</button>
        </div>

        {/* Map */}
        <div style={{ width: '100%', height: '500px' }}>
          <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={position}
              draggable={true}
              icon={defaultIcon}
              ref={(m) => setMarker(m as LeafletMarker)}
            />
            <MapEventHandler />
            <MapCenterUpdater center={position} />
          </MapContainer>
        </div>
      </div>
    );
  };

  export default MapLocation;
