import express from 'express';
import EventRegistration from '../models/Events.js';
import Event from '../models/Event.js';
import { sendEventRegistrationEmail } from '../utils/emailService.js';

const router = express.Router();

// 📌 Register a user for an event
router.post('/register', async (req, res) => {
  const { userName, userEmail, selectedEvent } = req.body;

  try {
    // Check for duplicate registration
    const existing = await EventRegistration.findOne({ userEmail, selectedEvent });
    if (existing) {
      return res.status(400).json({ msg: 'User already registered for this event' });
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
      // Continue with registration even if email fails
    }

    res.status(201).json({
      msg: 'Registered successfully! Check your email for confirmation.',
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
router.get('/all', async (req, res) => {
  try {
    const allRegistrations = await EventRegistration.find().sort({ createdAt: -1 });
    res.json(allRegistrations);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
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
