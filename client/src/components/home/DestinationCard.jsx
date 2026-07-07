import React from 'react';
import { MapPin } from 'lucide-react';

const DestinationCard = ({ image, city, state, badgeText }) => {
  return (
    <div className="group cursor-pointer min-w-[200px] w-full bg-white rounded-3xl overflow-hidden relative hover-card-effect shadow-md border border-gray-200">
      <div className="h-64 overflow-hidden relative">
        <img 
          src={image} 
          alt={city} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
      </div>
      
      {badgeText && (
        <div className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full text-xs font-bold text-red-700 shadow-sm border border-gray-100">
          {badgeText}
        </div>
      )}
      
      <div className="absolute bottom-5 left-5 text-white">
        <h3 className="text-2xl font-extrabold tracking-tight drop-shadow-md group-hover:text-red-500 transition-colors">{city}</h3>
        <p className="flex items-center text-sm text-gray-200 mt-1.5 font-medium drop-shadow">
          <MapPin className="w-4 h-4 mr-1 text-red-500" />
          {state}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
