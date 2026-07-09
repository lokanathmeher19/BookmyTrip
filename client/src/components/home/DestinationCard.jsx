import React from 'react';
import { MapPin } from 'lucide-react';

const DestinationCard = ({ image, city, state, badgeText }) => {
  return (
    <div className="group cursor-pointer w-full aspect-[3/4] bg-white rounded-[2rem] overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20">
      <div className="w-full h-full overflow-hidden relative">
        <img 
          src={image} 
          alt={city} 
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80' }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      </div>
      
      {badgeText && (
        <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-red-600 shadow-sm border border-white/50 transform group-hover:scale-105 transition-transform duration-300">
          {badgeText}
        </div>
      )}
      
      <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-3xl font-extrabold tracking-tight drop-shadow-lg mb-1">{city}</h3>
        <p className="flex items-center text-sm text-gray-200 font-medium drop-shadow-md opacity-90">
          <MapPin className="w-4 h-4 mr-1 text-red-400" />
          {state}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
