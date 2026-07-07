import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Train, Plane, Bus, Hotel, User, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="w-full flex justify-center fixed top-4 z-50 px-4">
      <nav className="bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/20 w-full max-w-4xl rounded-full transition-colors duration-300">
        <div className="px-4 sm:px-6 lg:px-6">
          <div className="flex justify-between h-12 md:h-14 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group mt-1 hover:opacity-90 transition-opacity">
              <span 
                className="text-xl md:text-2xl flex items-center font-bold tracking-tight"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                <span className="text-white mr-1.5 lowercase">book</span>
                <span 
                  className="text-white px-2.5 py-0 mx-0.5 flex items-center justify-center leading-none"
                  style={{ 
                    fontFamily: "'Dancing Script', cursive", 
                    fontSize: "0.95em", 
                    transform: 'rotate(-2deg)', 
                    marginTop: '2px',
                    background: 'radial-gradient(circle at 0 50%, transparent 3px, #EB2026 3.5px) left, radial-gradient(circle at 100% 50%, transparent 3px, #EB2026 3.5px) right',
                    backgroundSize: '51% 100%',
                    backgroundRepeat: 'no-repeat',
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))'
                  }}
                >
                  my
                </span>
                <span className="text-white ml-1.5 lowercase">trip</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="relative text-gray-300 hover:text-white transition-colors text-sm font-semibold tracking-wide after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 after:transition-all hover:after:w-full">Meals</a>
            <a href="#" className="relative text-gray-300 hover:text-white transition-colors text-sm font-semibold tracking-wide after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 after:transition-all hover:after:w-full">E-Wallet</a>
            <a href="#" className="relative text-gray-300 hover:text-white transition-colors text-sm font-semibold tracking-wide after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 after:transition-all hover:after:w-full">Alerts</a>
            <a href="#" className="relative text-gray-300 hover:text-white transition-colors text-sm font-semibold tracking-wide after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 after:transition-all hover:after:w-full">Contact Us</a>
          </div>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/account" className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
                  <User className="w-5 h-5 mr-1" />
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="bg-transparent hover:bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-md shadow-red-600/20"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
