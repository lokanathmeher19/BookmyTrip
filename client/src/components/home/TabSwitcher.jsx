import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Plane, Bus, Hotel, ArrowRightLeft, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StationAutocomplete from './StationAutocomplete';

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState('Trains');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [cateringStation, setCateringStation] = useState('');
  const navigate = useNavigate();

  const tabs = [
    { name: 'Trains', icon: <Train className="w-5 h-5 mr-2" /> },
    { name: 'Flights', icon: <Plane className="w-5 h-5 mr-2" /> },
    { name: 'Bus', icon: <Bus className="w-5 h-5 mr-2" /> },
    { name: 'Hotels', icon: <Hotel className="w-5 h-5 mr-2" /> },
    { name: 'E-Catering', icon: <Utensils className="w-5 h-5 mr-2" /> },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/${activeTab.toLowerCase()}/search`);
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'Trains':
        return (
          <motion.form 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4 w-full" onSubmit={handleSearch}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <StationAutocomplete 
                label="From" 
                placeholder="Enter Source" 
                value={fromStation} 
                onChange={setFromStation} 
              />
              <div className="hidden md:flex items-center justify-center -mx-2 z-10 bg-white rounded-full p-2 shadow-sm border border-gray-200 mt-4">
                <ArrowRightLeft className="w-5 h-5 text-gray-500" />
              </div>
              <StationAutocomplete 
                label="To" 
                placeholder="Enter Destination" 
                value={toStation} 
                onChange={setToStation} 
              />
              <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Date</label>
                <input type="date" className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-200 font-medium text-base text-gray-900 shadow-sm" required />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Quota</label>
                <select className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-200 font-medium text-base text-gray-900 shadow-sm">
                  <option value="GENERAL">GENERAL</option>
                  <option value="LADIES">LADIES</option>
                  <option value="LOWER BERTH/SR.CITIZEN">LOWER BERTH/SR.CITIZEN</option>
                  <option value="PERSON WITH DISABILITY">PERSON WITH DISABILITY</option>
                  <option value="DUTY PASS">DUTY PASS</option>
                  <option value="TATKAL">TATKAL</option>
                  <option value="PREMIUM TATKAL">PREMIUM TATKAL</option>
                </select>
              </div>
              <div className="w-full md:w-auto mt-0 md:mt-5">
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase tracking-wide text-sm shadow-md shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all">Search</button>
              </div>
            </div>
          </motion.form>
        );
      case 'Flights':
        return (
          <motion.div
            key="Flights"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); navigate('/search?type=flight'); }}>
              <div className="flex gap-6 mb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="tripType" value="oneWay" defaultChecked className="text-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)]" />
                  <span className="text-sm font-semibold text-gray-700">One Way</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="tripType" value="roundTrip" className="text-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)]" />
                  <span className="text-sm font-semibold text-gray-700">Round Trip</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="tripType" value="multiCity" className="text-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)]" />
                  <span className="text-sm font-semibold text-gray-700">Multi City</span>
                </label>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <input type="text" placeholder="Departure City" className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-200 font-medium text-base text-gray-900 placeholder-gray-400 shadow-sm" required />
                <div className="hidden md:flex items-center justify-center -mx-6 z-10">
                  <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow text-[var(--color-brand-blue)]">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                </div>
                <input type="text" placeholder="Arrival City" className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-200 font-medium text-base text-gray-900 placeholder-gray-400 shadow-sm" required />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <input type="date" className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all duration-200 font-medium text-base text-gray-900 shadow-sm" required />
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase tracking-wide text-sm shadow-lg transition-all hover:-translate-y-0.5">Search Flights</button>
              </div>
            </form>
          </motion.div>
        );
      case 'Bus':
      case 'Hotels':
        return (
           <motion.form 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex flex-col md:flex-row gap-4 items-center" onSubmit={handleSearch}
          >
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Destination</label>
              <input type="text" placeholder="Enter City" className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all duration-200 font-medium text-base text-gray-900 placeholder-gray-400 shadow-sm" required />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</label>
              <input type="date" className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all duration-200 font-medium text-base text-gray-900 placeholder-gray-400 shadow-sm" required />
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-5">
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase tracking-wide text-sm shadow-md shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all">Search</button>
            </div>
          </motion.form>
        )
      case 'E-Catering':
        return (
          <motion.form 
            key="ECatering"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex flex-col md:flex-row gap-4 items-center" onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Enter PNR</label>
              <input type="text" placeholder="10-digit PNR" maxLength={10} className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all duration-200 font-medium text-base text-gray-900 placeholder-gray-400 shadow-sm" required />
            </div>
            <StationAutocomplete 
              label="Station" 
              placeholder="Select Station" 
              value={cateringStation} 
              onChange={setCateringStation} 
            />
            <div className="w-full md:w-auto mt-4 md:mt-5">
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase tracking-wide text-sm shadow-md shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all">Find Food</button>
            </div>
          </motion.form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] pt-0 pb-6 px-5 md:px-8 -mt-24 relative z-10 mx-4 max-w-4xl lg:mx-auto shadow-2xl border border-gray-200">
      {/* Tabs - Integrated into top */}
      <div className="flex flex-nowrap overflow-x-auto hide-scrollbar border-b border-gray-200 mb-8 -mx-5 md:-mx-8 px-5 md:px-8 bg-gray-50/50 rounded-t-[1.5rem] md:rounded-t-[2rem]">
        <div className="flex gap-2 mx-auto pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-4 md:px-6 py-4 text-sm font-black tracking-wide transition-all duration-300 relative ${
                activeTab === tab.name
                  ? 'text-red-600'
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <div className="flex flex-col items-center gap-1.5 md:flex-row md:gap-2">
                {tab.icon}
                <span>{tab.name}</span>
              </div>
              {activeTab === tab.name && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div className="min-h-[120px]">
        <AnimatePresence mode="wait">
          {renderForm()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabSwitcher;
