import express from 'express';
import { getWallet, addFunds } from '../controllers/walletController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getWallet)
  .post(protect, addFunds);

export default router;
