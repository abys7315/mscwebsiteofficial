import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

const Contact = () => {
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
          Get in Touch
        </h1>
        <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="apple-card p-8">
            <h2 className="text-2xl font-semibold mb-6 text-apple-gray-900 dark:text-white">
              Contact Information
            </h2>
            <div className="space-y-6">
              {[
                { icon: Mail, text: "contact@msc-vitap.org", color: "apple-blue" },
                { icon: Phone, text: "+91 (555) 123-4567", color: "purple-500" },
                { icon: MapPin, text: "VIT-AP University, Amaravati, Andhra Pradesh", color: "apple-blue" }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center gap-4 text-apple-gray-600 dark:text-apple-gray-300"
                >
                  <contact.icon className={`w-6 h-6 ${contact.color === 'apple-blue' ? 'text-apple-blue' : 'text-purple-500'}`} />
                  <span>{contact.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-apple-gray-900 dark:text-white">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, color: "apple-blue" },
                  { icon: Github, color: "purple-500" },
                  { icon: Instagram, color: "apple-blue" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="apple-card p-2"
                  >
                    <social.icon className={`w-6 h-6 ${social.color === 'apple-blue' ? 'text-apple-blue' : 'text-purple-500'}`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <form className="apple-card p-8">
            <h2 className="text-2xl font-semibold mb-6 text-apple-gray-900 dark:text-white">
              Send us a Message
            </h2>
            <div className="space-y-4">
              {[
                { label: "Name", type: "text", placeholder: "Your name" },
                { label: "Email", type: "email", placeholder: "your@email.com" },
                { label: "Subject", type: "text", placeholder: "How can we help?" }
              ].map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <label className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="apple-input w-full"
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Your message"
                  className="apple-input w-full"
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full apple-button mt-4"
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;