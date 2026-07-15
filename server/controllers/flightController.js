import Flight from '../models/Flight.js';
import NodeCache from 'node-cache';

// Cache for 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

export const searchFlights = async (req, res, next) => {
  try {
    const { from, to, date, tripType } = req.query;
    
    const cacheKey = `flights_${from || 'any'}_${to || 'any'}_${date || 'any'}`;
    const cachedFlights = cache.get(cacheKey);

    if (cachedFlights) {
      console.log(`[Cache Hit] Serving flights for ${from} to ${to}`);
      return res.json(cachedFlights);
    }

    let query = {};
    if (from) query.source = { $regex: new RegExp(from, 'i') };
    if (to) query.destination = { $regex: new RegExp(to, 'i') };

    const flights = await Flight.find(query);
    
    // Save to cache
    cache.set(cacheKey, flights);
    console.log(`[Cache Miss] Fetched flights from DB for ${from} to ${to}`);

    res.json(flights);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new flight (Admin only)
// @route   POST /api/flights
export const createFlight = async (req, res, next) => {
  try {
    const flight = new Flight(req.body);
    const createdFlight = await flight.save();
    
    // Flush the cache when new inventory is added
    cache.flushAll();

    res.status(201).json(createdFlight);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a flight (Admin only)
// @route   DELETE /api/flights/:id
export const deleteFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      res.status(404);
      throw new Error('Flight not found');
    }

    await Flight.findByIdAndDelete(req.params.id);

    // Flush the cache when inventory is removed
    cache.flushAll();

    res.json({ message: 'Flight removed' });
  } catch (error) {
    next(error);
  }
};
