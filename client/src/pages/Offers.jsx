import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Tag, Copy, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/offers');
        setOffers(res.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success('Coupon code copied to clipboard!');
    setTimeout(() => setCopiedId(null), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
            className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-full mb-6"
          >
            <Tag className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
          >
            Exclusive Deals & Offers
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500"
          >
            Save big on your next journey. Apply these promo codes at checkout for instant discounts on Flights, Trains, Buses, and Hotels.
          </motion.p>
        </div>

        {offers.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            No active offers at the moment. Check back soon!
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {offers.map((offer) => (
              <motion.div 
                key={offer._id} 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 flex flex-col relative group"
              >
                {/* Top color bar */}
                <div className={`h-3 w-full ${offer.accentColor || 'bg-brand-blue'} transition-all duration-300 group-hover:h-4`}></div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                    <div className="text-3xl font-black text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {offer.discountText}
                    </div>
                    
                    {(offer.bankName || offer.terms) && (
                      <div className="space-y-3 mb-8">
                        {offer.bankName && (
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 text-xs font-bold">💳</span>
                            Valid on {offer.bankName}
                          </div>
                        )}
                        {offer.terms && (
                          <div className="flex items-start text-sm text-gray-600">
                            <span className="w-6 h-6 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mr-3 text-xs font-bold mt-0.5">ℹ️</span>
                            <span>{offer.terms}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Coupon Code Section */}
                  <div className="mt-auto pt-6 border-t border-gray-100 border-dashed">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Use Promo Code</p>
                    <div 
                      onClick={() => handleCopyCode(offer.code, offer._id)}
                      className="relative group/copy cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-colors"
                    >
                      <span className="font-mono text-xl font-extrabold text-primary-600 tracking-[0.2em] uppercase">
                        {offer.code}
                      </span>
                      <div className="text-gray-400 group-hover/copy:text-primary-600 transition-colors">
                        {copiedId === offer._id ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Offers;
