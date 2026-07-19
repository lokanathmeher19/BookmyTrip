import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ManageTrains = () => {
  const { user } = useAuth();
  const [trains, setTrains] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    trainNumber: '', trainName: '', source: '', destination: '',
    departureTime: '', arrivalTime: ''
  });

  const fetchTrains = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/trains');
      setTrains(res.data);
    } catch (err) {
      toast.error('Failed to load trains');
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

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
      
      await axios.post('http://localhost:5000/api/admin/trains', payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Train added successfully!');
      setShowForm(false);
      setFormData({ trainNumber: '', trainName: '', source: '', destination: '', departureTime: '', arrivalTime: '' });
      fetchTrains();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add train');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this train?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/trains/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Train deleted!');
      fetchTrains();
    } catch (err) {
      toast.error('Failed to delete train');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Trains</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Train
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-2 gap-4">
          <input required name="trainNumber" value={formData.trainNumber} onChange={handleChange} placeholder="Train Number" className="input border border-gray-300 rounded px-3 py-2" />
          <input required name="trainName" value={formData.trainName} onChange={handleChange} placeholder="Train Name" className="input border border-gray-300 rounded px-3 py-2" />
          <input required name="source" value={formData.source} onChange={handleChange} placeholder="Source Station" className="input border border-gray-300 rounded px-3 py-2" />
          <input required name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination Station" className="input border border-gray-300 rounded px-3 py-2" />
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Departure Time (e.g., 14:30)</label>
            <input required type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} className="input border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Arrival Time (e.g., 20:45)</label>
            <input required type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="input border border-gray-300 rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-primary-600 text-white font-semibold py-2 px-4 rounded hover:bg-primary-700 transition-colors col-span-2 mt-4">Save Train</button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Train</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trains.map(train => (
              <tr key={train._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{train.trainName}</div>
                  <div className="text-sm text-gray-500">{train.trainNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {train.source} → {train.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {train.departureTime} - {train.arrivalTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button onClick={() => handleDelete(train._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {trains.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No trains found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTrains;
