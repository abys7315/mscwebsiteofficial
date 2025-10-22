import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Code, Calendar, Megaphone, Palette, PenTool } from 'lucide-react';

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const departments = [
    {
      id: 'admin',
      name: 'Admin',
      icon: Users,
      color: '#007AFF',
      members: [
        { name: 'John Doe', role: 'Chapter Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop' },
        { name: 'Jane Smith', role: 'Vice Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop' },
        { name: 'Mike Johnson', role: 'Secretary', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
      id: 'technical',
      name: 'Technical',
      icon: Code,
      color: '#5856D6',
      members: [
        { name: 'Sarah Wilson', role: 'Technical Head', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop' },
        { name: 'Alex Brown', role: 'Cloud Expert', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
        { name: 'Emily Davis', role: 'Full Stack Dev', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
      id: 'events',
      name: 'Events',
      icon: Calendar,
      color: '#34C759',
      members: [
        { name: 'David Lee', role: 'Events Head', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop' },
        { name: 'Lisa Chen', role: 'Event Coordinator', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop' },
        { name: 'Tom Wilson', role: 'Logistics Manager', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
      id: 'outreach',
      name: 'Outreach',
      icon: Megaphone,
      color: '#FF9500',
      members: [
        { name: 'Anna Taylor', role: 'Outreach Head', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop' },
        { name: 'Chris Martin', role: 'Community Manager', image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=150&auto=format&fit=crop' },
        { name: 'Maya Patel', role: 'Social Media Lead', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
      id: 'design',
      name: 'Design',
      icon: Palette,
      color: '#FF2D92',
      members: [
        { name: 'Ryan Garcia', role: 'Design Head', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop' },
        { name: 'Sophie Kim', role: 'UI/UX Designer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop' },
        { name: 'Jake Thompson', role: 'Graphic Designer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
      id: 'content',
      name: 'Content',
      icon: PenTool,
      color: '#5AC8FA',
      members: [
        { name: 'Rachel Green', role: 'Content Head', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop' },
        { name: 'Mark Davis', role: 'Technical Writer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
        { name: 'Nina Rodriguez', role: 'Content Creator', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop' }
      ]
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating || hoveredCard) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % departments.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoRotating, hoveredCard, departments.length]);

  const getCardStyle = (index) => {
    const totalCards = departments.length;
    const angle = (360 / totalCards) * (index - currentIndex);
    const radius = window.innerWidth < 640 ? 140 : window.innerWidth < 1024 ? 180 : 220;
    
    // Calculate position on circle
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const y = Math.cos((angle * Math.PI) / 180) * radius;
    
    // Determine if card is in front
    const isFront = Math.abs(angle) <= 90;
    const scale = isFront ? 1 : 0.8;
    const opacity = isFront ? 1 : 0.6;
    const zIndex = isFront ? 10 : 5;
    
    return {
      transform: `translateX(${x}px) translateY(${-y}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  const handleCardHover = (departmentId) => {
    setHoveredCard(departmentId);
    setIsAutoRotating(false);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
    // Resume auto-rotation after a delay
    setTimeout(() => setIsAutoRotating(true), 1000);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
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

      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-20 text-center z-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 apple-text-gradient">
          Our Team Departments
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
          <Users className="w-6 h-6 text-apple-blue" />
          <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
        </div>
      </motion.div>

      {/* Circular Carousel Container */}
      <div 
        className="relative w-full h-96 flex items-center justify-center"
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {departments.map((department, index) => {
          const isHovered = hoveredCard === department.id;
          
          return (
            <motion.div
              key={department.id}
              className="absolute cursor-pointer"
              style={getCardStyle(index)}
              animate={getCardStyle(index)}
              transition={{
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
              }}
              onMouseEnter={() => handleCardHover(department.id)}
              onMouseLeave={handleCardLeave}
            >
              {/* Main Card */}
              <motion.div
                className={`
                  relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl
                  backdrop-blur-xl border border-white/20
                  flex flex-col items-center justify-center
                  transition-all duration-300 ease-out
                  ${isHovered 
                    ? 'bg-white/20 shadow-2xl scale-110' 
                    : 'bg-white/10 shadow-lg hover:bg-white/15'
                  }
                `}
                style={{
                  boxShadow: isHovered 
                    ? `0 25px 50px rgba(0, 0, 0, 0.3), 0 0 30px ${department.color}40`
                    : '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Icon */}
                <department.icon 
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mb-2 md:mb-3"
                  style={{ color: department.color }}
                />
                
                {/* Department Name */}
                <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg text-center">
                  {department.name}
                </h3>

                {/* Glow Effect */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-30 blur-xl"
                    style={{ backgroundColor: department.color }}
                  />
                )}
              </motion.div>

              {/* Dropdown Members List */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-30"
                  >
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 min-w-64 shadow-2xl">
                      <div className="space-y-3">
                        {department.members.map((member, memberIndex) => (
                          <motion.div
                            key={member.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: memberIndex * 0.1 }}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                            />
                            <div>
                              <h4 className="text-white font-medium text-sm">
                                {member.name}
                              </h4>
                              <p className="text-gray-300 text-xs">
                                {member.role}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Arrow pointing to card */}
                      <div 
                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 border-l border-t border-white/20"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {departments.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoRotating(false);
              setTimeout(() => setIsAutoRotating(true), 3000);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-apple-blue shadow-lg shadow-apple-blue/50 scale-125'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Auto-rotation Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-400 text-sm z-20">
        <div className={`w-2 h-2 rounded-full ${isAutoRotating && !hoveredCard ? 'bg-apple-blue animate-pulse' : 'bg-gray-600'}`} />
        <span>{isAutoRotating && !hoveredCard ? 'Auto-rotating' : 'Paused'}</span>
      </div>
    </div>
  );
};

export default TeamCarousel;