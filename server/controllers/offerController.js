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

export const createOffer = async (req, res, next) => {
  try {
    const offer = new Offer(req.body);
    // Ensure code is uppercase
    if (offer.code) offer.code = offer.code.toUpperCase();
    const createdOffer = await offer.save();
    res.status(201).json(createdOffer);
  } catch (error) {
    next(error);
  }
};

export const updateOffer = async (req, res, next) => {
  try {
    if (req.body.code) req.body.code = req.body.code.toUpperCase();
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!offer) {
      res.status(404);
      throw new Error('Offer not found');
    }
    res.json(offer);
  } catch (error) {
    next(error);
  }
};

export const deleteOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      res.status(404);
      throw new Error('Offer not found');
    }
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Offer deleted' });
  } catch (error) {
    next(error);
  }
};
