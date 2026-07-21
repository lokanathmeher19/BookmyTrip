import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TrainSearch from './pages/TrainSearch';
import FlightSearch from './pages/FlightSearch';
import BusSearch from './pages/BusSearch';
import HotelSearch from './pages/HotelSearch';
import Booking from './pages/Booking';
import BookingSuccess from './pages/BookingSuccess';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Chatbot from './components/layout/Chatbot';
import Trips from './pages/Trips';
import Wishlist from './pages/Wishlist';
import Offers from './pages/Offers';

const ClientLayout = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trains/search" element={<TrainSearch />} />
          <Route path="/flights/search" element={<FlightSearch />} />
          <Route path="/bus/search" element={<BusSearch />} />
          <Route path="/hotels/search" element={<HotelSearch />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/booking-success/:id" element={<BookingSuccess />} />
          <Route path="/account" element={<Dashboard />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/offers" element={<Offers />} />
        </Route>
        
        {/* Admin Route (No Navbar/Footer) */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
