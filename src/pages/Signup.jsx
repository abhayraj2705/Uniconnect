import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isAdmin: false // Ensure new signups are regular users by default
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Signup failed');
      }

      alert('Signup successful! Please login.');
      navigate('/Login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-2 border border-gray-300 rounded"
          required
        />

        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
