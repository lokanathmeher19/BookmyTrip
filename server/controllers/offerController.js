import Offer from '../models/Offer.js';

export const getOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find({});
    res.json(offers);
  } catch (error) {
    next(error);
  }
};

export const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.body;
    const offer = await Offer.findOne({ code: code.toUpperCase() });
    
    if (offer) {
      res.json({ valid: true, offer });
    } else {
      res.status(404).json({ valid: false, message: 'Invalid coupon code' });
    }
  } catch (error) {
    next(error);
  }
};
