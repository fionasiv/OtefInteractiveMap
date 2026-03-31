import React from 'react';
import { MapPin, Shield, Users, Sword } from 'lucide-react';
import { EventType } from '../data/locations';

interface MarkerIconProps {
  type: EventType;
  isSelected?: boolean;
}

export const MarkerIcon: React.FC<MarkerIconProps> = ({ type, isSelected }) => {
  const getIcon = () => {
    switch (type) {
      case 'Military Base':
        return <Shield className="w-5 h-5" />;
      case 'Civilian Community':
        return <Users className="w-5 h-5" />;
      case 'Battle':
        return <Sword className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className={`
      flex items-center justify-center w-10 h-10 rounded-2xl border-2 transition-all duration-300 modern-shadow
      ${isSelected 
        ? 'bg-idf-olive text-white border-white scale-125 z-50' 
        : 'bg-theme-card text-theme-text border-theme-border hover:scale-110'}
    `}>
      {getIcon()}
    </div>
  );
};
