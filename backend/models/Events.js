import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please provide a valid email',
    ],
  },
  selectedEvent: {
    type: String,
    required: true,
    // Remove the enum restriction
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('EventRegistration', eventRegistrationSchema);
