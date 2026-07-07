import Bus from '../models/Bus.js';

export const searchBuses = async (req, res, next) => {
  try {
    const { from, to, date } = req.query;
    
    let query = {};
    if (from) query.source = { $regex: new RegExp(from, 'i') };
    if (to) query.destination = { $regex: new RegExp(to, 'i') };

    const buses = await Bus.find(query);
    res.json(buses);
  } catch (error) {
    next(error);
  }
};
