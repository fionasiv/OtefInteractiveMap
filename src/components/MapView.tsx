import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { locations, LocationData } from '../data/locations';
import { MarkerIcon } from './MarkerIcon';
import { renderToStaticMarkup } from 'react-dom/server';
import { Navigation, Maximize } from 'lucide-react';

interface MapViewProps {
  onLocationSelect: (location: LocationData) => void;
  selectedLocation: LocationData | null;
  isDarkMode: boolean;
}

// Component to handle map centering, zooming and size invalidation
const MapController = ({ center, zoom, bounds }: { center?: [number, number], zoom?: number, bounds?: L.LatLngBoundsExpression }) => {
  const map = useMap();

  useEffect(() => {
    // Fix for "half loading" map issues on mobile/dynamic containers
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (bounds) {
      // Narrower padding for a tighter fit
      const isMobile = window.innerWidth < 768;
      const padding: [number, number] = isMobile ? [40, 20] : [50, 50];
      map.fitBounds(bounds, { padding, maxZoom: 22 });
    } else if (center && zoom !== undefined) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, bounds, map]);

  return null;
};

export const MapView: React.FC<MapViewProps> = ({ onLocationSelect, selectedLocation, isDarkMode }) => {
  const defaultCenter: [number, number] = [31.45, 34.5]; // Gaza Envelope center
  const defaultZoom = 13;
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapView, setMapView] = useState<{ center?: [number, number], zoom?: number, bounds?: L.LatLngBoundsExpression | null }>({ bounds: null });
  const [isMapReady, setIsMapReady] = useState(false);

  // Calculate bounds for all locations once
  const allBounds = useMemo(() => {
    return L.latLngBounds(locations.map(loc => [loc.coordinates.lat, loc.coordinates.lng]));
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const handleLocateMe = () => {
    if (userLocation) {
      setMapView({ center: userLocation, zoom: 15, bounds: null });
    } else {
      alert("לא ניתן למצוא את המיקום שלך. וודא שהרשאות המיקום מאושרות.");
    }
  };

  const handleResetView = () => {
    setMapView({ bounds: allBounds });
  };

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

  const createUserIcon = () => {
    return L.divIcon({
      html: renderToStaticMarkup(
        <div className="relative flex items-center justify-center">
          <div className="absolute w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-75" />
          <div className="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
        </div>
      ),
      className: 'user-location-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const tileUrl = isDarkMode 
    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  return (
    <div className="relative w-full h-full transition-colors duration-300 bg-[#E5E3DF] dark:bg-[#242424]">
      {!isMapReady && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-theme-bg/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-idf-olive border-t-transparent rounded-full animate-spin" />
            <p className="text-idf-olive font-bold animate-pulse text-sm">טוען מפה...</p>
          </div>
        </div>
      )}
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        zoomControl={false}
        whenReady={() => setIsMapReady(true)}
        preferCanvas={true}
        tap={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
          url={tileUrl}
          keepBuffer={8}
          updateWhenIdle={false}
          updateWhenZooming={false}
        />

        {mapView.bounds ? (
          <MapController bounds={mapView.bounds} />
        ) : mapView.center ? (
          <MapController center={mapView.center} zoom={mapView.zoom} />
        ) : (
          <MapController bounds={allBounds} />
        )}

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.coordinates.lat, loc.coordinates.lng]}
            icon={createCustomIcon(loc)}
            eventHandlers={{
              click: (e) => {
                L.DomEvent.stopPropagation(e);
                onLocationSelect(loc);
              },
            }}
          >
            <Popup className="custom-popup" closeButton={false} offset={[0, -10]}>
              <div className="text-right font-sans p-1 min-w-[120px]">
                <h4 className="font-bold text-idf-olive text-sm leading-tight">{loc.locationName}</h4>
                <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-wider">{loc.eventType}</p>
                <div className="mt-2 text-[9px] text-idf-olive/60 font-medium">לחצו למידע מורחב</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <Marker position={userLocation} icon={createUserIcon()}>
            <Popup offset={[0, -5]}>
              <div className="text-center font-bold text-sm">המיקום שלך</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Control Buttons */}
      <div className="absolute top-24 left-8 z-[500] flex flex-col gap-3">
        <button 
          onClick={handleLocateMe}
          className="bg-theme-card glass p-3 rounded-2xl modern-shadow border border-theme-border text-idf-olive hover:bg-idf-olive/10 transition-all group"
          title="המיקום שלי"
        >
          <Navigation className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button 
          onClick={handleResetView}
          className="bg-theme-card glass p-3 rounded-2xl modern-shadow border border-theme-border text-idf-olive hover:bg-idf-olive/10 transition-all group"
          title="תצוגה כללית"
        >
          <Maximize className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

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
