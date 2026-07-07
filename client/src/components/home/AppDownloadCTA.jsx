import React from 'react';
import { Smartphone } from 'lucide-react';

const AppDownloadCTA = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-red-950 rounded-3xl overflow-hidden shadow-xl relative my-12">
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 relative z-10">
        <div className="text-white max-w-xl text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-md">
            Your Journey, Just a Tap Away
          </h2>
          <p className="text-lg text-gray-300 mb-8 drop-shadow-sm font-medium">
            Download the BookMyTrip app for exclusive mobile-only deals and real-time travel updates.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center hover:bg-gray-800 transition-colors shadow-lg border border-gray-700">
              <Smartphone className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="text-[10px] leading-none text-gray-300">Download on the</div>
                <div className="text-sm font-bold leading-tight">App Store</div>
              </div>
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center hover:bg-gray-800 transition-colors shadow-lg border border-gray-700">
              <Smartphone className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="text-[10px] leading-none text-gray-300">GET IT ON</div>
                <div className="text-sm font-bold leading-tight">Google Play</div>
              </div>
            </button>
          </div>
        </div>
        
        <div className="hidden md:block w-48 h-64 bg-white/20 rounded-[2rem] border-4 border-white shadow-2xl backdrop-blur-sm p-4 transform rotate-12 -mr-8">
           {/* Mockup visualization */}
           <div className="w-full h-full bg-white rounded-2xl flex flex-col pt-4 px-3">
               <div className="w-1/2 h-4 bg-gray-200 rounded-full mb-4"></div>
               <div className="w-full h-24 bg-red-100 rounded-xl mb-2"></div>
               <div className="w-full h-12 bg-gray-100 rounded-xl mb-2"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AppDownloadCTA;
