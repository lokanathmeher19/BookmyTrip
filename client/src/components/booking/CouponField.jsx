import React, { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const CouponField = ({ onApply }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code) return;
    setLoading(true);
    try {
      const { data } = await api.post('/coupons/validate', { code });
      if (data.valid) {
        toast.success(`Coupon applied! ${data.offer.discountText}`);
        onApply(data.offer);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid coupon code');
      onApply(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input 
        type="text" 
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Enter Coupon Code" 
        className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue uppercase"
      />
      <button 
        type="button" 
        onClick={handleApply}
        disabled={loading || !code}
        className="px-6 py-2 bg-gray-900 text-white rounded-xl font-semibold disabled:opacity-50 hover:bg-gray-800 transition-colors"
      >
        {loading ? '...' : 'Apply'}
      </button>
    </div>
  );
};

export default CouponField;
