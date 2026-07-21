import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, AlertCircle, Tag, Copy, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import useAdminData from '../../hooks/useAdminData';

const ManageOffers = () => {
  const { user } = useAuth();
  const { data: offers, loading, error, refetch } = useAdminData('/api/offers', 5000);
  const [showForm, setShowForm] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', discountText: '', code: '', accentColor: 'bg-[#D9281C]', bankName: '', terms: ''
  });

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
      setFormData({ title: '', discountText: '', code: '', accentColor: 'bg-[#D9281C]', bankName: '', terms: '' });
      refetch();
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
      refetch();
    } catch (err) {
      toast.error('Failed to delete offer');
    }
  };

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Code copied!');
  };

  if (loading && !offers) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9281C]"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-xl flex items-center"><AlertCircle className="mr-2" /> Error loading offers: {error}</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Manage Offers</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#D9281C] hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center transition-colors shadow-lg shadow-red-500/30">
          <Plus className="w-5 h-5 mr-2" /> Add Offer
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-light p-8 rounded-2xl shadow-lg mb-8 grid grid-cols-2 gap-6 border border-[#D9281C]/20 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D9281C] to-red-400"></div>
          <h3 className="col-span-2 text-xl font-bold text-gray-900 mb-2">New Offer Details</h3>
          
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Title</label>
            <input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Flight Flash Sale" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Discount Text</label>
            <input required name="discountText" value={formData.discountText} onChange={handleChange} placeholder="e.g. Flat 15% Off" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Coupon Code</label>
            <input required name="code" value={formData.code} onChange={handleChange} placeholder="e.g. FLASH15" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none uppercase font-mono font-bold text-[#D9281C]" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Accent Color Class</label>
            <select name="accentColor" value={formData.accentColor} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none font-bold">
              <option value="bg-[#D9281C]">Brand Red</option>
              <option value="bg-gray-900">Charcoal Black</option>
              <option value="bg-emerald-500">Emerald Green</option>
              <option value="bg-blue-600">Ocean Blue</option>
              <option value="bg-amber-500">Amber Gold</option>
              <option value="bg-purple-600">Royal Purple</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Bank Name (Optional)</label>
            <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. HDFC Bank" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Terms (Optional)</label>
            <input name="terms" value={formData.terms} onChange={handleChange} placeholder="e.g. Valid till 31st Oct" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D9281C] focus:border-transparent transition-all outline-none" />
          </div>
          
          <div className="col-span-2 flex justify-end mt-4">
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-gray-500 hover:text-gray-700 font-bold mr-4">Cancel</button>
            <button type="submit" className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-md">Save Offer</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {offers && offers.map(offer => (
          <div key={offer._id} className="glass-light rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group hover-card-effect">
            <div className={`h-3 w-full ${offer.accentColor}`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${offer.accentColor} bg-opacity-10 mr-3`}>
                    <Tag className={`w-5 h-5 ${offer.accentColor.replace('bg-', 'text-')}`} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 line-clamp-1">{offer.title}</h3>
                </div>
                <button onClick={() => handleDelete(offer._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Delete Offer">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-2xl font-black text-gray-900 mb-6">{offer.discountText}</p>
              
              <div className="bg-gray-50/80 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center border-2 border-dashed border-gray-200 group-hover:border-[#D9281C]/50 transition-colors">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Use Code</span>
                <div className="flex items-center">
                  <span className={`font-mono font-black text-xl tracking-wider mr-3 ${offer.accentColor.replace('bg-', 'text-')}`}>
                    {offer.code}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(offer.code, offer._id)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    {copiedId === offer._id ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {(offer.bankName || offer.terms) && (
                <div className="mt-5 pt-4 border-t border-gray-100 text-xs font-medium text-gray-500 space-y-2">
                  {offer.bankName && <p className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span> Applicable on <span className="font-bold text-gray-700 mx-1">{offer.bankName}</span> Cards</p>}
                  {offer.terms && <p className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span> {offer.terms}</p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {(!offers || offers.length === 0) && (
        <div className="text-center py-16 glass-light rounded-2xl border border-gray-100">
          <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-black text-gray-800 mb-2">No active offers</h3>
          <p className="text-gray-500 font-medium">Click "Add Offer" above to create promotional campaigns.</p>
        </div>
      )}
    </div>
  );
};

export default ManageOffers;
