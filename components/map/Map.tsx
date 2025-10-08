'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Business {
  id: number;
  name: string;
  category?: string;
  location: {
    lat: number;
    lng: number;
  };
  address?: string;
  phone?: string;
  distance: number;
}

interface MapProps {
  businesses: Business[];
  center: [number, number];
  zoom?: number;
  onBusinessClick?: (business: Business) => void;
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

export default function Map({ businesses, center, zoom = 12, onBusinessClick }: MapProps) {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full rounded-lg"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} zoom={zoom} />
        
        {businesses.map((business) => (
          <Marker
            key={business.id}
            position={[business.location.lat, business.location.lng]}
            eventHandlers={{
              click: () => onBusinessClick?.(business),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg">{business.name}</h3>
                {business.address && (
                  <p className="text-sm text-gray-600 mt-1">{business.address}</p>
                )}
                {business.phone && (
                  <p className="text-sm text-gray-600">{business.phone}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {(business.distance / 1000).toFixed(1)} km
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
