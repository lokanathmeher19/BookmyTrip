import React from 'react';
import { Gift, ChevronRight } from 'lucide-react';

const RewardsCard = ({ points }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden mb-8">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-900/20 rounded-full blur-xl"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-purple-200" />
            <span className="font-semibold text-purple-100 uppercase tracking-wider text-sm">TripEase Rewards</span>
          </div>
          <h3 className="text-4xl font-bold mb-1">{points || 0} <span className="text-lg font-medium text-purple-200">pts</span></h3>
          <p className="text-sm text-purple-100">Earn more points on your next booking!</p>
        </div>
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default RewardsCard;
