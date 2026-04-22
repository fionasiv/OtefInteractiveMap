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
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-full md:w-[550px] bg-theme-bg shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[2000] overflow-y-auto border-l border-theme-border transition-colors duration-300"
      >
        {/* Header Image Section */}
        <div className="relative h-[400px] w-full overflow-hidden group">
          <img 
            src={location.mediaAssets[0]?.url || "https://picsum.photos/seed/heritage/800/600"} 
            alt={location.locationName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/20 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 p-3 bg-theme-bg/20 hover:bg-theme-bg/40 backdrop-blur-md text-theme-text rounded-2xl transition-all border border-theme-border"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-10 right-10 left-10">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-idf-olive text-[10px] uppercase tracking-widest font-black rounded-lg text-white shadow-lg shadow-idf-olive/20">
                  {location.eventType}
                </span>
                <div className="h-px flex-1 bg-theme-text/10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight text-theme-text tracking-tighter">{location.locationName}</h2>
              <div className="flex items-center gap-2 text-sm font-bold text-theme-text/40">
                <MapPin className="w-4 h-4 text-idf-olive" />
                <span>{location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="px-10 pb-20 space-y-12">
          
          {/* Narrative Description */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-idf-olive">
              <div className="w-10 h-10 rounded-xl bg-idf-olive/10 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="font-black text-xl tracking-tight">תיאור האירוע</h3>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-theme-text/80 leading-relaxed text-lg font-medium">
                {location.description}
              </p>
            </div>
          </section>

          {/* Video Player */}
          {embedUrl && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-idf-olive">
                <div className="w-10 h-10 rounded-xl bg-idf-olive/10 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="font-black text-xl tracking-tight">עדות מצולמת</h3>
              </div>
              <div className="aspect-video w-full rounded-3xl overflow-hidden bg-black modern-shadow border-4 border-theme-card">
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
            </section>
          )}

          {/* Timeline Section */}
          {location.timeline && location.timeline.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-3 text-idf-olive">
                <div className="w-10 h-10 rounded-xl bg-idf-olive/10 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-black text-xl tracking-tight">ציר זמן - 7 באוקטובר</h3>
              </div>
              <div className="relative border-r-2 border-theme-border pr-8 space-y-10 mr-4">
                {location.timeline.map((event, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -right-[41px] top-1.5 w-5 h-5 rounded-full bg-theme-bg border-4 border-idf-olive shadow-md transition-transform group-hover:scale-125" />
                    <div className="flex flex-col bg-theme-card p-5 rounded-2xl border border-theme-border modern-shadow transition-all group-hover:translate-x-2">
                      <span className="text-idf-olive font-black text-sm mb-2 tracking-widest">{event.time}</span>
                      <p className="text-theme-text/90 text-md leading-relaxed font-bold">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bento Style Sections */}
          <div className="grid grid-cols-1 gap-6">
            {/* Involved Forces */}
            <section className="bg-theme-card p-8 rounded-3xl border border-theme-border modern-shadow">
              <div className="flex items-center gap-3 text-idf-olive mb-4">
                <Users className="w-6 h-6" />
                <h3 className="font-black text-xl tracking-tight">כוחות מעורבים</h3>
              </div>
              <p className="text-theme-text/70 font-bold leading-relaxed text-lg">
                {location.unitInfo}
              </p>
            </section>

            {/* Leadership Focus */}
            <section className="bg-idf-olive p-8 rounded-3xl shadow-xl shadow-idf-olive/20 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-white/80" />
                <h3 className="font-black text-xl tracking-tight">דגש פיקודי ומנהיגות</h3>
              </div>
              <p className="text-white/90 leading-relaxed text-lg font-medium">
                {location.leadershipFocus}
              </p>
            </section>

            {/* Key Takeaway */}
            <section className="bg-theme-text text-theme-bg p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-idf-olive/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <Lightbulb className="w-8 h-8 text-idf-olive" />
                <h3 className="font-black text-2xl tracking-tight">לקח פיקודי</h3>
              </div>
              <p className="text-theme-bg/90 leading-relaxed italic text-xl font-bold relative z-10">
                "{location.lessonsLearned}"
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-10 border-t border-theme-border text-center bg-theme-card/50">
          <p className="text-[10px] text-theme-text/30 uppercase tracking-[0.3em] font-black">
            מורשת קרב - 7 באוקטובר | צה"ל | בה"ד 1
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
