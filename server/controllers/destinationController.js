import Destination from '../models/Destination.js';

export const getDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find({});
    res.json(destinations);
  } catch (error) {
    next(error);
  }
};
