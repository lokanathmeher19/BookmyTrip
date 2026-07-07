import Flight from '../models/Flight.js';

export const searchFlights = async (req, res, next) => {
  try {
    const { from, to, date, tripType } = req.query;
    
    let query = {};
    if (from) query.source = { $regex: new RegExp(from, 'i') };
    if (to) query.destination = { $regex: new RegExp(to, 'i') };

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (error) {
    next(error);
  }
};
