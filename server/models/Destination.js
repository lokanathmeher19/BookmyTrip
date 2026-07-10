import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    state: { type: String, required: true },
    image: { type: String, required: true },
    badgeText: { type: String, required: true },
    imagePosition: { type: String, default: 'object-center' },
    imageFit: { type: String, default: 'object-cover' }
  },
  { timestamps: true }
);

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
