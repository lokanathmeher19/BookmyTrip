import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import CouponField from '../components/booking/CouponField';
import toast from 'react-hot-toast';

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Extract query params (type and class)
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || 'train';
  
  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: 'Male' }]);
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [insuranceOptIn, setInsuranceOptIn] = useState(true);
  
  const [itemDetails, setItemDetails] = useState(null);
  const [baseFare, setBaseFare] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get(`/${type}s/${id}`);
        setItemDetails(data);
        
        let fare = 0;
        if (type === 'flight' || type === 'train') {
          fare = data.classes?.[0]?.fare || 1000;
        } else if (type === 'bus') {
          fare = data.fare || 500;
        } else if (type === 'hotel') {
          fare = data.pricePerNight || 2000;
        }
        setBaseFare(fare);
      } catch (error) {
        console.error("Failed to fetch item details", error);
        toast.error("Failed to load booking details");
      } finally {
        setPageLoading(false);
      }
    };
    fetchDetails();
  }, [id, type]);

  const tax = Math.round(baseFare * 0.1); // 10% tax instead of fixed 100
  // IRCTC style insurance is usually per passenger
  const insuranceCost = insuranceOptIn ? Math.ceil(passengers.length * 0.45) : 0;
  
  // Parse discount (e.g. "Flat 10% Off" or "Flat ₹500 Off")
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountText.includes('%')) {
      const match = appliedCoupon.discountText.match(/(\d+)%/);
      if (match) discountAmount = (baseFare * parseInt(match[1])) / 100;
    } else {
      const match = appliedCoupon.discountText.match(/₹(\d+)/);
      if (match) discountAmount = parseInt(match[1]);
    }
  }
  const totalFare = baseFare + tax + insuranceCost - discountAmount;

  const addPassenger = () => setPassengers([...passengers, { name: '', age: '', gender: 'Male' }]);
  
  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }
    
    setLoading(true);
    try {
      // Create Booking
      const { data: booking } = await api.post('/bookings', {
        type,
        itemId: id,
        passengers,
        travelDate: new Date(),
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        fareBreakdown: { baseFare, tax, discount: discountAmount, total: totalFare }
      });
      
      // Create Mock Payment
      const { data: payment } = await api.post('/payments/create-order', {
        bookingId: booking._id,
        amount: totalFare,
        method: 'Credit Card'
      });
      
      // Verify Mock Payment
      await api.post('/payments/verify', {
        paymentId: payment._id,
        status: 'SUCCESS',
        transactionId: 'TXN' + Math.floor(Math.random() * 1000000)
      });
      
      toast.success(`Booking Confirmed!`);
      navigate(`/booking-success/${booking._id}`);
    } catch (error) {
      console.error(error);
      toast.error('Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div></div>;
  }

  const renderBookingSummary = () => {
    if (!itemDetails) return null;
    
    if (type === 'flight') {
      return (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-blue-600 font-bold uppercase">{itemDetails.airline} • {itemDetails.flightNumber}</p>
            <p className="text-xl font-black text-gray-900">{itemDetails.source} <span className="text-gray-400 font-normal mx-2">to</span> {itemDetails.destination}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-500">Departure</p>
            <p className="font-bold text-gray-900">{new Date(itemDetails.departureTime).toLocaleDateString()}</p>
          </div>
        </div>
      );
    } else if (type === 'hotel') {
      return (
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-indigo-600 font-bold uppercase">{itemDetails.city}</p>
            <p className="text-xl font-black text-gray-900">{itemDetails.name}</p>
          </div>
        </div>
      );
    } else if (type === 'train') {
      return (
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-orange-600 font-bold uppercase">{itemDetails.trainNumber}</p>
            <p className="text-xl font-black text-gray-900">{itemDetails.source} <span className="text-gray-400 font-normal mx-2">to</span> {itemDetails.destination}</p>
          </div>
        </div>
      );
    } else if (type === 'bus') {
      return (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-emerald-600 font-bold uppercase">{itemDetails.operator}</p>
            <p className="text-xl font-black text-gray-900">{itemDetails.source} <span className="text-gray-400 font-normal mx-2">to</span> {itemDetails.destination}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">Booking Summary</h2>
          {renderBookingSummary()}
          
          <h2 className="text-xl font-bold mb-4 mt-8">Passenger Details</h2>
          
          <form onSubmit={handleBooking}>
            {passengers.map((p, idx) => (
              <div key={idx} className="flex gap-4 mb-4 items-end bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Name</label>
                  <input type="text" required value={p.name} onChange={(e) => updatePassenger(idx, 'name', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Age</label>
                  <input type="number" required value={p.age} onChange={(e) => updatePassenger(idx, 'age', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="w-32">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Gender</label>
                  <select value={p.gender} onChange={(e) => updatePassenger(idx, 'gender', e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-white">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            ))}
            
            <button type="button" onClick={addPassenger} className="text-brand-blue font-semibold text-sm mb-8">+ Add Passenger</button>
            
            <div className="mb-8 border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Travel Insurance</h3>
              <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <input 
                  type="checkbox" 
                  checked={insuranceOptIn} 
                  onChange={(e) => setInsuranceOptIn(e.target.checked)}
                  className="mt-1 text-brand-blue focus:ring-brand-blue rounded"
                />
                <div>
                  <p className="font-semibold text-gray-800">Do you want to take Travel Insurance (₹0.45/person)?</p>
                  <p className="text-xs text-gray-500 mt-1">Covers accidental death and injury during the journey.</p>
                </div>
              </label>
            </div>

            <div className="mb-8 border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Offers & Promo Codes</h3>
              <CouponField onApply={setAppliedCoupon} />
              {appliedCoupon && (
                <div className="mt-2 text-sm text-green-600 font-semibold bg-green-50 p-2 rounded flex justify-between">
                  <span>Coupon {appliedCoupon.code} applied!</span>
                  <button type="button" onClick={() => setAppliedCoupon(null)} className="text-red-500 hover:underline">Remove</button>
                </div>
              )}
            </div>

            <div className="border-t pt-6 flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Fare Breakdown</p>
                <p className="text-xs text-gray-500">
                  Base: ₹{baseFare} | Tax: ₹{tax} {insuranceCost > 0 && `| Ins: ₹${insuranceCost}`} 
                  {discountAmount > 0 && <span className="text-green-500 font-bold"> | Discount: -₹{discountAmount}</span>}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">₹{totalFare}</p>
              </div>
              <button type="submit" disabled={loading} className="bg-[var(--color-brand-blue)] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 disabled:opacity-70 transition-opacity shadow-lg">
                {loading ? 'Processing...' : 'Pay & Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
