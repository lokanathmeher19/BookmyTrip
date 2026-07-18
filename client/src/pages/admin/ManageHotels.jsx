import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', city: '', location: '', rating: '', pricePerNight: '', description: '', images: ''
  });

  const fetchHotels = async () => {
    try {
      const res = await axios.get('/api/hotels/search');
      setHotels(res.data);
    } catch (err) {
      toast.error('Failed to load hotels');
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Convert images comma separated string to array
      const payload = { ...formData, images: formData.images.split(',').map(i => i.trim()) };
      await axios.post('/api/hotels', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Hotel added successfully!');
      setShowForm(false);
      setFormData({ name: '', city: '', location: '', rating: '', pricePerNight: '', description: '', images: '' });
      fetchHotels();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add hotel');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/hotels/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Hotel deleted!');
      fetchHotels();
    } catch (err) {
      toast.error('Failed to delete hotel');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Hotels</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Hotel
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-2 gap-4">
          <input required name="name" value={formData.name} onChange={handleChange} placeholder="Hotel Name" className="input" />
          <input required name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input" />
          <input required name="location" value={formData.location} onChange={handleChange} placeholder="Location/Address" className="input col-span-2" />
          <input required type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (1-5)" className="input" />
          <input required type="number" name="pricePerNight" value={formData.pricePerNight} onChange={handleChange} placeholder="Price per Night" className="input" />
          <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input col-span-2 h-20"></textarea>
          <input required name="images" value={formData.images} onChange={handleChange} placeholder="Image URLs (comma separated)" className="input col-span-2" />
          <button type="submit" className="btn btn-primary col-span-2 mt-4">Save Hotel</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map(hotel => (
          <div key={hotel._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <img src={hotel.images[0] || 'https://via.placeholder.com/300x200?text=No+Image'} alt={hotel.name} className="h-48 w-full object-cover" />
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900">{hotel.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                  ⭐ {hotel.rating}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">{hotel.city}</p>
              <p className="text-primary-600 font-bold mt-2">₹{hotel.pricePerNight} / night</p>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t flex justify-end">
              <button onClick={() => handleDelete(hotel._id)} className="text-red-500 hover:text-red-700 flex items-center text-sm">
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {hotels.length === 0 && <p className="text-center text-gray-500 mt-8">No hotels found.</p>}
    </div>
  );
};

export default ManageHotels;
