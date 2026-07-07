import Booking from '../models/Booking.js';
import crypto from 'crypto';

export const createBooking = async (req, res, next) => {
  try {
    const { type, itemId, passengers, travelDate, fareBreakdown } = req.body;

    const pnr = crypto.randomBytes(4).toString('hex').toUpperCase();

    const booking = new Booking({
      user: req.user._id,
      type,
      itemId,
      passengers,
      travelDate,
      fareBreakdown,
      pnr
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404);
      throw new Error('Booking not found');
    }
  } catch (error) {
    next(error);
  }
};
