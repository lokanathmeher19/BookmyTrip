import React from 'react';
import { Users, Ticket, IndianRupee, TrendingUp } from 'lucide-react';
import useAdminData from '../../hooks/useAdminData';

const AdminOverview = () => {
  const { data: stats, loading, error } = useAdminData('/api/admin/stats', 5000);

  if (loading && !stats) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9281C]"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-xl">Error loading dashboard stats: {error}</div>;
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
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Live, real-time metrics of your platform.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Live Updates Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="glass-light rounded-2xl p-6 hover-card-effect relative overflow-hidden group">
            {/* Background decoration */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-4xl font-black text-gray-900 mt-2">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg shadow-gray-200/50`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="mt-6 flex items-center text-sm font-medium text-gray-500 relative z-10">
              <TrendingUp className="w-4 h-4 mr-1.5 text-emerald-500" />
              <span className="text-emerald-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Activity Section Placeholder */}
      <div className="glass-light rounded-2xl p-8 mt-8 border-t-4 border-[#D9281C]">
        <h3 className="text-xl font-bold text-gray-900 mb-2">System Status</h3>
        <p className="text-gray-500">Your Booking Engine is running smoothly. The data on this dashboard is fetched in real-time every 5 seconds.</p>
      </div>
    </div>
  );
};

export default AdminOverview;
