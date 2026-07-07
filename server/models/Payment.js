import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true }, // e.g., 'UPI', 'Credit Card', 'Net Banking'
    status: { type: String, default: 'PENDING', enum: ['PENDING', 'SUCCESS', 'FAILED'] },
    transactionId: { type: String }
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
