import React from 'react';
import { Shield, Map as MapIcon, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-idf-olive text-white z-[1000] shadow-xl flex items-center justify-between px-8 border-b-4 border-idf-olive-dark">
      <div className="flex items-center gap-4">
        <div className="bg-white/10 p-2 rounded-lg">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight leading-none">מפת מורשת וגבורה</h1>
          <p className="text-xs opacity-70 mt-1 uppercase tracking-widest font-medium">אירועי ה-7 באוקטובר | עוטף עזה</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <button className="flex items-center gap-2 text-sm font-bold hover:text-heritage-sand transition-colors">
          <MapIcon className="w-4 h-4" />
          <span>מפה אינטראקטיבית</span>
        </button>
        <button className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
          <BookOpen className="w-4 h-4" />
          <span>ערכי צה"ל ולקחים</span>
        </button>
      </nav>

      <div className="flex items-center gap-4">
        <div className="text-left hidden sm:block">
          <p className="text-[10px] opacity-50 leading-none">מיועד עבור</p>
          <p className="text-sm font-bold leading-tight">צוערי בה"ד 1</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
          <span className="font-bold text-xs">צה"ל</span>
        </div>
      </div>
    </header>
  );
};
