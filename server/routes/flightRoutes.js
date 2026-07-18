import express from 'express';
import { searchFlights, createFlight, deleteFlight } from '../controllers/flightController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createFlight);
router.route('/:id').delete(protect, admin, deleteFlight);
router.get('/search', searchFlights);

export default router;
