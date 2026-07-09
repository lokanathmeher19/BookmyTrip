import User from '../models/User.js';

export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.json(user.wishlist);
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { itemType, itemId } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      // Check if item already exists
      const exists = user.wishlist.find(item => item.itemId.toString() === itemId);
      if (!exists) {
        user.wishlist.push({ itemType, itemId });
        await user.save();
      }
      res.json(user.wishlist);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    if (user) {
      user.wishlist = user.wishlist.filter(item => item._id.toString() !== id && item.itemId.toString() !== id);
      await user.save();
      res.json(user.wishlist);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};
