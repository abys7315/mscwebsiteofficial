import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Calendar, Megaphone, Palette, PenTool, ChevronLeft, ChevronRight } from 'lucide-react';

const CircularTeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [circularRotation, setCircularRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef();
  const accumulatedScroll = useRef(0);

  const departments = [
    {
      id: 'admin',
      name: 'Admin',
      icon: Users,
      color: '#007AFF',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=300&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=300&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=300&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=300&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?q=80&w=300&auto=format&fit=crop',
      members: [
        { name: 'Rachel Green', role: 'Content Head', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop' },
        { name: 'Mark Davis', role: 'Technical Writer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
        { name: 'Nina Rodriguez', role: 'Content Creator', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop' }
      ]
    }
  ];

  const totalCards = departments.length;
  const angleStep = 360 / totalCards;

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
    accumulatedScroll.current += angleStep;
    setCircularRotation(accumulatedScroll.current);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    accumulatedScroll.current -= angleStep;
    setCircularRotation(accumulatedScroll.current);
  };

  const goToCard = (index) => {
    const diff = index - currentIndex;
    const shortestPath = diff > totalCards / 2 ? diff - totalCards : diff < -totalCards / 2 ? diff + totalCards : diff;

    setCurrentIndex(index);
    accumulatedScroll.current += shortestPath * angleStep;
    setCircularRotation(accumulatedScroll.current);
  };

  // Handle scroll events
  useEffect(() => {
  const handleWheel = (e) => {
      e.preventDefault();
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const scrollSensitivity = 0.3;
      accumulatedScroll.current += e.deltaY * scrollSensitivity;
      setCircularRotation(accumulatedScroll.current);

      const newIndex = Math.round(accumulatedScroll.current / angleStep) % totalCards;
      const normalizedIndex = ((newIndex % totalCards) + totalCards) % totalCards;
      setCurrentIndex(normalizedIndex);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [angleStep, totalCards]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4 overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8 z-30"
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

      <div className="relative w-[90vw] h-[70vh] max-w-[700px] max-h-[700px] mb-8">
        {/* Subtle circular guide ring */}
        <div className="absolute inset-0 rounded-full border border-gray-700/30 shadow-inner"></div>

        {/* Inner glow effect */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-800/20 to-transparent blur-xl"></div>

        {/* Circular container */}
        <div className="relative w-full h-full">
          {departments.map((department, index) => {
            const cardAngle = index * angleStep - circularRotation;
            const radius = window.innerWidth < 640 ? 180 : 250;

            const x = Math.cos((cardAngle * Math.PI) / 180) * radius;
            const y = Math.sin((cardAngle * Math.PI) / 180) * radius;

            const normalizedAngle = ((cardAngle % 360) + 360) % 360;
            const isFocused = normalizedAngle >= 315 || normalizedAngle <= 45;
            const isVisible = normalizedAngle <= 135 || normalizedAngle >= 225;

            return (
              <div key={department.id}>
                {/* Main Card */}
                <motion.div
                  className={`absolute transition-all duration-500 ease-out cursor-pointer ${
                    isFocused
                      ? "scale-110 z-20 shadow-2xl shadow-purple-500/20"
                      : isVisible
                        ? "scale-95 z-10 shadow-xl shadow-gray-900/50 opacity-80 hover:opacity-100"
                        : "scale-80 z-0 opacity-30"
                  } ${isScrolling ? "brightness-125" : ""}`}
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    left: "50%",
                    top: "50%",
                  }}
                  onClick={() => goToCard(index)}
                  onMouseEnter={() => setHoveredCard(department.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative w-64 h-40 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/20 bg-white/10">
                    {/* Background Image */}
                    <img
                      src={department.image}
                      alt={department.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      draggable={false}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm bg-white/20"
                          style={{ boxShadow: `0 0 20px ${department.color}40` }}
                        >
                          <department.icon 
                            className="w-5 h-5" 
                            style={{ color: department.color }} 
                          />
                        </div>
                        <h3 className="text-white font-semibold text-lg">
                          {department.name}
                        </h3>
                      </div>
                    </div>

                    {/* Focus Glow */}
                    {isFocused && (
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-30 blur-xl pointer-events-none"
                        style={{ backgroundColor: department.color }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Dropdown Members List */}
                <AnimatePresence>
                  {hoveredCard === department.id && isFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute z-30"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(${x}px, ${y + 120}px) translate(-50%, 0)`,
                      }}
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
              </div>
            );
          })}
        </div>

        {/* Center indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="w-12 h-12 rounded-full border border-purple-400/40 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-sm">
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-purple-500/50">
              <div
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  transform: `translate(-50%, -50%) rotate(${circularRotation}deg) translateY(-16px)`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-8 z-30">
        <button
          onClick={prevCard}
          className="rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-700/50 hover:border-purple-400/30 transition-all duration-300 text-gray-300 hover:text-purple-300 p-3"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-2">
          {departments.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-purple-400 to-purple-600 scale-125 shadow-lg shadow-purple-500/50"
                  : "bg-gray-600 hover:bg-gray-500 scale-100"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-700/50 hover:border-purple-400/30 transition-all duration-300 text-gray-300 hover:text-purple-300 p-3"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Scroll hint */}
      <div className="text-center text-gray-400 text-sm z-30">
        <p>Scroll to navigate • Click to select • Hover to explore team</p>
      </div>
    </div>
  );
};

export default CircularTeamCarousel;