import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ManageOffers = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', discountText: '', code: '', accentColor: 'bg-red-500', bankName: '', terms: ''
  });

  const fetchOffers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/offers');
      setOffers(res.data);
    } catch (err) {
      toast.error('Failed to load offers');
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/offers', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Offer added successfully!');
      setShowForm(false);
      setFormData({ title: '', discountText: '', code: '', accentColor: 'bg-red-500', bankName: '', terms: '' });
      fetchOffers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add offer');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/offers/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Offer deleted!');
      fetchOffers();
    } catch (err) {
      toast.error('Failed to delete offer');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Offers</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary-600 text-white px-4 py-2 rounded font-semibold flex items-center hover:bg-primary-700 transition">
          <Plus className="w-4 h-4 mr-2" /> Add Offer
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Title</label>
            <input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Flight Flash Sale" className="border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Discount Text</label>
            <input required name="discountText" value={formData.discountText} onChange={handleChange} placeholder="e.g. Flat 15% Off" className="border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Coupon Code</label>
            <input required name="code" value={formData.code} onChange={handleChange} placeholder="e.g. FLASH15" className="border border-gray-300 rounded px-3 py-2 uppercase" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Accent Color Class</label>
            <select name="accentColor" value={formData.accentColor} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2">
              <option value="bg-red-500">Red</option>
              <option value="bg-blue-500">Blue</option>
              <option value="bg-green-500">Green</option>
              <option value="bg-yellow-500">Yellow</option>
              <option value="bg-purple-500">Purple</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Bank Name (Optional)</label>
            <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. HDFC Bank" className="border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Terms (Optional)</label>
            <input name="terms" value={formData.terms} onChange={handleChange} placeholder="e.g. Valid till 31st Oct" className="border border-gray-300 rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-primary-600 text-white font-semibold py-2 px-4 rounded hover:bg-primary-700 transition-colors col-span-2 mt-4">Save Offer</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map(offer => (
          <div key={offer._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className={`h-2 w-full ${offer.accentColor}`}></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{offer.title}</h3>
                <button onClick={() => handleDelete(offer._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xl font-black text-gray-900 mb-4">{offer.discountText}</p>
              
              <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center border border-dashed border-gray-300">
                <span className="text-sm text-gray-500 font-semibold">CODE</span>
                <span className="font-mono font-bold text-primary-700 text-lg tracking-wider">{offer.code}</span>
              </div>
              
              {(offer.bankName || offer.terms) && (
                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  {offer.bankName && <p>🏦 Applicable on {offer.bankName} Cards</p>}
                  {offer.terms && <p>ℹ️ {offer.terms}</p>}
                </div>
              )}
            </div>
          </div>
        ))}
        {offers.length === 0 && (
          <div className="col-span-3 text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500">No active offers. Click "Add Offer" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOffers;
