import React from 'react';
import { motion } from 'framer-motion';
import API_URL from '../config/api';

const Announcements = () => {
  return (
    <div className="min-h-screen pt-40 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">🏆 Club Awards 2024-25</h1>
          <p className="text-gray-600 text-lg">Celebrating Excellence in Student Leadership</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Best Club Award Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <img 
                src={`${API_URL}/uploads/Adevnture.jpg`}
                alt="Adventure Club" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold shadow-lg">
                  🥇 Winner 2024-25
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Adventure Club</h2>
                <span className="text-blue-600 font-semibold">MITSOC</span>
              </div>
              <p className="text-gray-600 mb-4">
                Awarded as the "Best Club of the Year 2024-25" for exceptional contribution to student life 
                and organizing outstanding adventure activities throughout the year.
              </p>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Key Achievements:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Organized 15+ successful expeditions</li>
                  <li>1000+ student participation</li>
                  <li>Perfect safety record</li>
                  <li>Environmental awareness initiatives</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Runner Up Club Award Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <img 
                src="/assets/aces.png" 
                alt="ACES" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold shadow-lg">
                  🥇 Runners Up
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">ACES</h2>
                <span className="text-blue-600 font-semibold">MITSOC</span>
              </div>
              <p className="text-gray-600 mb-4">
                Recognized as "Runner Up Club of the Year 2024-25" for outstanding technical innovations 
                and student development programs.
              </p>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Notable Achievements:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>20+ technical workshops conducted</li>
                  <li>5 major hackathons organized</li>
                  <li>Industry collaboration projects</li>
                  <li>Student mentorship program</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Latest Updates Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">📢 Latest Updates</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">🎉 Award Ceremony 2024</h3>
              <p className="text-gray-600">Join us for the grand award ceremony on June 1st, 2024 at MIT-ADT University Auditorium. Special guests and performances await!</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">📌 Club Registration Open</h3>
              <p className="text-gray-600">New club registrations for 2024-25 academic year are now open. Apply before May 30th, 2024.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Announcements;