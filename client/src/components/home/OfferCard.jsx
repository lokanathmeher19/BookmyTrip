import React from 'react';
import { CreditCard, Wifi } from 'lucide-react';

const OfferCard = ({ title, terms, code, discountText, bankName }) => {
  const getBankCardStyles = (bank) => {
    switch (bank) {
      case 'HDFC':
        return {
          cardBg: 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900',
          textColor: 'text-white',
          badgeBg: 'bg-red-600 text-white',
          btnBg: 'bg-white text-blue-900 hover:bg-gray-100',
        };
      case 'SBI':
        return {
          cardBg: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700',
          textColor: 'text-white',
          badgeBg: 'bg-indigo-900 text-white',
          btnBg: 'bg-white text-blue-900 hover:bg-gray-100',
        };
      case 'BOB':
        return {
          cardBg: 'bg-gradient-to-br from-orange-600 via-orange-500 to-red-500',
          textColor: 'text-white',
          badgeBg: 'bg-red-700 text-white',
          btnBg: 'bg-white text-orange-900 hover:bg-gray-100',
        };
      case 'ICICI':
        return {
          cardBg: 'bg-gradient-to-br from-orange-500 via-red-600 to-red-700',
          textColor: 'text-white',
          badgeBg: 'bg-yellow-500 text-red-900',
          btnBg: 'bg-white text-red-700 hover:bg-gray-100',
        };
      case 'AXIS':
        return {
          cardBg: 'bg-gradient-to-br from-rose-700 via-pink-800 to-rose-900',
          textColor: 'text-white',
          badgeBg: 'bg-white text-rose-800',
          btnBg: 'bg-white text-pink-900 hover:bg-gray-100',
        };
      case 'KOTAK':
        return {
          cardBg: 'bg-gradient-to-br from-red-600 via-red-700 to-gray-900',
          textColor: 'text-white',
          badgeBg: 'bg-white text-red-700',
          btnBg: 'bg-red-700 text-white hover:bg-red-600',
        };
      case 'HSBC':
        return {
          cardBg: 'bg-gradient-to-br from-purple-800 via-purple-700 to-fuchsia-800',
          textColor: 'text-white',
          badgeBg: 'bg-purple-900 text-white',
          btnBg: 'bg-white text-purple-900 hover:bg-purple-50',
        };
      case 'BHIM UPI':
        return {
          cardBg: 'bg-gradient-to-br from-teal-700 via-emerald-600 to-teal-800',
          textColor: 'text-white',
          badgeBg: 'bg-emerald-800 text-white',
          btnBg: 'bg-white text-emerald-900 hover:bg-emerald-50',
        };
      default:
        return {
          cardBg: 'bg-gradient-to-br from-gray-800 to-gray-900',
          textColor: 'text-white',
          badgeBg: 'bg-gray-700 text-white',
          btnBg: 'bg-white text-gray-900 hover:bg-gray-100',
        };
    }
  };

  const styles = getBankCardStyles(bankName);

  return (
    <div className={`group rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 aspect-[1.586] ${styles.cardBg} border border-white/10`}>
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      {/* Top Row: Badge & Bank Logo */}
      <div className="flex justify-between items-start relative z-10">
        <div className={`px-3 py-1 rounded-md text-xs font-black tracking-wider shadow-sm ${styles.badgeBg}`}>
          {discountText}
        </div>
        {bankName && <div className={`text-sm font-black italic tracking-widest ${styles.textColor}`}>{bankName}</div>}
      </div>

      {/* Chip & Contactless */}
      <div className="flex items-center gap-2 mt-4 mb-2 relative z-10">
        <div className="w-10 h-8 rounded bg-gradient-to-br from-yellow-200 to-yellow-500 flex items-center justify-center shadow-inner opacity-90 overflow-hidden relative">
           <div className="absolute inset-0 border border-yellow-700/30 rounded"></div>
           <div className="w-full h-[1px] bg-yellow-700/20 absolute top-1/2"></div>
           <div className="w-[1px] h-full bg-yellow-700/20 absolute left-1/3"></div>
           <div className="w-[1px] h-full bg-yellow-700/20 absolute right-1/3"></div>
        </div>
        <Wifi className={`w-5 h-5 rotate-90 opacity-70 ${styles.textColor}`} />
      </div>
      
      {/* Middle: Details */}
      <div className="relative z-10 mt-auto mb-4">
        <h4 className={`font-bold text-lg mb-1 drop-shadow-md ${styles.textColor}`}>{title}</h4>
        <p className={`text-xs opacity-80 line-clamp-1 ${styles.textColor}`}>{terms}</p>
      </div>

      {/* Bottom Row: Code & Button */}
      <div className="flex justify-between items-end relative z-10 border-t border-white/20 pt-4 mt-2">
        <div>
          <p className={`text-[10px] uppercase font-bold tracking-widest opacity-70 mb-1 ${styles.textColor}`}>Promo Code</p>
          <p className={`font-mono font-black text-lg tracking-widest drop-shadow-sm ${styles.textColor}`}>
            {code}
          </p>
        </div>
        <button className={`text-xs font-extrabold px-4 py-2 rounded-lg transition-colors shadow-md ${styles.btnBg}`}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
