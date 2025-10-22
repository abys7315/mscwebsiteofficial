import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

const Events = () => {
  const events = [
    {
      title: "Azure Cloud Workshop",
      date: "March 15, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Microsoft Lab, Block A",
      attendees: "50+",
      description: "Learn how to build and deploy applications using Microsoft Azure cloud services.",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Microsoft Hackathon 2024",
      date: "April 1-3, 2024",
      time: "48 Hours",
      location: "Main Auditorium",
      attendees: "200+",
      description: "A 48-hour coding challenge focused on building innovative solutions using Microsoft technologies.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Web Development with React",
      date: "April 15, 2024",
      time: "3:00 PM - 6:00 PM",
      location: "Seminar Hall 1",
      attendees: "75+",
      description: "Hands-on workshop on building modern web applications using React and TypeScript.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
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
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.23, 1, 0.32, 1] 
        }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
          Our Events
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
          <Calendar className="w-6 h-6 text-apple-blue" />
          <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
        </div>
        <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
          Discover our upcoming and past events, workshops, hackathons, and technical sessions.
        </p>
      </motion.div>

      {/* Events Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "100px 0px" }}
        transition={{ 
          duration: 0.8, 
          ease: [0.23, 1, 0.32, 1] 
        }}
      >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="apple-card overflow-hidden group"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-apple-gray-900 dark:text-white group-hover:text-apple-blue transition-colors">
                {event.title}
              </h3>
              <div className="space-y-3 text-apple-gray-600 dark:text-apple-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-apple-blue" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-apple-blue" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span>{event.attendees} Expected Attendees</span>
                </div>
              </div>
              <p className="mt-4 text-apple-gray-600 dark:text-apple-gray-300">
                {event.description}
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                className="mt-6 w-full apple-button"
              >
                Register Now
              </motion.button>
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

export default Events;