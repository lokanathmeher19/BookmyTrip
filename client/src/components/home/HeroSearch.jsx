import React from 'react';
import TabSwitcher from './TabSwitcher';
import RecentSearches from './RecentSearches';

const HeroSearch = () => {
  return (
    <section className="relative w-full">
      {/* Background Hero */}
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        >
          <source src="/lv_0_20260706232615.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
            Your Journey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">Just a Tap Away</span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl font-medium drop-shadow-md">
            Search great deals on trains, flights, hotels and more on your fingertips.
          </p>
        </div>
      </div>

      {/* Search Widget Container */}
      <div className="relative z-30">
        <TabSwitcher />
        <RecentSearches />
      </div>
    </section>
  );
};

export default HeroSearch;
