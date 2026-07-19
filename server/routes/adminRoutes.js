import express from 'express';
import { 
  getOverviewStats, 
  getAllUsers, 
  updateUserRole, 
  deleteUser, 
  getAllBookings, 
  deleteBooking,
  createTrain,
  updateTrain,
  deleteTrain,
  createBus,
  updateBus,
  deleteBus
} from '../controllers/adminController.js';
import { createOffer, updateOffer, deleteOffer } from '../controllers/offerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect and admin middleware to all routes
router.use(protect, admin);

// Overview Stats
router.get('/stats', getOverviewStats);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Booking Management
router.get('/bookings', getAllBookings);
router.delete('/bookings/:id', deleteBooking);

// Train Management
router.post('/trains', createTrain);
router.put('/trains/:id', updateTrain);
router.delete('/trains/:id', deleteTrain);

// Bus Management
router.post('/buses', createBus);
router.put('/buses/:id', updateBus);
router.delete('/buses/:id', deleteBus);
// Offer Management
router.post('/offers', createOffer);
router.put('/offers/:id', updateOffer);
router.delete('/offers/:id', deleteOffer);

export default router;
