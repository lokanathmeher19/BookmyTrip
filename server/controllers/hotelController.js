import Hotel from '../models/Hotel.js';

export const searchHotels = async (req, res, next) => {
  try {
    const { city, checkIn, checkOut, guests } = req.query;
    
    let query = {};
    if (city) query.city = { $regex: new RegExp(city, 'i') };

    const hotels = await Hotel.find(query);
    res.json(hotels);
  } catch (error) {
    next(error);
  }
};
