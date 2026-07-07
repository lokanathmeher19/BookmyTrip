import express from 'express';
import { getPnrStatus } from '../controllers/pnrController.js';

const router = express.Router();

router.get('/:pnrNumber', getPnrStatus);

export default router;
