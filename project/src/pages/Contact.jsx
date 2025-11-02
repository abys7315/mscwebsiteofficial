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

      {/* Hero Section with Contact Info */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: Mail,
                title: "Email Us",
                content: "microsoft.chap@vitap.ac.in",
                description: "Drop us a line anytime"
              },
              {
                icon: MapPin,
                title: "Visit Us",
                content: "VIT-AP University, Amaravati",
                description: "Andhra Pradesh, India"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="apple-card p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-apple-blue/20 to-purple-500/20 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-apple-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-apple-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-apple-blue font-medium mb-1">{item.content}</p>
                <p className="text-sm text-apple-gray-600 dark:text-apple-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Social Media Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold mb-6 text-apple-gray-900 dark:text-white">
              Connect With Us
            </h3>
            <div className="flex justify-center gap-6">
              {[
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/company/microsoft-student-chapter-vit-ap/",
                  label: "LinkedIn",
                  color: "hover:text-blue-600"
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/msc_vitap?igsh=MzBocmYwNXU2MTJj",
                  label: "Instagram",
                  color: "hover:text-pink-600"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`apple-card p-4 group ${social.color} transition-colors duration-300`}
                  aria-label={social.label}
                >
                  <social.icon className="w-8 h-8 text-apple-blue group-hover:text-current transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="apple-card p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 apple-text-gradient">
              Send us a Message
            </h2>
            <p className="text-apple-gray-600 dark:text-apple-gray-300">
              Have a question or want to collaborate? We'd love to hear from you!
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Name", type: "text", placeholder: "Your name" },
                { label: "Email", type: "email", placeholder: "your@email.com" }
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
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help?"
                className="apple-input w-full"
              />
            </motion.div>

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
                rows={5}
                placeholder="Tell us more about your inquiry..."
                className="apple-input w-full resize-none"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full apple-button py-4 text-lg font-semibold"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;