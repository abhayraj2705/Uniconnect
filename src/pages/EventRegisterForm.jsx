import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const EventRegisterForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    eventId: eventId
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        userName: user.name,
        userEmail: user.email
      }));
    }
  }, [user]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}`);
      if (!response.ok) {
        throw new Error('Event not found');
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
      navigate('/events'); // Redirect to events page if event not found
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Validate input
      if (!formData.userName || !formData.userEmail) {
        setMessage('Please fill in all fields');
        return;
      }

      const res = await fetch(`${API_URL}/api/registration/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userName: formData.userName,
          userEmail: formData.userEmail,
          selectedEvent: event.name
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Registration failed');
      }

      setMessage('Registration successful! Please check your email for confirmation.');
      
      // Show success message for longer
      setTimeout(() => {
        navigate('/events');
      }, 3000);
    } catch (err) {
      setMessage(err.message);
      console.error('Registration error:', err);
    }
  };

  if (!event) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded mt-20 pt-36">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Register for {event.name}
      </h2>

      {message && (
        <p className={`text-sm mb-4 text-center ${
          message.includes('successful') ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Full Name:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email Address:</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium mb-2">Event Details</h3>
          <p className="text-sm text-gray-600">Event: {event.name}</p>
          <p className="text-sm text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600">Venue: {event.venue}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default EventRegisterForm;
