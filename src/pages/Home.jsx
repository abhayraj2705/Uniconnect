import React, { useEffect, useRef } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Eventscard from '../components/Eventscard';
import Footer from '../components/Footer';
import Typed from 'typed.js';

const Home = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Welcome To UniConnect',
        'Your Campus Community Hub',
        'Connect. Engage. Excel.'
      ],
      typeSpeed: 90,
      backSpeed: 50,
      loop: true,
      cursorChar: '|',
    });

    // Destroying on cleanup
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="pt-36">
          <div className="header text-center items-center text-2xl font-bold font-mono py-10">
            <h1>
              <span ref={el} className="text-blue-600" />
            </h1>
            <h3 className="text-xl mt-4">One Platform. Every Event. Infinite Possibilities</h3>
          </div>
        </div>

        <div className="w-full h-px bg-gray-500" />

        <div className="content text-center items-center text-2xl font-bold font-mono py-1">
          <h2>Feature clubs</h2>
        </div>

        <div className="py-8">
          <Card/>
        </div>

        <div className="w-full h-px bg-gray-500" />

        <div className="content text-center items-center text-2xl font-bold font-mono py-8">
          <h2>Upcoming Events</h2>
        </div>

        <div className="py-8">
          <Eventscard/>
        </div>
      </div>
    </div>
  );
};

export default Home;
