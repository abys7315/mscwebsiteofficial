import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Calendar, Users, MapPin } from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentEventIndex, setCurrentEventIndex] = useState({});

  const events = [
    {
      id: 1,
      title: "Azure Cloud Workshop",
      date: "March 15, 2024",
      location: "Microsoft Lab, Block A",
      attendees: "50+",
      description: "Learn how to build and deploy applications using Microsoft Azure cloud services.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
          alt: "Students learning about cloud computing",
          caption: "Workshop participants exploring Azure services"
        },
        {
          url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop",
          alt: "Team presenting their innovative solution",
          caption: "Hands-on Azure deployment session"
        },
        {
          url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop",
          alt: "Industry experts sharing insights",
          caption: "Azure certification guidance"
        }
      ]
    },
    {
      id: 2,
      title: "Microsoft Hackathon 2024",
      date: "April 1-3, 2024",
      location: "Main Auditorium",
      attendees: "200+",
      description: "A 48-hour coding challenge focused on building innovative solutions using Microsoft technologies.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
          alt: "Networking and knowledge sharing",
          caption: "Hackathon kickoff ceremony"
        },
        {
          url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
          alt: "Chapter members collaborating",
          caption: "Teams brainstorming ideas"
        },
        {
          url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
          alt: "Intensive coding workshop",
          caption: "Late-night coding session"
        },
        {
          url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
          alt: "Hackathon Winners",
          caption: "Winners announcement ceremony"
        }
      ]
    },
    {
      id: 3,
      title: "Web Development with React",
      date: "April 15, 2024",
      location: "Seminar Hall 1",
      attendees: "75+",
      description: "Hands-on workshop on building modern web applications using React and TypeScript.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
          alt: "React workshop session",
          caption: "Introduction to React components"
        },
        {
          url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop",
          alt: "TypeScript integration",
          caption: "TypeScript best practices discussion"
        }
      ]
    }
  ];

  // Helper functions for carousel navigation
  const nextImage = (eventId) => {
    setCurrentEventIndex(prev => ({
      ...prev,
      [eventId]: (prev[eventId] + 1) % events.find(e => e.id === eventId).images.length
    }));
  };

  const prevImage = (eventId) => {
    setCurrentEventIndex(prev => ({
      ...prev,
      [eventId]: prev[eventId] === 0
        ? events.find(e => e.id === eventId).images.length - 1
        : prev[eventId] - 1
    }));
  };

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
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
              Event Gallery
            </h1>
            <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              Capturing moments of learning, innovation, and community building at Microsoft Student Chapter VIT-AP.
            </p>
          </motion.div>

          <div className="space-y-16">
            {events.map((event, eventIndex) => (
              <motion.div
                key={event.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: eventIndex * 0.2 }}
                className="apple-card p-8"
              >
                {/* Event Header */}
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 apple-text-gradient">
                    {event.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-apple-gray-600 dark:text-apple-gray-300 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-apple-blue" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-apple-blue" />
                      <span>{event.attendees} Attendees</span>
                    </div>
                  </div>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300">
                    {event.description}
                  </p>
                </div>

                {/* Image Carousel */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-lg">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${(currentEventIndex[event.id] || 0) * 100}%)`
                      }}
                    >
                      {event.images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className="flex-shrink-0 w-full relative cursor-pointer"
                          onClick={() => setSelectedImage({ ...image, eventTitle: event.title })}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <p className="text-white text-lg font-medium">
                              {image.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  {event.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(event.id)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => nextImage(event.id)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Dots Indicator */}
                  {event.images.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                      {event.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentEventIndex(prev => ({ ...prev, [event.id]: index }))}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            (currentEventIndex[event.id] || 0) === index
                              ? 'bg-apple-blue'
                              : 'bg-apple-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {selectedImage.eventTitle}
                </h3>
                <p className="text-white/90">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;