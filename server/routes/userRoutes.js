import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/wishlist')
  .get(protect, getWishlist)
  .post(protect, addToWishlist);

router.delete('/wishlist/:id', protect, removeFromWishlist);

export default router;
