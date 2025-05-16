import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AdminNavbar from '../../components/AdminNavbar';
import EventsManagement from './EventsManagement';
import UsersManagement from './UsersManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

          <div className="flex space-x-4 mb-6">
            <button
              className={`px-6 py-2 rounded-lg ${
                activeTab === 'events'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600'
              }`}
              onClick={() => setActiveTab('events')}
            >
              Manage Events
            </button>
            <button
              className={`px-6 py-2 rounded-lg ${
                activeTab === 'users'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600'
              }`}
              onClick={() => setActiveTab('users')}
            >
              View Registrations
            </button>
          </div>

          {activeTab === 'events' ? <EventsManagement /> : <UsersManagement />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;