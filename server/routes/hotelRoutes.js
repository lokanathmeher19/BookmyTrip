import express from 'express';
import { searchHotels, createHotel, updateHotel, deleteHotel } from '../controllers/hotelController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createHotel);
router.route('/:id').put(protect, admin, updateHotel).delete(protect, admin, deleteHotel);
router.get('/search', searchHotels);

export default router;
