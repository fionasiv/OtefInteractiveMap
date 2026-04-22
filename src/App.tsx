/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MapView } from './components/MapView';
import { InfoPanel } from './components/InfoPanel';
import { locations, LocationData } from './data/locations';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const handleClosePanel = () => {
    setSelectedLocation(null);
  };

  useEffect(() => {
    // Preload images for better UX
    locations.forEach(loc => {
      if (loc.mediaAssets[0]?.url) {
        const img = new Image();
        img.src = loc.mediaAssets[0].url;
      }
    });
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col font-sans bg-theme-bg text-theme-text transition-colors duration-300">
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      
      <main className="flex-1 relative mt-20">
        <MapView 
          onLocationSelect={handleLocationSelect} 
          selectedLocation={selectedLocation} 
          isDarkMode={isDarkMode}
        />
        
        <InfoPanel 
          location={selectedLocation} 
          onClose={handleClosePanel} 
        />

        {/* Welcome Overlay (Desktop only) */}
        <AnimatePresence>
          {!selectedLocation && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-8 right-8 z-[400] max-w-sm bg-theme-card glass p-8 rounded-3xl modern-shadow border border-theme-border hidden md:block"
            >
              <div className="w-12 h-12 bg-idf-olive/10 rounded-2xl flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-idf-olive rounded-lg rotate-45" />
              </div>
              <h2 className="text-2xl font-bold text-idf-olive mb-4">ברוכים הבאים, צוערים</h2>
              <p className="text-theme-text/70 leading-relaxed mb-8 text-lg">
                מפה זו נועדה לשמש ככלי לימודי וחינוכי להכרת אירועי הגבורה והלחימה בעוטף עזה. 
                נווטו במפה ולחצו על הנקודות השונות כדי ללמוד על המנהיגות, ההחלטות והערכים שהופגנו בשטח.
              </p>
              <div className="flex items-center gap-3 text-sm font-bold text-idf-olive">
                <div className="w-2 h-2 rounded-full bg-idf-olive animate-pulse" />
                בחרו נקודה על המפה להתחלה
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Instructions */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[400] bg-idf-olive text-white px-6 py-3 rounded-full shadow-lg text-sm font-bold">
        לחצו על סמן במפה לפרטים
      </div>
    </div>
  );
}
