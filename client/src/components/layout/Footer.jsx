import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-black text-white mb-4"><span className="text-white">Book</span><span className="text-red-600">MyTrip</span></h3>
            <p className="text-sm text-gray-400">
              Your journey, just a tap away. Search great deals on trains, flights, hotels and more.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition-colors">Train Tickets</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Flight Tickets</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Bus Tickets</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Hotels</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} BookMyTrip. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
