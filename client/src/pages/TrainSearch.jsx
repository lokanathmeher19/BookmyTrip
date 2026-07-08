import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Train as TrainIcon, Clock, ArrowRight, CalendarDays } from 'lucide-react';
import TrainScheduleModal from '../components/booking/TrainScheduleModal';

const TrainSearch = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const navigate = useNavigate();
  // In a real app, parse query params from location.search
  // const location = useLocation();

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const { data } = await api.get('/trains/search');
        setTrains(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrains();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Train Search Results</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Mock) */}
          <div className="w-full lg:w-1/4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm text-gray-700">Class</label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center"><input type="checkbox" className="mr-2" /> 1A</label>
                  <label className="flex items-center"><input type="checkbox" className="mr-2" /> 2A</label>
                  <label className="flex items-center"><input type="checkbox" className="mr-2" /> 3A</label>
                  <label className="flex items-center"><input type="checkbox" className="mr-2" /> SL</label>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="w-full lg:w-3/4 space-y-4">
            {loading ? (
              <div className="text-center py-10">Loading trains...</div>
            ) : trains.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No trains found for this route.</div>
            ) : (
              trains.map((train) => (
                <div key={train._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
                  <div className="flex-1 w-full md:w-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          {train.trainName}
                          <button onClick={() => setSelectedSchedule(train)} className="text-xs font-semibold text-brand-blue bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 flex items-center gap-1 transition-colors">
                            <CalendarDays className="w-3 h-3" /> Schedule
                          </button>
                        </h4>
                        <p className="text-sm text-gray-500">#{train.trainNumber} | Runs on: {train.runsOn.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{train.departureTime}</p>
                        <p className="text-sm font-semibold text-gray-600">{train.source}</p>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center px-4">
                        <p className="text-xs text-gray-500 mb-1 flex items-center"><Clock className="w-3 h-3 mr-1"/> {train.duration}</p>
                        <div className="w-full h-[2px] bg-gray-300 relative">
                          <TrainIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary w-5 h-5 bg-gray-50" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{train.arrivalTime}</p>
                        <p className="text-sm font-semibold text-gray-600">{train.destination}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto md:ml-6 mt-4 md:mt-0 flex md:flex-col gap-2 overflow-x-auto">
                    {train.classes.map((cls, idx) => {
                      let bgClass = '';
                      let textClass = '';
                      if (cls.status === 'AVAILABLE') {
                        bgClass = 'bg-[var(--color-status-confirmed-bg)] border-[var(--color-status-confirmed-text)]/20';
                        textClass = 'text-[var(--color-status-confirmed-text)]';
                      } else if (cls.status === 'WAITLIST') {
                        bgClass = 'bg-[var(--color-status-waitlist-bg)] border-[var(--color-status-waitlist-text)]/20';
                        textClass = 'text-[var(--color-status-waitlist-text)]';
                      } else {
                        // RAC or other
                        bgClass = 'bg-[var(--color-status-rac-bg)] border-[var(--color-status-rac-text)]/20';
                        textClass = 'text-[var(--color-status-rac-text)]';
                      }
                      
                      return (
                        <div key={idx} 
                          onClick={() => navigate(`/booking/${train._id}?type=train&class=${cls.type}`)}
                          className={`cursor-pointer p-3 border rounded-xl min-w-[120px] text-center transition-transform hover:scale-105 ${bgClass}`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-gray-800">{cls.type}</span>
                            <span className="font-bold text-gray-800">₹{cls.fare}</span>
                          </div>
                          <div className={`text-xs font-bold ${textClass}`}>
                            {cls.status} ({cls.availableSeats})
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <TrainScheduleModal train={selectedSchedule} onClose={() => setSelectedSchedule(null)} />
    </div>
  );
};

export default TrainSearch;
