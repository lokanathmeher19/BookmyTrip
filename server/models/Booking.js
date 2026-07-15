import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['train', 'flight', 'bus', 'hotel'] },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    passengers: [
      {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        status: { type: String, default: 'CONFIRMED' }
      }
    ],
    travelDate: { type: Date, required: true },
    fareBreakdown: {
      baseFare: { type: Number, required: true },
      tax: { type: Number, required: true },
      total: { type: Number, required: true }
    },
    couponCode: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['HOLD', 'PENDING', 'CONFIRMED', 'CANCELLED', 'FAILED'],
      default: 'HOLD'
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes hold time
    },
    pnr: {
      type: String,
      unique: true,
      required: true
    },
    qrCodeUrl: {
      type: String
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
