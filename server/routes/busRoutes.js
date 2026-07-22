import express from 'express';
import { searchBuses, getBusById } from '../controllers/busController.js';

const router = express.Router();

router.get('/search', searchBuses);
router.get('/:id', getBusById);

export default router;
