import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@uniconnect.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin',
      email: 'admin@uniconnect.com',
      password: hashedPassword,
      isAdmin: true
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();