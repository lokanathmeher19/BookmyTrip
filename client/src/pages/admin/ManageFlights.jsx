import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    airline: '', flightNumber: '', source: '', destination: '',
    departureTime: '', arrivalTime: '', price: '', availableSeats: ''
  });

  const fetchFlights = async () => {
    try {
      const res = await axios.get('/api/flights/search');
      setFlights(res.data);
    } catch (err) {
      toast.error('Failed to load flights');
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/flights', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Flight added successfully!');
      setShowForm(false);
      setFormData({ airline: '', flightNumber: '', source: '', destination: '', departureTime: '', arrivalTime: '', price: '', availableSeats: '' });
      fetchFlights();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add flight');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/flights/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Flight deleted!');
      fetchFlights();
    } catch (err) {
      toast.error('Failed to delete flight');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Flights</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Flight
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-2 gap-4">
          <input required name="airline" value={formData.airline} onChange={handleChange} placeholder="Airline" className="input" />
          <input required name="flightNumber" value={formData.flightNumber} onChange={handleChange} placeholder="Flight Number" className="input" />
          <input required name="source" value={formData.source} onChange={handleChange} placeholder="Source (e.g., DEL)" className="input" />
          <input required name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination (e.g., BOM)" className="input" />
          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Departure Time</label>
            <input required type="datetime-local" name="departureTime" value={formData.departureTime} onChange={handleChange} className="input" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Arrival Time</label>
            <input required type="datetime-local" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="input" />
          </div>
          <input required type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input" />
          <input required type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} placeholder="Available Seats" className="input" />
          <button type="submit" className="btn btn-primary col-span-2 mt-4">Save Flight</button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {flights.map(flight => (
              <tr key={flight._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{flight.airline}</div>
                  <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {flight.source} → {flight.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(flight.departureTime).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-primary-600">
                  ₹{flight.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button onClick={() => handleDelete(flight._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {flights.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No flights found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFlights;
