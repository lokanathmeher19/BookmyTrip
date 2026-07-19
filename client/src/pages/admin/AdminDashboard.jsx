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
import { LayoutDashboard, Users, Ticket, Plane, Building, Train, Bus } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Protect route
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'bookings', label: 'Manage Bookings', icon: Ticket },
    { id: 'flights', label: 'Manage Flights', icon: Plane },
    { id: 'hotels', label: 'Manage Hotels', icon: Building },
    { id: 'trains', label: 'Manage Trains', icon: Train },
    { id: 'buses', label: 'Manage Buses', icon: Bus },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col h-full overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <LayoutDashboard className="w-5 h-5 mr-2 text-primary-600" />
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50 p-8">
        {activeTab === 'overview' && <AdminOverview />}
        {activeTab === 'users' && <ManageUsers />}
        {activeTab === 'bookings' && <ManageBookings />}
        {activeTab === 'flights' && <ManageFlights />}
        {activeTab === 'hotels' && <ManageHotels />}
        {activeTab === 'trains' && <ManageTrains />}
        {activeTab === 'buses' && <ManageBuses />}
      </main>
    </div>
  );
};

export default AdminDashboard;
