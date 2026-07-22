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

export const getBusById = async (req, res, next) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      res.status(404);
      throw new Error('Bus not found');
    }
    res.json(bus);
  } catch (error) {
    next(error);
  }
};
