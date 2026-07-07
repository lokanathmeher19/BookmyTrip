import React from 'react';
import { X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TrainScheduleModal = ({ train, onClose }) => {
  if (!train) return null;

  // Mock route schedule for demonstration
  const schedule = [
    { station: train.source, arr: 'Starting', dep: train.departureTime, halt: '-', dist: '0 km' },
    { station: 'Intermediate 1', arr: '12:00 PM', dep: '12:05 PM', halt: '5 min', dist: '250 km' },
    { station: 'Intermediate 2', arr: '04:30 PM', dep: '04:40 PM', halt: '10 min', dist: '520 km' },
    { station: train.destination, arr: train.arrivalTime, dep: 'Terminates', halt: '-', dist: '850 km' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{train.trainName} ({train.trainNumber})</h3>
              <p className="text-sm text-gray-500">Runs on: {train.runsOn.join(', ')}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="overflow-x-auto p-6 flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500 uppercase">
                  <th className="pb-3 font-semibold">Station</th>
                  <th className="pb-3 font-semibold">Arrives</th>
                  <th className="pb-3 font-semibold">Departs</th>
                  <th className="pb-3 font-semibold">Halt</th>
                  <th className="pb-3 font-semibold">Distance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((stop, idx) => (
                  <tr key={idx} className="border-b border-gray-100 last:border-0">
                    <td className="py-4 flex items-center gap-2 font-medium text-gray-900">
                      <MapPin className="w-4 h-4 text-brand-blue" />
                      {stop.station}
                    </td>
                    <td className="py-4 text-sm text-gray-600">{stop.arr}</td>
                    <td className="py-4 text-sm text-gray-600">{stop.dep}</td>
                    <td className="py-4 text-sm text-gray-600">{stop.halt}</td>
                    <td className="py-4 text-sm text-gray-600">{stop.dist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TrainScheduleModal;
