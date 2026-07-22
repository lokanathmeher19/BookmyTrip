import React from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Trash2, AlertCircle } from 'lucide-react';
import useAdminData from '../../hooks/useAdminData';

const ManageBookings = () => {
  const { user } = useAuth();
  const { data: bookings, loading, error, refetch } = useAdminData('/api/admin/bookings', 5000);

  const deleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/admin/bookings/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        refetch(); // Instantly refetch after delete
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  if (loading && !bookings) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9281C]"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-xl flex items-center"><AlertCircle className="mr-2" /> Error loading bookings: {error}</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in text-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-white tracking-tight">Manage Bookings</h2>
        <span className="bg-[#D9281C]/20 text-[#D9281C] px-4 py-1.5 rounded-full text-sm font-bold border border-[#D9281C]/30">
          Total: {bookings?.length || 0}
        </span>
      </div>
      
      <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D9281C] to-red-600"></div>
        <div className="overflow-x-auto mt-1">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">PNR</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              {bookings && bookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-white">{b.pnr}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {b.user ? (
                      <div>
                        <div className="font-bold text-white">{b.user.name}</div>
                        <div className="text-xs text-gray-500">{b.user.email}</div>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">Unknown</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 capitalize">{b.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-400">₹{b.fareBreakdown?.total?.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full border ${
                      b.status === 'CONFIRMED' ? 'bg-green-900/30 text-green-400 border-green-800' :
                      b.status === 'CANCELLED' || b.status === 'FAILED' ? 'bg-red-900/30 text-red-400 border-red-800' :
                      'bg-yellow-900/30 text-yellow-400 border-yellow-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-400">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => deleteBooking(b._id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/30 p-2 rounded-lg transition-colors"
                      title="Delete Booking"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {(!bookings || bookings.length === 0) && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Ticket className="w-12 h-12 text-gray-600 mb-3" />
                      <p className="font-medium text-gray-500">No bookings found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
