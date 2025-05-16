import express from 'express';
import multer from 'multer';
import path from 'path';
import Event from '../models/Event.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, 'event-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Public route - Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events || []); // Ensure we always return an array
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: error.message });
  }
});

// Public route - Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: error.message });
  }
});

// Protected routes - Require authentication
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, domain, tagline, date, venue, capacity, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newEvent = new Event({
      name,
      domain,
      tagline,
      date,
      venue,
      capacity: parseInt(capacity),
      description,
      image: `/uploads/${req.file.filename}`
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({
      message: 'Event created successfully',
      event: savedEvent
    });
    
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;