import Booking from '../models/Booking.js';

export const getPnrStatus = async (req, res, next) => {
  try {
    const { pnrNumber } = req.params;
    const booking = await Booking.findOne({ pnr: pnrNumber }).populate('itemId');
    
    if (booking) {
      res.json({
        pnr: booking.pnr,
        status: booking.status,
        passengers: booking.passengers,
        item: booking.itemId,
        type: booking.type,
        travelDate: booking.travelDate
      });
    } else {
      res.status(404).json({ message: 'PNR not found' });
    }
  } catch (error) {
    next(error);
  }
};
