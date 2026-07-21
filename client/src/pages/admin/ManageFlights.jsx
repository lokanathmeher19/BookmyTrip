import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, AlertCircle, Plane } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminData from '../../hooks/useAdminData';

const ManageFlights = () => {
  const { data: flights, loading, error, refetch } = useAdminData('/api/flights/search', 5000);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    airline: '', flightNumber: '', source: '', destination: '',
    departureTime: '', arrivalTime: '', price: '', availableSeats: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/flights', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Flight added successfully!');
      setShowForm(false);
      setFormData({ airline: '', flightNumber: '', source: '', destination: '', departureTime: '', arrivalTime: '', price: '', availableSeats: '' });
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add flight');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/flights/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Flight deleted!');
      refetch();
    } catch (err) {
      toast.error('Failed to delete flight');
    }
  };

  if (loading && !flights) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9281C]"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-xl flex items-center"><AlertCircle className="mr-2" /> Error loading flights: {error}</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Manage Flights</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#D9281C] hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center transition-colors shadow-lg shadow-red-500/30">
          <Plus className="w-5 h-5 mr-2" /> Add Flight
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-light p-8 rounded-2xl shadow-lg mb-8 grid grid-cols-2 gap-6 border border-[#D9281C]/20 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D9281C] to-red-400"></div>
          <h3 className="col-span-2 text-xl font-bold text-gray-900 mb-2">New Flight Details</h3>
          
          <input required name="airline" value={formData.airline} onChange={handleChange} placeholder="Airline (e.g., Indigo)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          <input required name="flightNumber" value={formData.flightNumber} onChange={handleChange} placeholder="Flight Number (e.g., 6E-101)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          <input required name="source" value={formData.source} onChange={handleChange} placeholder="Source (e.g., DEL)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          <input required name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination (e.g., BOM)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Departure Time</label>
            <input required type="datetime-local" name="departureTime" value={formData.departureTime} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Arrival Time</label>
            <input required type="datetime-local" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          </div>
          
          <input required type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (₹)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          <input required type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} placeholder="Total Seats" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          
          <div className="col-span-2 flex justify-end mt-4">
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-gray-500 hover:text-gray-700 font-bold mr-4">Cancel</button>
            <button type="submit" className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-md">Save Flight</button>
          </div>
        </form>
      )}

      <div className="glass-light rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Flight</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {flights && flights.map(flight => (
                <tr key={flight._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-gray-900 flex items-center">
                      <Plane className="w-4 h-4 mr-2 text-[#D9281C]" />
                      {flight.airline}
                    </div>
                    <div className="text-sm font-medium text-gray-500 ml-6">{flight.flightNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{flight.source}</span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{flight.destination}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    {new Date(flight.departureTime).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-black text-emerald-600">
                    ₹{flight.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button onClick={() => handleDelete(flight._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {(!flights || flights.length === 0) && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Plane className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500">No flights found. Add one above.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageFlights;
