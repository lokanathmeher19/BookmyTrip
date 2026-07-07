import express from 'express';
import { searchTrains, getTrains, getLiveStatus } from '../controllers/trainController.js';

const router = express.Router();

router.get('/search', searchTrains);
router.get('/', getTrains);
router.get('/:id/live-status', getLiveStatus);

export default router;
