import React from 'react';
import { Clock, TrendingUp, HelpCircle, Utensils, Info, ShieldCheck, Ticket, CalendarClock } from 'lucide-react';

const quickActions = [
  { name: 'PNR Status', icon: <Ticket className="w-6 h-6" /> },
  { name: 'Live Status', icon: <Clock className="w-6 h-6" /> },
  { name: 'Wait List', icon: <TrendingUp className="w-6 h-6" /> },
  { name: 'Food on Train', icon: <Utensils className="w-6 h-6" /> },
  { name: 'Vacancy', icon: <Info className="w-6 h-6" /> },
  { name: 'Season Ticket', icon: <CalendarClock className="w-6 h-6" /> },
];

const QuickServicesRow = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
      {quickActions.map((action, idx) => (
        <div key={idx} className="glass p-5 rounded-3xl hover-card-effect cursor-pointer flex flex-col items-center justify-center text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative w-14 h-14 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm">
            {action.icon}
          </div>
          <span className="relative text-sm font-extrabold text-gray-700 group-hover:text-red-700 transition-colors tracking-wide">{action.name}</span>
        </div>
      ))}
    </div>
  );
};

export default QuickServicesRow;
