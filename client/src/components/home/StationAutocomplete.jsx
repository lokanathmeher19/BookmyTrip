import React, { useState, useRef, useEffect } from 'react';
import { stations } from '../../data/stations';

const StationAutocomplete = ({ label, placeholder, value, onChange }) => {
  const [query, setQuery] = useState(value || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // Filter stations based on search query
  const filteredStations = query 
    ? stations.filter(station => 
        station.name.toLowerCase().includes(query.toLowerCase()) || 
        station.code.toLowerCase().includes(query.toLowerCase()) ||
        station.city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8) // Limit to top 8 matches
    : [];

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (station) => {
    const displayValue = `${station.name} (${station.code})`;
    setQuery(displayValue);
    onChange(displayValue);
    setShowDropdown(false);
  };

  return (
    <div className="flex-1 w-full relative" ref={wrapperRef}>
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => {
          if (query.length > 0) setShowDropdown(true);
        }}
        className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all duration-200 font-medium text-base text-gray-900 placeholder-gray-400 shadow-sm" 
        required 
        autoComplete="off"
      />
      
      {showDropdown && query.length > 0 && filteredStations.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
          {filteredStations.map((station) => (
            <div 
              key={station.code}
              className="px-4 py-3 hover:bg-red-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
              onClick={() => handleSelect(station)}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">{station.name}</span>
                <span className="text-xs font-black bg-gray-100 text-gray-600 px-2 py-1 rounded">{station.code}</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                {station.city && station.city !== station.state && (
                  <span>{station.city}{station.state ? ' •' : ''}</span>
                )}
                {station.state && <span className="font-medium text-red-600">{station.state}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StationAutocomplete;



