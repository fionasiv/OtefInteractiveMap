import React from 'react';
import { Shield, Map as MapIcon, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-theme-card glass z-[1000] modern-shadow flex items-center justify-between px-8 border-b border-theme-border transition-colors duration-300">
      <div className="flex items-center gap-4">
        <div className="bg-idf-olive p-2.5 rounded-xl shadow-lg shadow-idf-olive/20">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-none text-theme-text">מפת אירועים</h1>
          <p className="text-[10px] text-theme-text/50 mt-1.5 uppercase tracking-widest font-bold">אירועי ה-7 באוקטובר | מתחם הנובה</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-theme-bg border border-theme-border hover:bg-idf-olive/5 transition-all text-theme-text"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-4 border-r border-theme-border pr-6">
          <div className="text-left hidden sm:block">
            <p className="text-[10px] text-theme-text/40 leading-none font-bold">מיועד עבור</p>
            <p className="text-sm font-extrabold text-theme-text leading-tight">צוערי גדוד ארז</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-idf-olive flex items-center justify-center shadow-md">
            <span className="font-bold text-[10px] text-white">צה"ל</span>
          </div>
        </div>
      </div>
    </header>
  );
};
