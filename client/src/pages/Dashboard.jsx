import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import RewardsCard from '../components/dashboard/RewardsCard';
import WishlistGrid from '../components/dashboard/WishlistGrid';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my');
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  if (!user) return <div className="p-8 text-center">Please login to view dashboard</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
            <div className="w-20 h-20 bg-[var(--color-brand-blue)] text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 mb-6">{user.email}</p>
            
            <nav className="space-y-2">
              <a href="#" className="block px-4 py-2 bg-blue-50 text-[var(--color-brand-blue)] rounded-lg font-semibold">My Bookings</a>
              <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Profile Settings</a>
              <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg mt-8">Logout</button>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <RewardsCard points={user.rewardPoints || 450} />
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h3>
            
            {loading ? (
              <p>Loading...</p>
            ) : bookings.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl text-center text-gray-500 shadow-sm border border-gray-100">
                You have no bookings yet.
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded-md uppercase">{booking.type}</span>
                        <span className="font-mono font-bold text-gray-700">PNR: {booking.pnr}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Travel Date: {new Date(booking.travelDate).toLocaleDateString()}</p>
                      <p className="text-sm font-semibold">Passengers: {booking.passengers.length}</p>
                    </div>
                    <div className="text-right mt-4 sm:mt-0">
                      <p className="text-xl font-bold text-gray-900 mb-1">₹{booking.fareBreakdown?.total}</p>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <WishlistGrid wishlist={user.wishlist || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
