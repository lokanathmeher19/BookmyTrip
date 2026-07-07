import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    images: [{ type: String }],
    rating: { type: Number, required: true, min: 1, max: 5 },
    pricePerNight: { type: Number, required: true },
    amenities: [{ type: String }],
    roomsAvailable: { type: Number, required: true }
  },
  { timestamps: true }
);

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
