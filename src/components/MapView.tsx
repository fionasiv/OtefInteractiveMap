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
  isDarkMode: boolean;
}

// Component to handle map centering and zooming
const ChangeView = ({ center, zoom, bounds }: { center?: [number, number], zoom?: number, bounds?: L.LatLngBoundsExpression }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (center && zoom !== undefined) {
      map.setView(center, zoom);
    }
  }, [center, zoom, bounds, map]);
  return null;
};

export const MapView: React.FC<MapViewProps> = ({ onLocationSelect, selectedLocation, isDarkMode }) => {
  const defaultCenter: [number, number] = [31.45, 34.5]; // Gaza Envelope center
  const defaultZoom = 11;

  // Calculate bounds for all locations
  const allBounds = L.latLngBounds(locations.map(loc => [loc.coordinates.lat, loc.coordinates.lng]));

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

  const tileUrl = isDarkMode 
    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  return (
    <div className="relative w-full h-full transition-colors duration-300">
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true}
        className="z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
          url={tileUrl}
        />

        {selectedLocation ? (
          <ChangeView 
            center={[selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]} 
            zoom={13} 
          />
        ) : (
          <ChangeView bounds={allBounds} />
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
              <div className="text-right font-sans p-1">
                <h4 className="font-bold text-idf-olive text-sm">{loc.locationName}</h4>
                <p className="text-[10px] text-gray-500 font-bold mt-0.5">{loc.eventType}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 z-[500] bg-theme-card glass p-6 rounded-3xl modern-shadow border border-theme-border hidden md:block min-w-[200px]">
        <h5 className="font-bold text-theme-text mb-4 text-sm uppercase tracking-wider">מקרא מפה</h5>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs font-bold text-theme-text/80">
            <div className="w-8 h-8 rounded-xl bg-theme-text/5 flex items-center justify-center text-theme-text border border-theme-border">
              <MarkerIcon type="Military Base" />
            </div>
            <span>בסיס / מוצב צבאי</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-theme-text/80">
            <div className="w-8 h-8 rounded-xl bg-theme-text/5 flex items-center justify-center text-theme-text border border-theme-border">
              <MarkerIcon type="Civilian Community" />
            </div>
            <span>יישוב אזרחי</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-theme-text/80">
            <div className="w-8 h-8 rounded-xl bg-theme-text/5 flex items-center justify-center text-theme-text border border-theme-border">
              <MarkerIcon type="Battle" />
            </div>
            <span>זירת קרב</span>
          </div>
        </div>
      </div>
    </div>
  );
};
