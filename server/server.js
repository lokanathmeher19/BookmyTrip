import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import trainRoutes from './routes/trainRoutes.js';
import flightRoutes from './routes/flightRoutes.js';
import busRoutes from './routes/busRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import pnrRoutes from './routes/pnrRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js'; 

// Load env vars
dotenv.config({ override: true });

// Connect to database
connectDB();

const app = express();

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route
app.get('/', (req, res) => {
  res.send('TripEase API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/coupons', offerRoutes);
app.use('/api/pnr', pnrRoutes);
app.use('/api/destinations', destinationRoutes);

// Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
