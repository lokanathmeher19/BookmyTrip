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

// @desc    Create a new hotel (Admin only)
// @route   POST /api/hotels
export const createHotel = async (req, res, next) => {
  try {
    const hotel = new Hotel(req.body);
    const createdHotel = await hotel.save();

    res.status(201).json(createdHotel);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a hotel (Admin only)
// @route   DELETE /api/hotels/:id
export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      res.status(404);
      throw new Error('Hotel not found');
    }

    await Hotel.findByIdAndDelete(req.params.id);

    res.json({ message: 'Hotel removed' });
  } catch (error) {
    next(error);
  }
};
