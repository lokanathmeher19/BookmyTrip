import React from 'react';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  return (
    <div className="relative min-h-screen">
      {/* Premium Video Background */}
      <div className="fixed inset-0 w-full h-full bg-black z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-50">
          <source src="/lv_0_20260706232615.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
      </div>

      <div className="relative z-20 pt-36 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">My Wishlist</h1>
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-12 text-center border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)] border border-red-500/30">
                <Heart className="w-12 h-12 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Your wishlist is empty</h2>
              <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">Save your favorite destinations and hotels to easily find them later when you're ready to book.</p>
              <a href="/" className="inline-block bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white font-bold py-3.5 px-10 rounded-full transition-all duration-300 shadow-lg shadow-red-500/30 hover:scale-105 border border-white/10">
                Explore Destinations
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
