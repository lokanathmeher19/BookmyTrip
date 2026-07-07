import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TrainSearch from './pages/TrainSearch';
import Booking from './pages/Booking';
import BookingSuccess from './pages/BookingSuccess';
import Dashboard from './pages/Dashboard';
import Chatbot from './components/layout/Chatbot';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trains/search" element={<TrainSearch />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/booking-success/:id" element={<BookingSuccess />} />
            <Route path="/account" element={<Dashboard />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
