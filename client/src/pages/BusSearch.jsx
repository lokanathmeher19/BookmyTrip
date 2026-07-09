import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Bus as BusIcon, Clock } from 'lucide-react';

const BusSearch = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const { data } = await api.get('/buses/search');
        setBuses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Bus Search Results</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm text-gray-700">Seat Type</label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center"><input type="checkbox" className="mr-2" /> Sleeper</label>
                  <label className="flex items-center"><input type="checkbox" className="mr-2" /> Seater</label>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="w-full lg:w-3/4 space-y-4">
            {loading ? (
              <div className="text-center py-10">Loading buses...</div>
            ) : buses.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No buses found for this route.</div>
            ) : (
              buses.map((bus) => (
                <div key={bus._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
                  <div className="flex-1 w-full md:w-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          {bus.operator}
                        </h4>
                        <p className="text-sm text-gray-500">{bus.seatType}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{new Date(bus.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        <p className="text-sm font-semibold text-gray-600">{bus.source}</p>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center px-4">
                        <div className="w-full h-[2px] bg-gray-300 relative">
                          <BusIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary w-5 h-5 bg-gray-50" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{new Date(bus.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        <p className="text-sm font-semibold text-gray-600">{bus.destination}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto md:ml-6 mt-4 md:mt-0 flex md:flex-col gap-2 overflow-x-auto">
                    <div 
                      onClick={() => navigate(`/booking/${bus._id}?type=bus&class=${bus.seatType}`)}
                      className="cursor-pointer p-3 border rounded-xl min-w-[120px] text-center transition-transform hover:scale-105 bg-green-50 border-green-200 flex flex-col justify-center items-center h-full"
                    >
                      <div className="flex flex-col items-center mb-1">
                        <span className="font-bold text-gray-800 text-xl">₹{bus.fare}</span>
                      </div>
                      <div className="text-xs font-bold text-green-600">
                        {bus.availableSeats} Seats Left
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSearch;
