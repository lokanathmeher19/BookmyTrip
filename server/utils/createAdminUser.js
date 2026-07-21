import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import connectDB from '../config/db.js';

// Load env vars
dotenv.config();

const createAdminUser = async () => {
  try {
    await connectDB();
    
    const email = 'meherlokanath314@gmail.com';
    const password = 'biswa12345';
    
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      console.log(`User ${email} already exists. Updating to Admin and resetting password...`);
      user.isAdmin = true;
      user.passwordHash = password; // The pre-save hook in User model will hash this automatically
      await user.save();
    } else {
      console.log(`Creating new admin user: ${email}...`);
      user = new User({
        name: 'Super Admin',
        email: email,
        passwordHash: password, // The pre-save hook in User model will hash this automatically
        isAdmin: true,
        phone: '9999999999'
      });
      await user.save();
    }

    console.log(`✅ Success! Admin user ${email} is ready.`);
    console.log(`Password is set to: ${password}`);
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdminUser();
