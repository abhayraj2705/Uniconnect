import React, { useRef, useEffect, useState } from 'react';

const Card = () => {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = direction === 'left' ? -400 : 400;
    
    if (slider) {
      // Calculate new scroll position
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      let newPosition = slider.scrollLeft + scrollAmount;

      // Create infinite loop effect
      if (newPosition > maxScroll) {
        // If we reach the end, jump to start smoothly
        slider.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else if (newPosition < 0) {
        // If we reach the start while scrolling left, jump to end smoothly
        slider.scrollTo({
          left: maxScroll,
          behavior: 'smooth'
        });
      } else {
        // Normal scroll
        slider.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
      
      setScrollPosition(newPosition);
    }
  };

  // Auto scroll functionality
  useEffect(() => {
    let intervalId;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        const slider = sliderRef.current;
        if (slider) {
          // Check if we've reached the end
          if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
            // Reset to start smoothly
            slider.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          } else {
            // Continue scrolling right
            scroll('right');
          }
        }
      }, 3000); // Increased interval to 3 seconds for better user experience
    };

    // Only auto-scroll if not hovered
    if (!isHovered) {
      startAutoScroll();
    }

    // Cleanup on component unmount or when hover state changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered]);

  // Monitor scroll position for infinite loop
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const handleScroll = () => {
        // If we reach the end
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          // Small delay before resetting to create smooth transition
          setTimeout(() => {
            slider.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          }, 500);
        }
      };

      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative max-w-[90vw] mx-auto my-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left scroll button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Cards container with horizontal scroll */}
      <div 
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Cards */}
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-24 rounded-full object-cover" src={'/assets/aces.png'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">ACES</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">For The Students By The Student</p>
        </div>
        
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-24 rounded-full object-cover" src={'/assets/codechef.png'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">CODE CHEF</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Most Tech Oriented Club</p>
        </div>

        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-24 rounded-full object-cover" src={'/assets/javabrevers.png'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">JAVA BREVERS</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The java oriented club </p>
        </div>
        
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/swift club.png'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">SWIFT CLUB</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">For The Apple Lovers </p>
        </div>
        
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/cog.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">COGNISANCE</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Gamers Hub </p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/gfg.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">GFG MIT-ADT</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Mit-ADT Coders Hub</p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/cbc.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">CBC CLUB</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">For The Cyber Enthusiasts Peoples</p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/cybar shakti.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">CYBER SHAKTI </h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">For The Cyber Future Club</p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/bio.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">Bio Engineering Club </h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITBIO</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Biotech Enthusiast Persons</p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/aws.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">AWS CLOUD </h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Official Aws Cloud Computing  Club</p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/ciemanics soh.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">CINEMANICS </h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOH</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">For The Cinamincs People</p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/gdsc.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">GDSC-MIT ADT  </h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Google Student Development Club</p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/gmc.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">GMC-MIT ADT  </h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">For Theh Bike Enthusiast And Riders</p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/groovance.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">GROOVANCE</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">For The Real Talents</p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/iic.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">IIC-MIT ADT</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Peoples Of Innovations Factory </p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/Leapofgrace.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">LEAP OF GRACE</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSBC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Real HIP-HOP Dancers </p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/Astech.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">ASTECH</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Science Greeks  </p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/Adevnture.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">ADVENTURE CLUB</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Adventure Specific Clubs For The Trips  </p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/Muse.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">MUSE CLUBS</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The People Who Are In Search Of Voices  </p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/panchayati.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">Panchayati Club</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Real Drama Begins Here  </p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/shiv.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">SHIVRAI</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Real Devotes Of Shivneri  </p>
        </div>
        <div className="group flex-shrink-0 flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 h-96 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
            <img className="w-24 h-20 rounded-full object-cover" src={'/assets/Tuf.jpg'} alt="userImage2"/>
            <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-4">TUF</h2>
            <p className="text-gray-500 group-hover:text-white/80 mt-2">MITSOC</p>
            <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">The Real Foodies Get Ready  </p>
        </div>
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

export default Card;

