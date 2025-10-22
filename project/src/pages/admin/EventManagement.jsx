import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const EventManagement = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Azure Cloud Workshop",
      date: "2024-03-15",
      time: "14:00",
      location: "Microsoft Lab, Block A",
      capacity: 50,
      description: "Learn Azure cloud services",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9"
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    id: 0,
    title: "",
    date: "",
    time: "",
    location: "",
    capacity: 0,
    description: "",
    image: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEvents(events.map(event => 
        event.id === currentEvent.id ? currentEvent : event
      ));
      toast.success('Event updated successfully!');
    } else {
      setEvents([...events, { ...currentEvent, id: Date.now() }]);
      toast.success('Event created successfully!');
    }
    setIsEditing(false);
    setCurrentEvent({
      id: 0,
      title: "",
      date: "",
      time: "",
      location: "",
      capacity: 0,
      description: "",
      image: ""
    });
  };

  const handleEdit = (event) => {
    setIsEditing(true);
    setCurrentEvent(event);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
      toast.success('Event deleted successfully!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold cyber-text gradient-text">
            Event Management
          </h1>
          <button
            onClick={() => setIsEditing(false)}
            className="cyber-button flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Event
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event Form */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-1"
          >
            <form onSubmit={handleSubmit} className="cyber-card p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4 cyber-text">
                {isEditing ? 'Edit Event' : 'Create Event'}
              </h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={currentEvent.title}
                  onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                  className="cyber-input w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={currentEvent.date}
                    onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                    className="cyber-input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <input
                    type="time"
                    value={currentEvent.time}
                    onChange={(e) => setCurrentEvent({...currentEvent, time: e.target.value})}
                    className="cyber-input w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={currentEvent.location}
                  onChange={(e) => setCurrentEvent({...currentEvent, location: e.target.value})}
                  className="cyber-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Capacity</label>
                <input
                  type="number"
                  value={currentEvent.capacity}
                  onChange={(e) => setCurrentEvent({...currentEvent, capacity: parseInt(e.target.value)})}
                  className="cyber-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={currentEvent.image}
                  onChange={(e) => setCurrentEvent({...currentEvent, image: e.target.value})}
                  className="cyber-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={currentEvent.description}
                  onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                  className="cyber-input w-full"
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className="w-full cyber-button">
                {isEditing ? 'Update Event' : 'Create Event'}
              </button>
            </form>
          </motion.div>

          {/* Events List */}
          <div className="lg:col-span-2 space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="cyber-card p-6"
              >
                <div className="flex gap-6">
                  <div className="w-40 h-40 overflow-hidden rounded-lg">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 cyber-button"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 cyber-button bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyber-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyber-blue" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyber-purple" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyber-accent" />
                        <span>{event.capacity} attendees</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventManagement;