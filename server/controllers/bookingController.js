import Booking from '../models/Booking.js';
import User from '../models/User.js';
import crypto from 'crypto';
import { notificationService } from '../utils/notificationService.js';

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

export const confirmBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    if (booking.status === 'CONFIRMED') {
      res.status(400);
      throw new Error('Booking is already confirmed');
    }

    if (booking.status === 'CANCELLED' || booking.status === 'FAILED') {
      res.status(400);
      throw new Error(`Booking cannot be confirmed because it is ${booking.status}`);
    }

    if (booking.expiresAt < new Date()) {
      booking.status = 'FAILED';
      await booking.save();
      res.status(400);
      throw new Error('Booking hold expired. Please search and book again.');
    }

    const user = await User.findById(req.user._id);
    const amountToPay = booking.fareBreakdown.total;

    if (user.walletBalance < amountToPay) {
      res.status(400);
      throw new Error('Insufficient wallet balance');
    }

    // Deduct from wallet
    user.walletBalance -= amountToPay;
    user.transactions.push({
      amount: amountToPay,
      type: 'DEBIT',
      description: `Payment for booking PNR: ${booking.pnr}`
    });
    await user.save();

    // Confirm booking
    booking.status = 'CONFIRMED';
    const confirmedBooking = await booking.save();

    // Trigger asynchronous notification
    notificationService.emit('bookingConfirmed', confirmedBooking, user);

    res.json(confirmedBooking);
  } catch (error) {
    next(error);
  }
};
