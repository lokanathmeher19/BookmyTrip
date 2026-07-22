import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true },
    airline: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    duration: { type: String },
    stops: { type: Number, default: 0 },
    classes: [
      {
        type: { type: String, required: true }, // 'Economy', 'Business', 'First'
        fare: { type: Number, required: true },
        availableSeats: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

const Flight = mongoose.model('Flight', flightSchema);
flightSchema.index({ source: 1, destination: 1 });
export default Flight;
