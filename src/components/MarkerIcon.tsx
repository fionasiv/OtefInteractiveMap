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
        return <Shield className="w-6 h-6" />;
      case 'Civilian Community':
        return <Users className="w-6 h-6" />;
      case 'Battle':
        return <Sword className="w-6 h-6" />;
      default:
        return <MapPin className="w-6 h-6" />;
    }
  };

  return (
    <div className={`
      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
      ${isSelected 
        ? 'bg-idf-olive text-white border-white scale-125 shadow-lg z-50' 
        : 'bg-white text-idf-olive border-idf-olive hover:scale-110 shadow-md'}
    `}>
      {getIcon()}
    </div>
  );
};
