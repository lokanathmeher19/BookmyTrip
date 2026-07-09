import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Hotel as HotelIcon, Star, MapPin } from 'lucide-react';

const HotelSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await api.get('/hotels/search');
        setHotels(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Hotel Search Results</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm text-gray-700">Star Rating</label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center"><input type="checkbox" className="mr-2" /> 5 Star</label>
                  <label className="flex items-center"><input type="checkbox" className="mr-2" /> 4 Star</label>
                  <label className="flex items-center"><input type="checkbox" className="mr-2" /> 3 Star</label>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="w-full lg:w-3/4 space-y-4">
            {loading ? (
              <div className="text-center py-10">Loading hotels...</div>
            ) : hotels.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No hotels found for this city.</div>
            ) : (
              hotels.map((hotel) => (
                <div key={hotel._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  <div className="w-full md:w-1/3 h-48 rounded-xl overflow-hidden relative">
                    <img src={hotel.images[0] || 'https://via.placeholder.com/400x300?text=Hotel'} alt={hotel.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold">{hotel.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                        <MapPin className="w-4 h-4" /> {hotel.address}, {hotel.city}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities?.map((amenity, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-500">Price per night</p>
                        <p className="text-2xl font-bold text-gray-900">₹{hotel.pricePerNight}</p>
                        <p className="text-xs text-red-500 font-semibold">{hotel.roomsAvailable} Rooms Left</p>
                      </div>
                      <button 
                        onClick={() => navigate(`/booking/${hotel._id}?type=hotel&class=Standard`)}
                        className="bg-[var(--color-brand-blue)] hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-colors"
                      >
                        Book Now
                      </button>
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

export default HotelSearch;
