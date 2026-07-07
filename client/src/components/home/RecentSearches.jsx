import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const RecentSearches = () => {
  const searches = [
    { from: 'NDLS', to: 'BCT', date: '12 Oct' },
    { from: 'BLR', to: 'DEL', date: '15 Oct' },
    { from: 'MAA', to: 'HYD', date: '20 Oct' },
  ];

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
      <span className="text-sm font-semibold text-gray-200">Recent Searches:</span>
      <div className="flex flex-wrap gap-3 justify-center">
        {searches.map((s, idx) => (
          <div key={idx} className="bg-white/90 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full flex items-center text-sm shadow-sm cursor-pointer hover:bg-white transition-all text-gray-900">
            <MapPin className="w-4 h-4 mr-1 text-red-600" />
            <span className="font-bold">{s.from}</span>
            <span className="mx-2 text-gray-400">-</span>
            <span className="font-bold">{s.to}</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-xs font-semibold text-gray-500">{s.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
