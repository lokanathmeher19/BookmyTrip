import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    discountText: { type: String, required: true },
    accentColor: { type: String, required: true },
    bankName: { type: String },
    code: { type: String, required: true },
    terms: { type: String }
  },
  { timestamps: true }
);

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
