import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema(
  {
    trainNumber: { type: String, required: true, unique: true },
    trainName: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String },
    runsOn: [{ type: String }], // e.g., ['Mon', 'Wed', 'Fri']
    classes: [
      {
        type: { type: String, required: true }, // e.g., '1A', '2A', '3A', 'SL'
        fare: { type: Number, required: true },
        totalSeats: { type: Number, required: true },
        availableSeats: { type: Number, required: true },
        status: { type: String, default: 'AVAILABLE' } // 'AVAILABLE', 'WAITLIST', 'RAC'
      }
    ]
  },
  { timestamps: true }
);

const Train = mongoose.model('Train', trainSchema);
export default Train;
