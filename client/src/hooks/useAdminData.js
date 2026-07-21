import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

/**
 * A custom hook to fetch and poll admin data for real-time updates.
 * @param {string} endpoint - The API endpoint to hit (e.g. '/api/admin/bookings')
 * @param {number} intervalMs - Polling interval in milliseconds (default 5000ms)
 * @returns {object} { data, loading, error, refetch }
 */
const useAdminData = (endpoint, intervalMs = 5000) => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (showLoading = false) => {
    if (!user?.token) return;
    
    if (showLoading) setLoading(true);
    
    try {
      const res = await axios.get(`http://localhost:5000${endpoint}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      setError(err.response?.data?.message || err.message);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [endpoint, user]);

  useEffect(() => {
    // Initial fetch (shows loading spinner)
    fetchData(true);

    // Set up polling
    const interval = setInterval(() => {
      fetchData(false); // Background fetch (no spinner)
    }, intervalMs);

    return () => clearInterval(interval);
  }, [fetchData, intervalMs]);

  return { data, loading, error, refetch: () => fetchData(true) };
};

export default useAdminData;
