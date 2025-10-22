import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Calendar, Megaphone, Palette, PenTool } from 'lucide-react';

const CircularTeamLayout = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

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

  // Calculate circular positions
  const getCardPosition = (index, total) => {
    const angle = (index * 360) / total - 90; // Start from top
    const radius = window.innerWidth < 640 ? 140 : window.innerWidth < 1024 ? 180 : 220;
    
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    
    return { x, y, angle };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Galaxy Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle Stars */}
        {Array.from({ length: 100 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Galaxy Nebula Effects */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
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
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 apple-text-gradient">
            Our Team Departments
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
            <Users className="w-6 h-6 text-apple-blue" />
            <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
          </div>
        </motion.div>

        {/* Circular Layout Container */}
        <div className="relative w-full max-w-4xl h-96 md:h-[500px] lg:h-[600px] flex items-center justify-center">
          {/* Center Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-apple-blue/20 to-purple-500/20 rounded-full blur-2xl"></div>
          </div>

          {/* Department Cards */}
          {departments.map((department, index) => {
            const { x, y } = getCardPosition(index, departments.length);
            const isHovered = hoveredCard === department.id;
            
            return (
              <div key={department.id} className="absolute">
                {/* Main Card */}
                <motion.div
                  className="relative cursor-pointer"
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  whileHover={{ scale: 1.1 }}
                  onMouseEnter={() => setHoveredCard(department.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Glassmorphism Card */}
                  <div className={`
                    relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden
                    bg-white/10 backdrop-blur-xl border border-white/20
                    transition-all duration-300 ease-out
                    ${isHovered 
                      ? 'shadow-2xl border-white/40' 
                      : 'shadow-lg hover:shadow-xl'
                    }
                  `}
                  style={{
                    boxShadow: isHovered 
                      ? `0 25px 50px rgba(0, 0, 0, 0.3), 0 0 30px ${department.color}40`
                      : '0 8px 32px rgba(0, 0, 0, 0.2)'
                  }}>
                    
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={department.image}
                        alt={department.name}
                        className="w-full h-full object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                      {/* Icon */}
                      <div 
                        className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-2 md:mb-3 bg-white/20 backdrop-blur-sm"
                        style={{ boxShadow: `0 0 20px ${department.color}40` }}
                      >
                        <department.icon 
                          className="w-6 h-6 md:w-8 md:h-8" 
                          style={{ color: department.color }} 
                        />
                      </div>
                      
                      {/* Department Name */}
                      <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg text-center">
                        {department.name}
                      </h3>
                    </div>

                    {/* Hover Glow Effect */}
                    {isHovered && (
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-20 blur-xl pointer-events-none"
                        style={{ backgroundColor: department.color }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Dropdown Members List */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute z-50"
                      style={{
                        transform: `translate(${x}px, ${y + 140}px) translate(-50%, 0)`,
                        left: '50%',
                        top: '50%'
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

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          <p>Hover over department cards to explore team members</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CircularTeamLayout;