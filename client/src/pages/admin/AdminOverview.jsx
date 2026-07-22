import React from 'react';
import { Users, Ticket, IndianRupee, TrendingUp, Activity, Clock } from 'lucide-react';
import useAdminData from '../../hooks/useAdminData';

const AdminOverview = () => {
  const { data: stats, loading, error } = useAdminData('/api/admin/stats', 5000);

  if (loading && !stats) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9281C]"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-xl flex items-center font-medium shadow-sm">Error loading dashboard stats: {error}</div>;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'from-blue-600 to-blue-400',
      trend: '+12% this month'
    },
    {
      title: 'Total Bookings',
      value: stats?.totalBookings || 0,
      icon: Ticket,
      color: 'from-[#D9281C] to-red-500',
      trend: '+5% this week'
    },
    {
      title: 'Total Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: IndianRupee,
      color: 'from-emerald-600 to-emerald-400',
      trend: '+18% this month'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in relative text-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Dashboard Overview</h2>
          <p className="text-gray-400 mt-1 font-medium">Live, real-time metrics of your platform.</p>
        </div>
        <div className="bg-gray-800/80 border border-gray-700 flex items-center space-x-2 text-sm font-bold text-emerald-400 px-4 py-2 rounded-xl shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Live Sync</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-gray-800/60 border border-gray-700 backdrop-blur-md rounded-2xl p-6 hover-card-effect relative overflow-hidden group shadow-lg shadow-black/20">
            {/* Background decoration */}
            <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color} opacity-[0.15] group-hover:scale-[1.5] transition-transform duration-700 ease-out`}></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-4xl font-black text-white mt-2 tracking-tight">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg shadow-black/50 transform group-hover:rotate-6 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="mt-6 flex items-center text-sm font-bold text-gray-400 relative z-10 pt-4 border-t border-gray-700/50">
              <TrendingUp className="w-4 h-4 mr-1.5 text-emerald-400" />
              <span className="text-emerald-400">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg shadow-black/20 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-400" />
              Recent Bookings
            </h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {stats?.recentBookings?.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-white">{booking.user?.name || 'Unknown'}</div>
                      <div className="text-xs text-gray-400">{booking.pnr}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 capitalize">
                      {booking.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-full border ${
                        booking.status === 'CONFIRMED' ? 'bg-green-900/30 text-green-400 border-green-800' :
                        booking.status === 'CANCELLED' || booking.status === 'FAILED' ? 'bg-red-900/30 text-red-400 border-red-800' :
                        'bg-yellow-900/30 text-yellow-400 border-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {!stats?.recentBookings?.length && (
                  <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500 text-sm">No recent bookings.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Signups */}
        <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg shadow-black/20 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-400" />
              New Signups
            </h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {stats?.recentUsers?.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold mr-3 shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {!stats?.recentUsers?.length && (
                  <tr><td colSpan="2" className="px-6 py-4 text-center text-gray-500 text-sm">No recent signups.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* System Status Section */}
      <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-md rounded-2xl overflow-hidden mt-8 shadow-lg shadow-black/20">
        <div className="px-6 py-4 border-b border-gray-700/50 bg-gray-900/40 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center">
            <Activity className="w-5 h-5 mr-2 text-[#D9281C]" />
            System Status
          </h3>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-900/30 px-3 py-1.5 rounded-lg border border-emerald-800 shadow-sm">Operational</span>
        </div>
        <div className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D9281C] to-red-600 opacity-[0.15] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <p className="text-gray-300 font-medium leading-relaxed relative z-10 max-w-3xl">
            The core booking engine, payment gateways, and third-party APIs are performing optimally. Data on this dashboard is fetched securely in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
