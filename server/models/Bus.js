import mongoose from 'mongoose';

const busSchema = new mongoose.Schema(
  {
    operator: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    seatType: { type: String, required: true }, // 'Seater', 'Sleeper', 'Semi-Sleeper'
    fare: { type: Number, required: true },
    availableSeats: { type: Number, required: true }
  },
  { timestamps: true }
);

const Bus = mongoose.model('Bus', busSchema);
export default Bus;
