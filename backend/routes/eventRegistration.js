import express from 'express';
import EventRegistration from '../models/Events.js';
import Event from '../models/Event.js';
import { sendEventRegistrationEmail } from '../utils/emailService.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// 📌 Register a user for an event
router.post('/register', async (req, res) => {
  const { userName, userEmail, selectedEvent } = req.body;

  try {
    // Validate input
    if (!userName || !userEmail || !selectedEvent) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    // Check for duplicate registration
    const existing = await EventRegistration.findOne({ userEmail, selectedEvent });
    if (existing) {
      return res.status(400).json({ msg: 'You are already registered for this event' });
    }

    // Get event details
    const event = await Event.findOne({ name: selectedEvent });
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Create new registration
    const registration = new EventRegistration({
      userName,
      userEmail,
      selectedEvent
    });

    await registration.save();

    // Send confirmation email
    try {
      await sendEventRegistrationEmail(userEmail, userName, event);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
    }

    res.status(201).json({
      msg: 'Registration successful! Check your email for confirmation.',
      registration
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      msg: err.message || 'Error registering for event' 
    });
  }
});

// 📌 Get all registrations
router.get('/all', auth, async (req, res) => {
  try {
    const allRegistrations = await EventRegistration.find().sort({ createdAt: -1 });
    res.json(allRegistrations);
  } catch (err) {
    console.error('Error fetching registrations:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📌 Get registrations by event
router.get('/event/:eventName', async (req, res) => {
  try {
    const registrations = await EventRegistration.find({ selectedEvent: req.params.eventName });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;