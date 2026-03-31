import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Info, Lightbulb, Shield, Users, Clock, Video } from 'lucide-react';
import { LocationData } from '../data/locations';
import { getYouTubeEmbedUrl } from '../lib/utils';

interface InfoPanelProps {
  location: LocationData | null;
  onClose: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ location, onClose }) => {
  if (!location) return null;

  const embedUrl = location.primaryVideoUrl ? getYouTubeEmbedUrl(location.primaryVideoUrl) : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-[1000] overflow-y-auto border-l border-idf-olive/20"
      >
        {/* Header Image */}
        <div className="relative h-64 w-full overflow-hidden">
          <img 
            src={location.mediaAssets[0]?.url || "https://picsum.photos/seed/heritage/800/600"} 
            alt={location.locationName}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-idf-olive text-[10px] uppercase tracking-wider font-bold rounded">
                {location.eventType}
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight">{location.locationName}</h2>
            <div className="flex items-center gap-1 text-sm opacity-80 mt-1">
              <MapPin className="w-3 h-3" />
              <span>{location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8 space-y-10">
          
          {/* Narrative Description */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-idf-olive mb-4">
              <Info className="w-5 h-5" />
              <h3 className="font-bold text-lg">תיאור האירוע</h3>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-gray-700 leading-loose text-md">
                {location.description}
              </p>
            </div>
          </section>

          {/* Video Player (Integrated in main flow after description) */}
          {embedUrl && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-idf-olive mb-4">
                <Video className="w-5 h-5" />
                <h3 className="font-bold text-lg">עדות מצולמת</h3>
              </div>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={embedUrl} 
                  title="Video testimony" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-gray-500 italic text-center">
                עדות אישית וסקירה מבצעית מצולמת מהשטח
              </p>
            </section>
          )}

          {/* Timeline Section */}
          {location.timeline && location.timeline.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-idf-olive">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold text-lg">ציר זמן - 7 באוקטובר</h3>
              </div>
              <div className="relative border-r-2 border-idf-olive/20 pr-6 space-y-8 mr-2">
                {location.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -right-[33px] top-1 w-4 h-4 rounded-full bg-idf-olive border-4 border-white shadow-sm" />
                    
                    <div className="flex flex-col">
                      <span className="text-idf-olive font-bold text-sm mb-1">{event.time}</span>
                      <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sub-header (Units) */}
          <section>
            <div className="flex items-center gap-2 text-idf-olive mb-3">
              <Users className="w-5 h-5" />
              <h3 className="font-bold text-lg">כוחות מעורבים</h3>
            </div>
            <p className="text-heritage-gray font-medium leading-relaxed">
              {location.unitInfo}
            </p>
          </section>

          {/* Leadership Focus */}
          <section className="bg-idf-olive/5 p-6 rounded-xl border-r-4 border-idf-olive">
            <div className="flex items-center gap-2 text-idf-olive mb-3">
              <Shield className="w-5 h-5" />
              <h3 className="font-bold text-lg">דגש פיקודי ומנהיגות</h3>
            </div>
            <p className="text-gray-800 leading-relaxed">
              {location.leadershipFocus}
            </p>
          </section>

          {/* Key Takeaway */}
          <section className="bg-heritage-gray text-white p-8 rounded-2xl shadow-inner">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h3 className="font-bold text-xl tracking-tight">נקודה למחשבה / לקח פיקודי</h3>
            </div>
            <p className="text-gray-200 leading-relaxed italic text-lg">
              "{location.lessonsLearned}"
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            מורשת קרב - 7 באוקטובר | צה"ל
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
