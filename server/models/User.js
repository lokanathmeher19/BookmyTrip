import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    passwordHash: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    savedPassengers: [
      {
        name: String,
        age: Number,
        gender: String,
      }
    ],
    wishlist: [
      {
        itemType: String, // 'hotel', 'flight', etc.
        itemId: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  { timestamps: true }
);

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
