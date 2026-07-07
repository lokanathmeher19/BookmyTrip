import React, { useState } from 'react';
import HeroSearch from '../components/home/HeroSearch';
import DestinationCard from '../components/home/DestinationCard';
import OfferCard from '../components/home/OfferCard';
import PromoBanner from '../components/home/PromoBanner';
import AppDownloadCTA from '../components/home/AppDownloadCTA';
import QuickServicesRow from '../components/home/QuickServicesRow';
import PnrWidget from '../components/home/PnrWidget';

const Home = () => {
  const [showAllOffers, setShowAllOffers] = useState(false);

  const destinations = [
    { city: 'Varanasi', state: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Spiritual' },
    { city: 'Jaipur', state: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Heritage' },
    { city: 'Goa', state: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Beaches' },
    { city: 'Kerala', state: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Nature' },
    { city: 'Agra', state: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1564507592224-2fc960cb1d06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Monument' },
    { city: 'Darjeeling', state: 'West Bengal', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Hills' },
  ];

  const offers = [
    { title: 'HDFC Bank Cards', description: 'Flat 10% off on Flight Bookings using HDFC Cards.', type: 'PERCENTAGE', value: 10, code: 'HDFC10', bankLogo: 'HDFC' },
    { title: 'SBI YONO Special', description: 'Get Flat ₹500 off on Hotels.', type: 'FLAT', value: 500, code: 'SBIYONO', bankLogo: 'SBI' },
    { title: 'IRCTC Bob Card', description: 'Zero payment gateway charge on train bookings.', type: 'FLAT', value: 0, code: 'BOBZERO', bankLogo: 'BOB' },
    { title: 'ICICI Festive Offer', description: 'Get 12% off on Bus Bookings using ICICI debit/credit cards.', type: 'PERCENTAGE', value: 12, code: 'ICICI12', bankLogo: 'ICICI' },
    { title: 'Axis Bank Vistara', description: 'Flat ₹1000 off on premium flight bookings.', type: 'FLAT', value: 1000, code: 'AXIS1000', bankLogo: 'AXIS' },
    { title: 'Kotak 811 Special', description: 'Enjoy 5% cashback on all catering orders.', type: 'PERCENTAGE', value: 5, code: 'KOTAK5', bankLogo: 'KOTAK' },
  ];

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
            <button className="text-blue-900 font-semibold hover:text-blue-700">View All</button>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x hide-scrollbar">
            {destinations.map((dest, idx) => (
              <div key={idx} className="snap-start shrink-0 w-64">
                <DestinationCard {...dest} />
              </div>
            ))}
          </div>
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
