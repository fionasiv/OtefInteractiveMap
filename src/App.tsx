/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { MapView } from './components/MapView';
import { InfoPanel } from './components/InfoPanel';
import { LocationData } from './data/locations';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const handleClosePanel = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 relative mt-20">
        <MapView 
          onLocationSelect={handleLocationSelect} 
          selectedLocation={selectedLocation} 
        />
        
        <InfoPanel 
          location={selectedLocation} 
          onClose={handleClosePanel} 
        />

        {/* Welcome Overlay (Desktop only) */}
        <AnimatePresence>
          {!selectedLocation && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-8 right-8 z-[400] max-w-sm bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-idf-olive/10 hidden md:block"
            >
              <h2 className="text-2xl font-bold text-idf-olive mb-4">ברוכים הבאים, צוערים</h2>
              <p className="text-heritage-gray leading-relaxed mb-6">
                מפה זו נועדה לשמש ככלי לימודי וחינוכי להכרת אירועי הגבורה והלחימה בעוטף עזה. 
                נווטו במפה ולחצו על הנקודות השונות כדי ללמוד על המנהיגות, ההחלטות והערכים שהופגנו בשטח.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-idf-olive-dark">
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
