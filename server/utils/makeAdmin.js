import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load env vars
dotenv.config({ path: '../.env' });

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const emailToPromote = process.argv[2];
    
    if (!emailToPromote) {
      console.log('❌ Please provide the email address of the user you want to make an admin.');
      console.log('Usage: node makeAdmin.js <user_email>');
      process.exit(1);
    }

    const user = await User.findOne({ email: emailToPromote });

    if (!user) {
      console.log(`❌ User with email ${emailToPromote} not found!`);
      process.exit(1);
    }

    user.isAdmin = true;
    await user.save();

    console.log(`✅ Success! User ${user.name} (${user.email}) is now an Admin!`);
    console.log('You can now log in and access the Admin Dashboard.');
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

makeAdmin();
