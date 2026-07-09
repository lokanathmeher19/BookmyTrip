import React, { useState, useEffect } from 'react';
import api from '../services/api';
import HeroSearch from '../components/home/HeroSearch';
import DestinationCard from '../components/home/DestinationCard';
import OfferCard from '../components/home/OfferCard';
import PromoBanner from '../components/home/PromoBanner';
import AppDownloadCTA from '../components/home/AppDownloadCTA';
import QuickServicesRow from '../components/home/QuickServicesRow';
import PnrWidget from '../components/home/PnrWidget';

const Home = () => {
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const [destinations, setDestinations] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, offersRes] = await Promise.all([
          api.get('/destinations'),
          api.get('/offers')
        ]);
        setDestinations(destRes.data);
        setOffers(offersRes.data);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pb-12">
      <HeroSearch />
      
      <div className="px-4">
        <PnrWidget />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Quick Actions */}
        <QuickServicesRow />

        {/* Promo Banner */}
        <PromoBanner />

        {/* Popular Destinations */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
              <p className="text-gray-500 mt-1">Explore the most loved cities across India</p>
            </div>
            <button 
              onClick={() => setShowAllDestinations(!showAllDestinations)}
              className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
            >
              {showAllDestinations ? 'View Less' : 'View All'}
            </button>
          </div>
          
          {showAllDestinations ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-4">
              {destinations.map((dest, idx) => (
                <div key={idx} className="w-full">
                  <DestinationCard {...dest} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x hide-scrollbar">
              {destinations.map((dest, idx) => (
                <div key={idx} className="snap-start shrink-0 w-64">
                  <DestinationCard {...dest} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Best Offers */}
        <section className="mb-16">
           <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Best Offers for You</h2>
              <p className="text-gray-500 mt-1">Exclusive deals and discounts</p>
            </div>
            <button 
              onClick={() => setShowAllOffers(!showAllOffers)}
              className="text-blue-900 font-semibold hover:text-blue-700"
            >
              {showAllOffers ? 'View Less' : 'View All'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(showAllOffers ? offers : offers.slice(0, 3)).map((offer, idx) => (
              <OfferCard key={idx} {...offer} />
            ))}
          </div>
        </section>

        {/* App Download */}
        <AppDownloadCTA />
      </div>
    </div>
  );
};

export default Home;
