import React from 'react';
import { Heart, MapPin } from 'lucide-react';

const WishlistGrid = ({ wishlist = [] }) => {
  if (wishlist.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Heart className="w-5 h-5 text-offer-coral fill-offer-coral" /> My Wishlist
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-md transition-all">
            <div className="h-40 bg-gray-200 relative">
              <img src={item.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'} alt="Hotel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-offer-coral hover:bg-white">
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-1 truncate">{item.name || 'Luxury Hotel'}</h4>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="w-3 h-3 mr-1" /> {item.city || 'Mumbai'}
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-brand-blue">₹{item.price || '5000'}<span className="text-xs text-gray-500 font-normal">/night</span></span>
                <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded">★ {item.rating || '4.5'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistGrid;
