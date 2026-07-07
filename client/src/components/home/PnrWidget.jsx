import React, { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Search, Train } from 'lucide-react';

const PnrWidget = () => {
  const [pnr, setPnr] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const checkPnr = async (e) => {
    e.preventDefault();
    if (!pnr || pnr.length !== 10) {
      toast.error('Please enter a valid 10-digit PNR number');
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      const { data } = await api.get(`/pnr/${pnr}`);
      setStatus(data);
    } catch (error) {
      toast.error('PNR not found or invalid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-12 w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Train className="w-6 h-6 text-red-600" />
        <h3 className="text-xl font-bold text-gray-900">PNR Status Check</h3>
      </div>
      
      <form onSubmit={checkPnr} className="flex flex-col sm:flex-row gap-4 mb-4">
        <input 
          type="text" 
          value={pnr} 
          onChange={(e) => setPnr(e.target.value)} 
          placeholder="Enter 10-digit PNR Number" 
          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-600/20 focus:border-red-600 focus:outline-none font-medium text-lg text-gray-900 placeholder-gray-400"
          maxLength={10}
        />
        <button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-md transition-colors flex justify-center items-center gap-2">
          {loading ? 'Checking...' : <><Search className="w-5 h-5" /> Check Status</>}
        </button>
      </form>

      {status && (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl mt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Status</p>
              <p className={`text-xl font-bold ${status.status === 'CONFIRMED' ? 'text-green-600' : 'text-red-600'}`}>{status.status}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-semibold uppercase">Journey Date</p>
              <p className="text-lg font-bold text-gray-900">{new Date(status.travelDate).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 font-semibold uppercase mb-2">Passengers</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {status.passengers.map((p, idx) => (
                <div key={idx} className="bg-white p-2 rounded shadow-sm flex justify-between">
                  <span className="font-semibold text-gray-800">{p.name} ({p.age})</span>
                  <span className="text-gray-500">{p.gender}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PnrWidget;
