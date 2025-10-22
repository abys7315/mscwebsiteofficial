import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, ArrowRight, Star } from 'lucide-react';

const CircularBayCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    },
    {
      id: 6,
      title: "Power Platform Workshop",
      date: "May 5, 2024",
      time: "1:00 PM",
      location: "Tech Lab",
      attendees: "60+",
      status: "UPCOMING",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      description: "Build business applications with Microsoft Power Platform.",
      rating: "N/A"
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const handleCardClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const getCardStyle = (index) => {
    const totalCards = events.length;
    const angle = (360 / totalCards) * (index - currentIndex);
    const radius = 280;
    
    // Calculate position on circle
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius;
    
    // Determine if card is in center
    const isCenter = index === currentIndex;
    const scale = isCenter ? 1.2 : 0.8;
    const opacity = Math.abs(angle) > 90 ? 0.3 : 1;
    
    // 3D Bay Window Effect - rotate cards based on their position
    const rotateY = isCenter ? 0 : angle * 0.8; // Center faces forward, sides rotate
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: isCenter ? 20 : 10 - Math.abs(angle) / 30,
    };
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Gothic Background Effects */}
      <div className="absolute inset-0">
        {/* Pulsing Gothic Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Gothic Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Carousel Container */}
      <div className="relative w-full max-w-6xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 gothic-gradient">
            Featured Events
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-red-500 to-transparent"></div>
            <Calendar className="w-6 h-6 text-red-400" />
            <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
          </div>
        </motion.div>

        {/* 3D Carousel Container */}
        <div 
          className="relative h-96 flex items-center justify-center"
          style={{ 
            perspective: '1500px',
            transformStyle: 'preserve-3d'
          }}
        >
          {events.map((event, index) => {
            const isCenter = index === currentIndex;
            
            return (
              <motion.div
                key={event.id}
                className={`absolute w-80 h-96 cursor-pointer transition-all duration-700 ease-out ${
                  isCenter ? 'z-20' : 'z-10'
                }`}
                style={getCardStyle(index)}
                onClick={() => handleCardClick(index)}
                whileHover={{ 
                  scale: isCenter ? 1.25 : 0.85,
                  rotateY: 0, // Straighten card on hover
                  transition: { duration: 0.3 }
                }}
              >
                {/* Card Container */}
                <div className={`
                  relative w-full h-full rounded-2xl overflow-hidden
                  ${isCenter 
                    ? 'gothic-card carti-glow shadow-2xl shadow-red-500/20' 
                    : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl'
                  }
                  border border-gray-700/50 backdrop-blur-sm
                  transition-all duration-500
                `}>
                  
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'COMPLETED' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {event.status}
                    </div>

                    {/* Rating */}
                    {event.rating !== 'N/A' && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-white text-xs font-medium">{event.rating}</span>
                      </div>
                    )}

                    {/* Center Card Glow */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-purple-500/20 pointer-events-none" />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <h3 className={`text-xl font-bold line-clamp-2 transition-colors ${
                      isCenter ? 'text-white gothic-text' : 'text-gray-100'
                    }`}>
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-3 h-3 text-red-400" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-3 h-3 text-purple-400" />
                        <span className="truncate">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-3 h-3 text-red-400" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-3 h-3 text-purple-400" />
                        <span className="truncate">{event.attendees}</span>
                      </div>
                    </div>

                    {/* Action Button - Only show on center card */}
                    {isCenter && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full carti-button text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    )}
                  </div>

                  {/* Center Card Enhanced Glow */}
                  {isCenter && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-purple-500/10 to-red-500/10 pointer-events-none" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 gap-3">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-red-500 shadow-lg shadow-red-500/50 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-400 text-sm">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-red-400 animate-pulse' : 'bg-gray-600'}`} />
          <span>{isAutoPlaying ? 'Auto-rotating' : 'Manual control'}</span>
        </div>
      </div>
    </div>
  );
};

export default CircularBayCarousel;