import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminOverview from './AdminOverview';
import ManageUsers from './ManageUsers';
import ManageBookings from './ManageBookings';
import ManageFlights from './ManageFlights';
import ManageHotels from './ManageHotels';
import ManageTrains from './ManageTrains';
import ManageBuses from './ManageBuses';
import ManageOffers from './ManageOffers';
import { LayoutDashboard, Users, Ticket, Plane, Building, Train, Bus, Tag, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Protect route
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="glass-light p-8 rounded-2xl shadow-lg text-center max-w-md border border-gray-100">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500 mb-6 font-medium">
            You must be logged in with an Admin account to view this page.
          </p>
          <a href="/" className="bg-[#D9281C] hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors">
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Ticket },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'offers', label: 'Offers', icon: Tag },
  ];

  return (
    <div className="flex h-screen bg-[#0B1121] font-sans relative overflow-hidden text-gray-100">
      {/* Background ambient accents for glass vibe */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9281C] rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-64 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none"></div>

      {/* Sidebar - Dark Theme matching main app */}
      <aside className="w-64 bg-gray-900 text-gray-100 shadow-2xl flex flex-col h-full overflow-y-auto border-r border-gray-800 z-10">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-3 text-[#D9281C]" />
            <h2 className="text-xl font-black tracking-tight font-nunito">
              <span className="text-white">Admin</span>
              <span className="text-[#D9281C]">Panel</span>
            </h2>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-800">
          <div className="bg-gray-800 rounded-xl p-3 flex items-center shadow-inner border border-gray-700">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9281C] to-red-500 flex items-center justify-center text-white font-bold mr-3 shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 font-medium">Administrator</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">Management</p>
        </div>

        <nav className="flex-1 px-3 space-y-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#D9281C]/20 to-transparent text-[#D9281C] border-l-4 border-[#D9281C]' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-l-4 border-transparent'
              }`}
            >
              <tab.icon className={`w-4 h-4 mr-3 transition-colors ${activeTab === tab.id ? 'text-[#D9281C]' : 'text-gray-500'}`} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <a href="/" className="flex items-center justify-center w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors text-sm font-bold shadow-sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Back to Website
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 relative z-10">
        <div className="max-w-7xl mx-auto backdrop-blur-sm">
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'users' && <ManageUsers />}
          {activeTab === 'bookings' && <ManageBookings />}
          {activeTab === 'flights' && <ManageFlights />}
          {activeTab === 'hotels' && <ManageHotels />}
          {activeTab === 'trains' && <ManageTrains />}
          {activeTab === 'buses' && <ManageBuses />}
          {activeTab === 'offers' && <ManageOffers />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
