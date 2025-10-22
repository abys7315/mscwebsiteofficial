import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Calendar, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const Collaborate = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    eventType: 'workshop',
    eventTitle: '',
    description: '',
    expectedDate: '',
    expectedAttendees: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Proposal submitted successfully! We will contact you soon.');
    setFormData({
      organizationName: '',
      contactPerson: '',
      email: '',
      phone: '',
      eventType: 'workshop',
      eventTitle: '',
      description: '',
      expectedDate: '',
      expectedAttendees: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 cyber-text gradient-text">
            Collaborate With Us
          </h1>
          <p className="text-lg neural-text text-gray-600 dark:text-neural-text/80">
            Partner with Microsoft Student Chapter VIT-AP for workshops, events, and technical collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Users,
              title: "Club Collaborations",
              description: "Partner with other technical clubs for joint events",
              color: "cyber-primary"
            },
            {
              icon: Calendar,
              title: "Event Proposals",
              description: "Propose workshops, hackathons, or technical sessions",
              color: "cyber-blue"
            },
            {
              icon: Briefcase,
              title: "Industry Connect",
              description: "Connect with industry experts and professionals",
              color: "cyber-purple"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="cyber-card p-6 hover-lift"
            >
              <item.icon className={`w-12 h-12 mb-4 text-${item.color}`} />
              <h3 className="text-xl font-semibold mb-2 cyber-text text-gray-800 dark:text-neural-text">
                {item.title}
              </h3>
              <p className="neural-text text-gray-600 dark:text-neural-text/80">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="cyber-card p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 cyber-text text-gray-800 dark:text-neural-text">
            Submit Your Proposal
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: "organizationName", label: "Organization Name", type: "text", placeholder: "Your organization name" },
                { name: "contactPerson", label: "Contact Person", type: "text", placeholder: "Your name" },
                { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                { name: "phone", label: "Phone", type: "tel", placeholder: "Your phone number" },
                { name: "eventTitle", label: "Event Title", type: "text", placeholder: "Title of your event" },
                { name: "expectedAttendees", label: "Expected Attendees", type: "number", placeholder: "Number of expected attendees" }
              ].map((field, index) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium cyber-text text-gray-700 dark:text-neural-text/80 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="cyber-input w-full"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium cyber-text text-gray-700 dark:text-neural-text/80 mb-2">
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="cyber-input w-full"
                >
                  <option value="workshop">Workshop</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="webinar">Webinar</option>
                  <option value="competition">Competition</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium cyber-text text-gray-700 dark:text-neural-text/80 mb-2">
                  Expected Date
                </label>
                <input
                  type="date"
                  name="expectedDate"
                  value={formData.expectedDate}
                  onChange={handleChange}
                  required
                  className="cyber-input w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium cyber-text text-gray-700 dark:text-neural-text/80 mb-2">
                  Event Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="cyber-input w-full"
                  placeholder="Describe your event or collaboration idea"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full cyber-button flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Proposal
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Collaborate;