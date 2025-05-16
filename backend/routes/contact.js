import express from 'express';
import { sendEmail, sendContactConfirmationEmail } from '../utils/emailService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Send email to admin
    await sendEmail(
      'your.email@gmail.com',
      `Contact Form: ${subject}`,
      `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    );

    // Send confirmation email to user
    await sendContactConfirmationEmail(email, name, message);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

export default router;