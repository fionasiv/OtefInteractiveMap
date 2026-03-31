import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { locations, LocationData } from '../data/locations';
import { MarkerIcon } from './MarkerIcon';
import { renderToStaticMarkup } from 'react-dom/server';

interface MapViewProps {
  onLocationSelect: (location: LocationData) => void;
  selectedLocation: LocationData | null;
}

// Component to handle map centering and zooming
const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const MapView: React.FC<MapViewProps> = ({ onLocationSelect, selectedLocation }) => {
  const defaultCenter: [number, number] = [31.45, 34.5]; // Gaza Envelope center
  const defaultZoom = 11;

  const createCustomIcon = (location: LocationData) => {
    const isSelected = selectedLocation?.id === location.id;
    const iconHtml = renderToStaticMarkup(
      <MarkerIcon type={location.eventType} isSelected={isSelected} />
    );

    return L.divIcon({
      html: iconHtml,
      className: 'custom-marker-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true}
        className="z-0"
        zoomControl={false}
      >
        {/* Dark Mode Topographic Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {selectedLocation && (
          <ChangeView 
            center={[selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]} 
            zoom={13} 
          />
        )}

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.coordinates.lat, loc.coordinates.lng]}
            icon={createCustomIcon(loc)}
            eventHandlers={{
              click: () => onLocationSelect(loc),
            }}
          >
            <Popup className="custom-popup">
              <div className="text-right font-sans">
                <h4 className="font-bold text-idf-olive">{loc.locationName}</h4>
                <p className="text-xs text-gray-500">{loc.eventType}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 z-[500] bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-idf-olive/20 hidden md:block">
        <h5 className="font-bold text-idf-olive mb-3 text-sm border-b border-idf-olive/10 pb-2">מקרא מפה</h5>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs font-medium">
            <div className="w-6 h-6 rounded-full bg-idf-olive/10 flex items-center justify-center text-idf-olive">
              <MarkerIcon type="Military Base" />
            </div>
            <span>בסיס / מוצב צבאי</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <div className="w-6 h-6 rounded-full bg-idf-olive/10 flex items-center justify-center text-idf-olive">
              <MarkerIcon type="Civilian Community" />
            </div>
            <span>יישוב אזרחי</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <div className="w-6 h-6 rounded-full bg-idf-olive/10 flex items-center justify-center text-idf-olive">
              <MarkerIcon type="Battle" />
            </div>
            <span>זירת קרב</span>
          </div>
        </div>
      </div>
    </div>
  );
};
