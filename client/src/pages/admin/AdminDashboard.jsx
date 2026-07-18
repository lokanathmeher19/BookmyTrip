import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ManageFlights from './ManageFlights';
import ManageHotels from './ManageHotels';
import { LayoutDashboard, Plane, Building } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('flights');

  // Protect route
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <LayoutDashboard className="w-5 h-5 mr-2 text-primary-600" />
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('flights')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'flights' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Plane className="w-5 h-5 mr-3" />
            Manage Flights
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'hotels' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Building className="w-5 h-5 mr-3" />
            Manage Hotels
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50 p-8">
        {activeTab === 'flights' && <ManageFlights />}
        {activeTab === 'hotels' && <ManageHotels />}
      </main>
    </div>
  );
};

export default AdminDashboard;
