import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Calendar, Megaphone, Palette, PenTool } from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

const Team = () => {
  const departments = [
    {
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
      name: 'Technical',
      icon: Code,
      color: '#5856D6',
      members: [
        { name: 'Sarah Wilson', role: 'Technical Head', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop' },
        { name: 'Alex Brown', role: 'Cloud Expert', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
        { name: 'Emily Davis', role: 'Full Stack Dev', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop' },
        { name: 'David Chen', role: 'DevOps Engineer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
      name: 'Events',
      icon: Calendar,
      color: '#34C759',
      members: [
        { name: 'Lisa Chen', role: 'Events Head', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop' },
        { name: 'Tom Wilson', role: 'Event Coordinator', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop' },
        { name: 'Amy Rodriguez', role: 'Logistics Manager', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
      name: 'Outreach',
      icon: Megaphone,
      color: '#FF9500',
      members: [
        { name: 'Anna Taylor', role: 'Outreach Head', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&auto=format&fit=crop' },
        { name: 'Chris Martin', role: 'Community Manager', image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=150&auto=format&fit=crop' },
        { name: 'Maya Patel', role: 'Social Media Lead', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop' }
      ]
    },
    {
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

  return (
    <div className="min-h-screen bg-white dark:bg-black relative">
      {/* Starry Background */}
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Section Background Overlay */}
        <div className="absolute inset-0 bg-black/20 -mx-4"></div>
        
        <div className="relative z-10">
          {/* Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
              Meet Our Team
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
              <Users className="w-6 h-6 text-apple-blue" />
              <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
            </div>
            <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              Passionate individuals working together to build an amazing tech community
            </p>
          </motion.div>

          {/* Team Departments */}
          <div className="space-y-16">
            {departments.map((department, deptIndex) => (
              <motion.div
                key={department.name}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "100px 0px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: deptIndex * 0.1,
                  ease: [0.23, 1, 0.32, 1] 
                }}
                className="apple-card p-8"
              >
                {/* Department Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${department.color}20` }}
                  >
                    <department.icon 
                      className="w-8 h-8" 
                      style={{ color: department.color }} 
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-apple-gray-900 dark:text-white">
                      {department.name}
                    </h2>
                    <div 
                      className="h-1 w-20 rounded-full mt-2"
                      style={{ backgroundColor: department.color }}
                    />
                  </div>
                </div>

                {/* Team Members Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {department.members.map((member, memberIndex) => (
                    <motion.div
                      key={member.name}
                      initial={{ y: 40, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: memberIndex * 0.1,
                        ease: [0.23, 1, 0.32, 1] 
                      }}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                      }}
                      className="apple-card p-6 text-center group cursor-pointer"
                    >
                      {/* Member Photo */}
                      <div className="relative mb-4">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white/20 group-hover:border-white/40 transition-all duration-300"
                        />
                        <div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                          style={{ backgroundColor: department.color }}
                        />
                      </div>

                      {/* Member Info */}
                      <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-white mb-2 group-hover:text-apple-blue transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm">
                        {member.role}
                      </p>

                      {/* Hover Glow Effect */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: department.color }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Stats */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "100px 0px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mt-20"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { number: "20+", label: "Team Members", color: "#007AFF" },
                { number: "6", label: "Departments", color: "#5856D6" },
                { number: "50+", label: "Events Organized", color: "#34C759" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 40, opacity: 0, scale: 0.9 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  className="apple-card p-8"
                >
                  <div 
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-apple-gray-600 dark:text-apple-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Team;