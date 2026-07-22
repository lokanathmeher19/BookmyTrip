import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, AlertCircle, Plane, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminData from '../../hooks/useAdminData';

const ManageFlights = () => {
  const { data: flights, loading, error, refetch } = useAdminData('/api/flights/search', 5000);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    airline: '', flightNumber: '', source: '', destination: '',
    departureTime: '', arrivalTime: '', price: '', availableSeats: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ airline: '', flightNumber: '', source: '', destination: '', departureTime: '', arrivalTime: '', price: '', availableSeats: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`/api/flights/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Flight updated successfully!');
      } else {
        await axios.post(`/api/flights`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Flight added successfully!');
      }
      resetForm();
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save flight');
    }
  };

  const handleEdit = (flight) => {
    setFormData({
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      source: flight.source,
      destination: flight.destination,
      departureTime: new Date(flight.departureTime).toISOString().slice(0, 16),
      arrivalTime: new Date(flight.arrivalTime).toISOString().slice(0, 16),
      price: flight.price,
      availableSeats: flight.availableSeats
    });
    setEditingId(flight._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/flights/${id}`, {
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
    <div className="space-y-6 animate-fade-in text-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-white tracking-tight">Manage Flights</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-[#D9281C] hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center transition-colors shadow-lg shadow-red-900/30">
          <Plus className="w-5 h-5 mr-2" /> Add Flight
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg mb-8 grid grid-cols-2 gap-6 border border-gray-700 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D9281C] to-red-400"></div>
          <h3 className="col-span-2 text-xl font-bold text-white mb-2">{editingId ? 'Edit Flight Details' : 'New Flight Details'}</h3>
          
          <input required name="airline" value={formData.airline} onChange={handleChange} placeholder="Airline (e.g., Indigo)" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          <input required name="flightNumber" value={formData.flightNumber} onChange={handleChange} placeholder="Flight Number (e.g., 6E-101)" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          <input required name="source" value={formData.source} onChange={handleChange} placeholder="Source (e.g., DEL)" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          <input required name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination (e.g., BOM)" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 mb-1 ml-1 uppercase">Departure Time</label>
            <input required type="datetime-local" name="departureTime" value={formData.departureTime} onChange={handleChange} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white [color-scheme:dark]" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 mb-1 ml-1 uppercase">Arrival Time</label>
            <input required type="datetime-local" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white [color-scheme:dark]" />
          </div>
          
          <input required type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (₹)" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          <input required type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} placeholder="Total Seats" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          
          <div className="col-span-2 flex justify-end mt-4">
            <button type="button" onClick={resetForm} className="px-6 py-3 text-gray-400 hover:text-white font-bold mr-4">Cancel</button>
            <button type="submit" className="bg-white hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-xl font-bold transition-colors shadow-md">{editingId ? 'Update Flight' : 'Save Flight'}</button>
          </div>
        </form>
      )}

      <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Flight</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Route</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              {flights && flights.map(flight => (
                <tr key={flight._id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-white flex items-center">
                      <Plane className="w-4 h-4 mr-2 text-[#D9281C]" />
                      {flight.airline}
                    </div>
                    <div className="text-sm font-medium text-gray-400 ml-6">{flight.flightNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-300">
                    <span className="bg-gray-900/50 border border-gray-700 px-2 py-1 rounded-md">{flight.source}</span>
                    <span className="mx-2 text-gray-500">→</span>
                    <span className="bg-gray-900/50 border border-gray-700 px-2 py-1 rounded-md">{flight.destination}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-400">
                    {new Date(flight.departureTime).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-black text-emerald-400">
                    ₹{flight.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button onClick={() => handleEdit(flight)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 p-2 rounded-lg transition-colors mr-2" title="Edit Flight">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(flight._id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/30 p-2 rounded-lg transition-colors" title="Delete Flight">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {(!flights || flights.length === 0) && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Plane className="w-12 h-12 text-gray-600 mb-3" />
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
