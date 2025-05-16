import React from 'react';
import { useNavigate } from 'react-router';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">Admin Dashboard</span>
          <button 
            onClick={() => navigate('/admin')}
            className="hover:text-blue-400"
          >
            Manage Events
          </button>
          <button 
            onClick={() => navigate('/admin/users')}
            className="hover:text-blue-400"
          >
            View Registrations
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span>Admin</span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;