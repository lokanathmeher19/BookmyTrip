import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, AlertCircle, Building, Star, MapPin, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminData from '../../hooks/useAdminData';

const ManageHotels = () => {
  const { data: hotels, loading, error, refetch } = useAdminData('/api/hotels/search', 5000);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', city: '', location: '', rating: '', pricePerNight: '', description: '', images: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', city: '', location: '', rating: '', pricePerNight: '', description: '', images: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = { ...formData, images: typeof formData.images === 'string' ? formData.images.split(',').map(i => i.trim()) : formData.images };
      
      if (editingId) {
        await axios.put(`/api/hotels/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Hotel updated successfully!');
      } else {
        await axios.post(`/api/hotels`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Hotel added successfully!');
      }
      resetForm();
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save hotel');
    }
  };

  const handleEdit = (hotel) => {
    setFormData({
      name: hotel.name,
      city: hotel.city,
      location: hotel.location,
      rating: hotel.rating,
      pricePerNight: hotel.pricePerNight,
      description: hotel.description,
      images: hotel.images.join(', ')
    });
    setEditingId(hotel._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/hotels/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Hotel deleted!');
      refetch();
    } catch (err) {
      toast.error('Failed to delete hotel');
    }
  };

  if (loading && !hotels) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9281C]"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-xl flex items-center"><AlertCircle className="mr-2" /> Error loading hotels: {error}</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in text-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-white tracking-tight">Manage Hotels</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-[#D9281C] hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center transition-colors shadow-lg shadow-red-900/30">
          <Plus className="w-5 h-5 mr-2" /> Add Hotel
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg mb-8 grid grid-cols-2 gap-6 border border-gray-700 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D9281C] to-red-400"></div>
          <h3 className="col-span-2 text-xl font-bold text-white mb-2">{editingId ? 'Edit Hotel Details' : 'New Hotel Details'}</h3>
          
          <input required name="name" value={formData.name} onChange={handleChange} placeholder="Hotel Name" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          <input required name="city" value={formData.city} onChange={handleChange} placeholder="City (e.g., Mumbai)" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          <input required name="location" value={formData.location} onChange={handleChange} placeholder="Location/Address" className="col-span-2 w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          <input required type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (1-5)" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          <input required type="number" name="pricePerNight" value={formData.pricePerNight} onChange={handleChange} placeholder="Price per Night (₹)" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="col-span-2 w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none h-24 text-white placeholder-gray-500"></textarea>
          <input required name="images" value={formData.images} onChange={handleChange} placeholder="Image URLs (comma separated)" className="col-span-2 w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none text-white placeholder-gray-500" />
          
          <div className="col-span-2 flex justify-end mt-4">
            <button type="button" onClick={resetForm} className="px-6 py-3 text-gray-400 hover:text-white font-bold mr-4">Cancel</button>
            <button type="submit" className="bg-white hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-xl font-bold transition-colors shadow-md">{editingId ? 'Update Hotel' : 'Save Hotel'}</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels && hotels.map(hotel => (
          <div key={hotel._id} className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden flex flex-col hover-card-effect border border-gray-700 group">
            <div className="relative h-48 overflow-hidden">
              <img src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={hotel.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center shadow-md">
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                <span className="text-sm font-bold text-white">{hotel.rating}</span>
              </div>
            </div>
            <div className="p-5 flex-1">
              <h3 className="text-xl font-black text-white line-clamp-1">{hotel.name}</h3>
              <div className="flex items-center mt-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-1 text-[#D9281C]" />
                {hotel.city}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
                <p className="text-2xl font-black text-[#D9281C]">₹{hotel.pricePerNight?.toLocaleString()} <span className="text-sm text-gray-500 font-medium">/night</span></p>
              </div>
            </div>
            <div className="p-3 bg-gray-900/50 flex justify-end space-x-2 border-t border-gray-700">
              <button onClick={() => handleEdit(hotel)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 p-2 rounded-lg transition-colors" title="Edit Hotel">
                <Edit2 className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(hotel._id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/30 p-2 rounded-lg transition-colors" title="Delete Hotel">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {(!hotels || hotels.length === 0) && (
        <div className="text-center py-12">
          <Building className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-lg font-bold text-gray-500">No hotels found.</p>
        </div>
      )}
    </div>
  );
};

export default ManageHotels;
