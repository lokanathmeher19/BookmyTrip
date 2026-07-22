import express from 'express';
import { searchTrains, getTrains, getLiveStatus, getTrainById } from '../controllers/trainController.js';

const router = express.Router();

router.get('/search', searchTrains);
router.get('/', getTrains);
router.get('/:id/live-status', getLiveStatus);
router.get('/:id', getTrainById);

export default router;
