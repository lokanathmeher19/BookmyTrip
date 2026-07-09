import express from 'express';
import { getDestinations } from '../controllers/destinationController.js';

const router = express.Router();

router.get('/', getDestinations);

export default router;
