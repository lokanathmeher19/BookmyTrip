import express from 'express';
import { searchBuses } from '../controllers/busController.js';

const router = express.Router();

router.get('/search', searchBuses);

export default router;
