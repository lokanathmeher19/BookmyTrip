import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ManageBuses = () => {
  const { user } = useAuth();
  const [buses, setBuses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    operator: '', source: '', destination: '',
    departureTime: '', arrivalTime: '', seatType: 'Seater', fare: '', availableSeats: ''
  });

  const fetchBuses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/buses/search');
      setBuses(res.data);
    } catch (err) {
      toast.error('Failed to load buses');
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/buses', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Bus added successfully!');
      setShowForm(false);
      setFormData({ operator: '', source: '', destination: '', departureTime: '', arrivalTime: '', seatType: 'Seater', fare: '', availableSeats: '' });
      fetchBuses();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add bus');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/buses/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Bus deleted!');
      fetchBuses();
    } catch (err) {
      toast.error('Failed to delete bus');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Buses</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary-600 text-white px-4 py-2 rounded font-semibold flex items-center hover:bg-primary-700 transition">
          <Plus className="w-4 h-4 mr-2" /> Add Bus
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-2 gap-4">
          <input required name="operator" value={formData.operator} onChange={handleChange} placeholder="Operator Name" className="border border-gray-300 rounded px-3 py-2" />
          <input required name="source" value={formData.source} onChange={handleChange} placeholder="Source City" className="border border-gray-300 rounded px-3 py-2" />
          <input required name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination City" className="border border-gray-300 rounded px-3 py-2" />
          <select name="seatType" value={formData.seatType} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2">
            <option value="Seater">Seater</option>
            <option value="Sleeper">Sleeper</option>
            <option value="Semi-Sleeper">Semi-Sleeper</option>
          </select>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Departure Time</label>
            <input required type="datetime-local" name="departureTime" value={formData.departureTime} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Arrival Time</label>
            <input required type="datetime-local" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
          </div>
          <input required type="number" name="fare" value={formData.fare} onChange={handleChange} placeholder="Fare (₹)" className="border border-gray-300 rounded px-3 py-2" />
          <input required type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} placeholder="Available Seats" className="border border-gray-300 rounded px-3 py-2" />
          
          <button type="submit" className="bg-primary-600 text-white font-semibold py-2 px-4 rounded hover:bg-primary-700 transition-colors col-span-2 mt-4">Save Bus</button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operator</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fare</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {buses.map(bus => (
              <tr key={bus._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{bus.operator}</div>
                  <div className="text-sm text-gray-500">{bus.seatType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bus.source} → {bus.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(bus.departureTime).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-primary-600">
                  ₹{bus.fare}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button onClick={() => handleDelete(bus._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {buses.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No buses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBuses;
