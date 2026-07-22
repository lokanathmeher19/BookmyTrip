import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Train, Plane, Bus, Hotel, User, Moon, Sun, Briefcase, Heart, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCurrency } from '../../context/CurrencyContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { currency, changeCurrency } = useCurrency();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-center fixed top-4 z-50 px-4">
      <nav className="bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/20 w-full max-w-6xl rounded-full transition-colors duration-300">
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



          {/* Right Section */}
          <div className="flex items-center space-x-1 md:space-x-3">
            
            {/* My Trips */}
            <Link to="/trips" className="hidden lg:flex items-center space-x-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gray-700/60 flex items-center justify-center group-hover:scale-105 transition-transform border border-gray-600/50 shadow-inner">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="10" height="11" rx="1" fill="#FFB700" stroke="#FFB700" strokeWidth="1"/>
                  <path d="M4.5 4V2C4.5 1.44772 4.94772 1 5.5 1H8.5C9.05228 1 9.5 1.44772 9.5 2V4" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="5" y1="6" x2="5" y2="13" stroke="#D18D00" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="7" y1="6" x2="7" y2="13" stroke="#D18D00" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="9" y1="6" x2="9" y2="13" stroke="#D18D00" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white text-[13px] font-bold leading-tight">My Trips</span>
                <span className="text-gray-400 text-[10px] leading-tight">Manage your bookings</span>
              </div>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden xl:flex items-center space-x-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gray-700/60 flex items-center justify-center group-hover:scale-105 transition-transform border border-gray-600/50 shadow-inner">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 13.5L6.85 12.45C2.7 8.7 0 6.25 0 3.25C0 1.05 1.75 -0.7 4 -0.7C5.25 -0.7 6.45 -0.15 7.25 0.75L8 1.65L8.75 0.75C9.55 -0.15 10.75 -0.7 12 -0.7C14.25 -0.7 16 1.05 16 3.25C16 6.25 13.3 8.7 9.15 12.45L8 13.5Z" fill="#FF4E4E"/>
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white text-[13px] font-bold leading-tight">Wishlist</span>
                <span className="text-gray-400 text-[10px] leading-tight">Save favourites</span>
              </div>
            </Link>

            {/* Offers */}
            <Link to="/offers" className="hidden lg:flex items-center space-x-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gray-700/60 flex items-center justify-center group-hover:scale-105 transition-transform border border-gray-600/50 shadow-inner relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border border-white"></div>
                <span className="text-xl">🏷️</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white text-[13px] font-bold leading-tight">Offers</span>
                <span className="text-gray-400 text-[10px] leading-tight">Save up to 50%</span>
              </div>
            </Link>

            {/* Currency/Lang */}
            <div className="relative hidden md:block">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1.5 p-1.5 px-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10"
              >
                <span className="text-white text-[13px] font-bold">{currency} | ENG</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-gray-900/95 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/10 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Currency</p>
                  </div>
                  {['INR', 'USD', 'EUR', 'GBP', 'AUD'].map(curr => (
                    <button 
                      key={curr}
                      onClick={() => {
                        changeCurrency(curr);
                        setIsLangMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-white/10 flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className={`text-[13px] font-bold transition-colors ${currency === curr ? 'text-[#FFB700]' : 'text-white group-hover:text-blue-400'}`}>{curr}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center space-x-3">

                <Link to="/account" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors">
                  <User className="w-4 h-4 mr-1.5" />
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="bg-transparent hover:bg-red-500/20 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors border border-white/20 hover:border-red-500/50 hover:text-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white pl-1.5 pr-3 py-1.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-600/20 group border border-blue-400/30"
              >
                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-blue-600 shadow-sm">
                  <span className="text-[11px] font-black italic tracking-tighter" style={{ fontFamily: "'Dancing Script', cursive", marginLeft: '-1px' }}>my</span>
                </div>
                <span className="text-xs font-bold">Login / Create Account</span>
                <ChevronDown className="w-3 h-3 text-white/70 group-hover:text-white transition-colors" />
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
