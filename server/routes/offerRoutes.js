import express from 'express';
import { getOffers, validateCoupon } from '../controllers/offerController.js';

const router = express.Router();

router.get('/', getOffers);
router.post('/validate', validateCoupon);

export default router;
