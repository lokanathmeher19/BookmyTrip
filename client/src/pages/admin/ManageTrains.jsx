import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, AlertCircle, Train as TrainIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import useAdminData from '../../hooks/useAdminData';

const ManageTrains = () => {
  const { user } = useAuth();
  const { data: trains, loading, error, refetch } = useAdminData('/api/trains', 5000);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    trainNumber: '', trainName: '', source: '', destination: '',
    departureTime: '', arrivalTime: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a train with default classes for simplicity in this mock
      const payload = {
        ...formData,
        classes: [
          { type: '3A', fare: 1200, totalSeats: 100, availableSeats: 100 },
          { type: 'SL', fare: 500, totalSeats: 200, availableSeats: 200 }
        ]
      };
      
      await axios.post('/api/admin/trains', payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Train added successfully!');
      setShowForm(false);
      setFormData({ trainNumber: '', trainName: '', source: '', destination: '', departureTime: '', arrivalTime: '' });
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add train');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this train?')) return;
    try {
      await axios.delete(`/api/admin/trains/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Train deleted!');
      refetch();
    } catch (err) {
      toast.error('Failed to delete train');
    }
  };

  if (loading && !trains) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9281C]"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-xl flex items-center"><AlertCircle className="mr-2" /> Error loading trains: {error}</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Manage Trains</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#D9281C] hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center transition-colors shadow-lg shadow-red-500/30">
          <Plus className="w-5 h-5 mr-2" /> Add Train
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-light p-8 rounded-2xl shadow-lg mb-8 grid grid-cols-2 gap-6 border border-[#D9281C]/20 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D9281C] to-red-400"></div>
          <h3 className="col-span-2 text-xl font-bold text-gray-900 mb-2">New Train Details</h3>
          
          <input required name="trainNumber" value={formData.trainNumber} onChange={handleChange} placeholder="Train Number (e.g., 12951)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          <input required name="trainName" value={formData.trainName} onChange={handleChange} placeholder="Train Name (e.g., Rajdhani Express)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          <input required name="source" value={formData.source} onChange={handleChange} placeholder="Source Station" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          <input required name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination Station" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Departure Time</label>
            <input required type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Arrival Time</label>
            <input required type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          </div>
          
          <div className="col-span-2 flex justify-end mt-4">
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-gray-500 hover:text-gray-700 font-bold mr-4">Cancel</button>
            <button type="submit" className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-md">Save Train</button>
          </div>
        </form>
      )}

      <div className="glass-light rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Train</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {trains && trains.map(train => (
                <tr key={train._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-gray-900 flex items-center">
                      <TrainIcon className="w-4 h-4 mr-2 text-[#D9281C]" />
                      {train.trainName}
                    </div>
                    <div className="text-sm font-medium text-gray-500 ml-6">{train.trainNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{train.source}</span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{train.destination}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    <span className="text-gray-900">{train.departureTime}</span> - {train.arrivalTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button onClick={() => handleDelete(train._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Delete Train">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {(!trains || trains.length === 0) && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <TrainIcon className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500">No trains found. Add one above.</p>
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

export default ManageTrains;
