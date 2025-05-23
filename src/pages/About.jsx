import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const teamMembers = [
    {
      name: "Abhayraj B",
      role: "Founder"
    },
    {
      name: "Ameersohiel Momin",
      role: "Founder"
    },
    {
      name: "Hrishikesh Jhamble",
      role: "Founder"
    },
    {
      name: "Avneet Bhatt",
      role: "Founder"
    },
    {
      name: "Prof. Amit Uttrakar Sir",
      role: "Mentor"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-40">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-800 mb-8"
          >
            About UniConnect
          </motion.h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              UniConnect is dedicated to fostering a vibrant campus community by connecting students 
              with university clubs, events, and activities. We believe in creating meaningful 
              opportunities for student engagement and personal growth.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Event Management</h3>
                <p className="text-gray-600">
                  Streamlined registration and management for all campus events.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Club Directory</h3>
                <p className="text-gray-600">
                  Comprehensive listing of all university clubs and organizations.
                </p>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold text-gray-700 mb-8 text-center"
            >
              Meet Our Team
            </motion.h2>

            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={item}
                  className="text-center group"
                >
                  <div className="relative inline-block">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                      <img 
                        src="/assets/default-avatar.jpg" // Using the same default avatar for all
                        alt={member.name}
                        className="relative w-32 h-32 rounded-full mx-auto mb-4 object-cover bg-gray-100"
                      />
                    </motion.div>
                  </div>
                  <motion.h3 
                    className="text-lg font-medium text-gray-700"
                    whileHover={{ scale: 1.05 }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {member.role}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;