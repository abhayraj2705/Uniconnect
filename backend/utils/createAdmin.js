import User from '../models/User.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@uniconnect.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await User.create({
      name: 'Admin',
      email: 'admin@uniconnect.com',
      password: hashedPassword,
      isAdmin: true
    });
    
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

createAdmin();