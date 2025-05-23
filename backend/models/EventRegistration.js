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
  },
  selectedEvent: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

export default mongoose.model('EventRegistration', eventRegistrationSchema);