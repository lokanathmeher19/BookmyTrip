import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: { type: String, required: true },
    category: [{ type: String }],
    imageUrl: { type: String, required: true },
    shortDescription: { type: String },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    priceStartingFrom: { type: String },
    imageFit: { type: String, default: 'object-cover' },
    imagePosition: { type: String, default: 'object-center' },
    longDescription: { type: String },
    bestTimeToVisit: { type: String },
    attractions: [{ type: String }],
    facilities: [{ type: String }],
    weather: { type: String },
    howToReach: { type: String },
    galleryImages: [{ type: String }],
  },
  { timestamps: true }
);

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
