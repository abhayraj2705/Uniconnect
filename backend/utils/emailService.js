import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD // Use Gmail App Password
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export const sendEventRegistrationEmail = async (userEmail, userName, eventDetails) => {
  const subject = `Event Registration Confirmation - ${eventDetails.name}`;
  const html = `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 30px;">
        <svg width="320" height="80" viewBox="0 0 320 80" style="max-width: 200px;" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="30" fill="#000000"/>
          <text x="29" y="55" font-family="Arial, sans-serif" font-size="32" fill="#ffffff" font-weight="bold">U</text>
          <text x="90" y="55" font-family="Arial, sans-serif" font-size="32" fill="#000000" font-weight="bold">UniConnect</text>
        </svg>
      </div>

      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: #ffffff; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px; text-align: center;">Registration Confirmed! 🎉</h1>
      </div>

      <div style="padding: 20px; border-radius: 10px; background-color: #f8fafc; margin-bottom: 20px;">
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${userName},</p>
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Thank you for registering for <strong>${eventDetails.name}</strong>! Your spot has been secured and we're excited to have you join us.
        </p>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0; font-size: 18px;">Event Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 0; color: #4b5563; font-weight: 600;">Event Name</td>
              <td style="padding: 12px 0; color: #6b7280;">${eventDetails.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 0; color: #4b5563; font-weight: 600;">Date</td>
              <td style="padding: 12px 0; color: #6b7280;">${new Date(eventDetails.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 0; color: #4b5563; font-weight: 600;">Time</td>
              <td style="padding: 12px 0; color: #6b7280;">${eventDetails.time || 'To be announced'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #4b5563; font-weight: 600;">Venue</td>
              <td style="padding: 12px 0; color: #6b7280;">${eventDetails.venue}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #fffbeb; border: 1px solid #fbbf24; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #92400e; margin: 0; font-size: 14px;">
            <strong>Important:</strong> Please save this email for your reference. You may be asked to show this confirmation at the event.
          </p>
        </div>
      </div>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px; text-align: center;">Stay Connected</h2>
        <div style="text-align: center;">
          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Website</a>
          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Instagram</a>
          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">LinkedIn</a>
        </div>
      </div>

      <div style="text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p style="margin-bottom: 10px;">© ${new Date().getFullYear()} UniConnect. All rights reserved.</p>
        <p>MIT School of Engineering, Pune</p>
      </div>
    </div>
  `;

  await sendEmail(userEmail, subject, html);
};

export const sendContactConfirmationEmail = async (userEmail, userName, message) => {
  const subject = 'Thank You for Contacting UniConnect';
  const html = `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 30px;">
        <svg width="320" height="80" viewBox="0 0 320 80" style="max-width: 200px;" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="30" fill="#000000"/>
          <text x="29" y="55" font-family="Arial, sans-serif" font-size="32" fill="#ffffff" font-weight="bold">U</text>
          <text x="90" y="55" font-family="Arial, sans-serif" font-size="32" fill="#000000" font-weight="bold">UniConnect</text>
        </svg>
      </div>
      
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: #ffffff; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px; text-align: center;">Thank You for Reaching Out!</h1>
      </div>

      <div style="padding: 20px; border-radius: 10px; background-color: #f8fafc; margin-bottom: 20px;">
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${userName},</p>
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for contacting UniConnect. We've received your message and our team will review it shortly. We typically respond within 24-48 hours.</p>
        
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
          <p style="color: #4b5563; font-size: 14px; margin: 0;"><strong>Your Message:</strong></p>
          <p style="color: #6b7280; font-style: italic; margin: 10px 0 0 0;">${message}</p>
        </div>
      </div>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px; text-align: center;">Connect With Us</h2>
        <div style="text-align: center;">
          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Website</a>
          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Instagram</a>
          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">LinkedIn</a>
        </div>
      </div>

      <div style="text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p style="margin-bottom: 10px;">© ${new Date().getFullYear()} UniConnect. All rights reserved.</p>
        <p>MIT School of Engineering, Pune</p>
      </div>
    </div>
  `;

  await sendEmail(userEmail, subject, html);
};