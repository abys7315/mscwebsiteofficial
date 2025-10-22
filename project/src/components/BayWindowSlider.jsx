import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, ArrowRight } from 'lucide-react';

const BayWindowSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverDirection, setHoverDirection] = useState(null);
  const containerRef = useRef(null);
  const rotationIntervalRef = useRef(null);

  const events = [
    {
      id: 1,
      title: "Azure Cloud Workshop",
      date: "March 15, 2024",
      time: "2:00 PM",
      location: "Microsoft Lab, Block A",
      attendees: "50+",
      status: "COMPLETED",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1000&auto=format&fit=crop",
      description: "Comprehensive workshop covering Azure fundamentals and cloud deployment strategies.",
      rating: "4.8"
    },
    {
      id: 2,
      title: "AI & Machine Learning Bootcamp",
      date: "February 28, 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
      attendees: "120+",
      status: "COMPLETED",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop",
      description: "Intensive bootcamp on AI/ML concepts using Microsoft Cognitive Services.",
      rating: "4.9"
    },
    {
      id: 3,
      title: "React Development Workshop",
      date: "February 10, 2024",
      time: "3:00 PM",
      location: "Seminar Hall 2",
      attendees: "75+",
      status: "COMPLETED",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      description: "Building modern web applications with React and TypeScript.",
      rating: "4.7"
    },
    {
      id: 4,
      title: "Microsoft Hackathon 2024",
      date: "April 1-3, 2024",
      time: "48 Hours",
      location: "Main Campus",
      attendees: "200+",
      status: "UPCOMING",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
      description: "48-hour coding challenge with Microsoft technologies.",
      rating: "N/A"
    },
    {
      id: 5,
      title: "Cybersecurity Summit",
      date: "April 20, 2024",
      time: "9:00 AM",
      location: "Conference Hall",
      attendees: "100+",
      status: "UPCOMING",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
      description: "Learn about modern cybersecurity practices and Microsoft security tools.",
      rating: "N/A"
    }
  ];

  // Auto-rotation logic
  useEffect(() => {
    if (!isHovering) {
      rotationIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 4000);
    } else {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    }

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [isHovering, events.length]);

  // Hover-based rotation
  useEffect(() => {
    if (isHovering && hoverDirection) {
      const rotationInterval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (hoverDirection === 'right') {
            return (prev + 1) % events.length;
          } else {
            return prev === 0 ? events.length - 1 : prev - 1;
          }
        });
      }, 800);

      return () => clearInterval(rotationInterval);
    }
  }, [isHovering, hoverDirection, events.length]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const threshold = rect.width * 0.3; // 30% from edges
    
    if (x < threshold) {
      setHoverDirection('left');
    } else if (x > rect.width - threshold) {
      setHoverDirection('right');
    } else {
      setHoverDirection(null);
    }
  };

  const getCardStyle = (index) => {
    const totalCards = events.length;
    const angle = (360 / totalCards) * (index - currentIndex);
    
    // Responsive radius
    const radius = window.innerWidth < 640 ? 180 : 
                  window.innerWidth < 1024 ? 240 : 320;
    
    // Calculate position on circle
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius;
    
    // Determine card position
    const isCenter = index === currentIndex;
    const isVisible = Math.abs(angle) <= 90;
    
    // Scale and rotation based on position
    let scale = 0.7;
    let rotateY = 0;
    let opacity = 0.4;
    let zIndex = 1;
    
    // Responsive scaling
    const baseScale = window.innerWidth < 640 ? 0.6 : 
                     window.innerWidth < 1024 ? 0.75 : 1;
    
    if (isCenter) {
      scale = baseScale * 1.1;
      rotateY = 0;
      opacity = 1;
      zIndex = 10;
    } else if (Math.abs(angle) <= 45) {
      // Side cards
      scale = baseScale * 0.85;
      rotateY = angle > 0 ? -25 : 25; // Rotate away from center
      opacity = 0.8;
      zIndex = 5;
    } else if (isVisible) {
      // Far side cards
      scale = baseScale * 0.7;
      rotateY = angle > 0 ? -35 : 35;
      opacity = 0.5;
      zIndex = 2;
    }
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: isVisible ? opacity : 0,
      zIndex,
    };
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
        {/* 3D Carousel Container */}
        <div 
          ref={containerRef}
          className="relative h-64 md:h-80 lg:h-96 w-full flex items-center justify-center cursor-pointer"
          style={{ 
            perspective: window.innerWidth < 640 ? '800px' : 
                        window.innerWidth < 1024 ? '1000px' : '1200px',
            transformStyle: 'preserve-3d'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setHoverDirection(null);
          }}
          onMouseMove={handleMouseMove}
        >
          {/* Hover Direction Indicators */}
          {isHovering && hoverDirection && (
            <div className={`absolute top-1/2 transform -translate-y-1/2 z-30 ${
              hoverDirection === 'left' ? 'left-8' : 'right-8'
            }`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20"
              >
                <ArrowRight className={`w-6 h-6 text-white ${
                  hoverDirection === 'left' ? 'rotate-180' : ''
                }`} />
              </motion.div>
            </div>
          )}

          {events.map((event, index) => {
            const cardStyle = getCardStyle(index);
            const isCenter = index === currentIndex;
            
            return (
              <motion.div
                key={event.id}
                className="absolute w-48 h-60 md:w-64 md:h-80 lg:w-80 lg:h-96 bay-window-card"
                style={cardStyle}
                animate={cardStyle}
                transition={{
                  duration: window.innerWidth < 640 ? 0.8 : 
                           window.innerWidth < 1024 ? 1.0 : 1.2,
                  ease: [0.23, 1, 0.32, 1], // Apple-style easing for ultra-smooth motion
                }}
              >
                {/* Card Container */}
                <div className={`
                  relative w-full h-full rounded-2xl overflow-hidden
                  ${isCenter 
                    ? 'apple-card shadow-2xl shadow-apple-blue/20 border border-apple-blue/30' 
                    : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700/50'
                  }
                  backdrop-blur-sm transition-all duration-500
                `}>
                  
                  {/* Image Section */}
                  <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'COMPLETED' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-apple-blue/20 text-apple-blue border border-apple-blue/30'
                    }`}>
                      {event.status}
                    </div>

                    {/* Rating */}
                    {event.rating !== 'N/A' && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white text-xs font-medium">{event.rating}</span>
                      </div>
                    )}

                    {/* Center Card Glow */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-apple-blue/20 via-transparent to-purple-500/20 pointer-events-none" />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-3 md:p-4 lg:p-6 space-y-2 md:space-y-3 lg:space-y-4">
                    <h3 className={`text-sm md:text-lg lg:text-xl font-bold line-clamp-2 transition-colors ${
                      isCenter ? 'text-apple-gray-900 dark:text-white' : 'text-gray-100'
                    }`}>
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-300 text-xs md:text-sm line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-1 md:gap-2 text-xs">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-2 h-2 md:w-3 md:h-3 text-apple-blue" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-2 h-2 md:w-3 md:h-3 text-purple-400" />
                        <span className="truncate">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-2 h-2 md:w-3 md:h-3 text-apple-blue" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-2 h-2 md:w-3 md:h-3 text-purple-400" />
                        <span className="truncate">{event.attendees}</span>
                      </div>
                    </div>

                    {/* Action Button - Only show on center card */}
                    {isCenter && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full apple-button text-white py-1 md:py-2 px-2 md:px-4 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 group"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    )}
                  </div>

                  {/* Center Card Enhanced Glow */}
                  {isCenter && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-apple-blue/10 via-purple-500/10 to-apple-blue/10 pointer-events-none" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 md:bottom-12 lg:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-apple-blue shadow-lg shadow-apple-blue/50 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Instructions */}
      </div>
    </div>
  );
};

export default BayWindowSlider;