import express from 'express';
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  uploadDestinationImage
} from '../controllers/destinationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getDestinations)
  .post(protect, admin, createDestination);

router.post('/upload-image', protect, admin, upload.single('image'), uploadDestinationImage);

router.route('/:id')
  .get(getDestinationById)
  .put(protect, admin, updateDestination)
  .delete(protect, admin, deleteDestination);

export default router;
