import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './routes/auth.js';
import eventRegistrationRoutes from './routes/eventRegistration.js';
import eventRoutes from './routes/events.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, 'event-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://uniconnect-qs2s.onrender.com', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set proper permissions
fs.chmodSync(uploadDir, '755');

// Update static file serving configuration
if (process.env.NODE_ENV === 'production') {
  // Serve static files from uploads directory
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  // API Routes should come before the catch-all route
  app.use('/api/auth', authRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/registration', eventRegistrationRoutes);
  app.use('/api/contact', contactRoutes);

  // Remove frontend serving since it's deployed separately
  app.get('/', (req, res) => {
    res.json({ message: 'UniConnect API is running' });
  });
} else {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/registration', eventRegistrationRoutes);
  app.use('/api/contact', contactRoutes);

  app.get('/', (req, res) => {
    res.json({ message: 'UniConnect API is running in development mode' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;