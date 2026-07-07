import React from 'react';

const PromoBanner = () => {
  return (
    <div className="w-full relative overflow-hidden rounded-3xl my-12 shadow-md group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10" />
      <img 
        src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        alt="Train Journey Promo" 
        className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 text-white w-full md:w-2/3">
        <span className="text-sm font-bold tracking-wider uppercase mb-2 text-red-500">Train at a Glance 2025</span>
        <h2 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-md">
          Experience the Romance of Rail Travel
        </h2>
        <button className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-sm w-fit hover:bg-red-500 transition-colors shadow-lg">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
