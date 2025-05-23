import React, { useState, useEffect } from 'react';
import API_URL from '../../config/api';
import { getImageUrl } from '../../utils/imageUtils';

const EventsManagement = () => {
  const [events, setEvents] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [newEvent, setNewEvent] = useState({
    name: '',
    domain: '',
    tagline: '',
    date: '',
    venue: '',
    capacity: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/events`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      setNewEvent({ ...newEvent, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      Object.keys(newEvent).forEach(key => {
        if (key === 'image' && newEvent[key] instanceof File) {
          formData.append('image', newEvent[key]);
        } else {
          formData.append(key, newEvent[key]);
        }
      });

      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
      }

      const data = await response.json();
      setEvents(prev => [...prev, data.event]);
      // Reset form
      setNewEvent({
        name: '',
        domain: '',
        tagline: '',
        date: '',
        venue: '',
        capacity: '',
        description: '',
        image: null,
      });
      setImagePreview(null);
      
    } catch (error) {
      console.error('Error creating event:', error);
      alert(error.message);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`${API_URL}/api/events/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete event');
        }

        // Remove the event from state
        setEvents(events.filter(event => event._id !== eventId));
        alert('Event deleted successfully');
        
      } catch (error) {
        console.error('Error deleting event:', error);
        if (error.message.includes('401')) {
          alert('Unauthorized. Please log in again.');
          // Optionally redirect to login
          // navigate('/login');
        } else {
          alert('Failed to delete event: ' + error.message);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Domain/Category"
              value={newEvent.domain}
              onChange={(e) => setNewEvent({...newEvent, domain: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Tagline"
              value={newEvent.tagline}
              onChange={(e) => setNewEvent({...newEvent, tagline: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Venue"
              value={newEvent.venue}
              onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Capacity"
              value={newEvent.capacity}
              onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})}
              className="p-2 border rounded"
              required
            />
          </div>
          <textarea
            placeholder="Event Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Event Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="mt-2 h-32 w-32 object-cover rounded"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Event
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Current Events</h2>
        
        {loading && (
          <div className="text-center py-4">Loading events...</div>
        )}

        {error && (
          <div className="text-red-500 text-center py-4">{error}</div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-4">No events found</div>
        )}

        <div className="grid gap-4">
          {Array.isArray(events) && events.map((event) => (
            <div key={event._id} className="border rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="text-gray-600">{event.tagline}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">Venue: {event.venue}</p>
                </div>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
              <img 
                src={getImageUrl(event.image)} 
                alt={event.name}
                className="h-32 w-32 object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/default-event.jpg';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsManagement;