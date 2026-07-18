import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load env vars
dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const email = 'meherlokanath314@gmail.com';
    const password = 'biswa12345';
    
    // Check if user already exists
    let adminUser = await User.findOne({ email });

    if (adminUser) {
      console.log('User already exists. Updating to ensure Admin privileges and resetting password...');
      adminUser.isAdmin = true;
      adminUser.passwordHash = password; // The pre-save hook will hash this automatically
      await adminUser.save();
      console.log('Admin user updated successfully!');
    } else {
      console.log('Creating new Admin user...');
      adminUser = new User({
        name: 'Admin Meher',
        email: email,
        passwordHash: password, // The pre-save hook hashes it
        isAdmin: true,
      });
      await adminUser.save();
      console.log('Admin user created successfully!');
    }

    console.log(`✅ ID: ${email}`);
    console.log(`✅ Password: ${password}`);
    console.log(`✅ Admin Access: Securely Granted`);
    
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
