import express from 'express';
import { searchFlights, createFlight, updateFlight, deleteFlight, getFlightById } from '../controllers/flightController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createFlight);
router.route('/:id').get(getFlightById).put(protect, admin, updateFlight).delete(protect, admin, deleteFlight);
router.get('/search', searchFlights);

export default router;
