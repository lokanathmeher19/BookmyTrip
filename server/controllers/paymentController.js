import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';

export const createOrder = async (req, res, next) => {
  try {
    const { bookingId, amount, method } = req.body;
    
    // In a real app, integrate with Stripe/Razorpay here to get orderId/clientSecret
    
    const payment = new Payment({
      booking: bookingId,
      amount,
      method,
      status: 'PENDING'
    });
    
    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { paymentId, status, transactionId } = req.body;
    
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      res.status(404);
      throw new Error('Payment not found');
    }
    
    payment.status = status;
    payment.transactionId = transactionId;
    await payment.save();
    
    if (status === 'SUCCESS') {
      const booking = await Booking.findById(payment.booking);
      if (booking) {
        booking.status = 'CONFIRMED';
        await booking.save();
      }
    }
    
    res.json(payment);
  } catch (error) {
    next(error);
  }
};
