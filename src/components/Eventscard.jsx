import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import API_URL from '../config/api';

const Eventscard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -400 : 400;
    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/events`, {
        headers: {
          'Content-Type': 'application/json',
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-600">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-[90vw] mx-auto my-8">
      {/* Left scroll button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Events container with horizontal scroll */}
      <div 
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {events.map((event) => (
          <div
            key={event._id}
            onClick={() => navigate(`/registration/${event._id}`)}
            className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-300 transition"
          >
            <img 
              className="w-24 h-24 rounded-full object-cover" 
              src={`https://uniconnect-backend-zd5n.onrender.com${event.image}`} 
              alt={event.name}
              onError={(e) => {
                e.target.src = '/src/assets/default-event.png';
              }}
            />
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">
              {event.name}
            </h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">
              {event.domain}
            </p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">
              {event.tagline}
            </p>
            <p className="text-sm text-gray-500 group-hover:text-white/80 mt-2">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 group-hover:text-white/80">
              Venue: {event.venue}
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/registration/${event._id}`);
              }}
            >
              Register
            </button>
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Eventscard;