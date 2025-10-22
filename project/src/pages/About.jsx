import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, GraduationCap } from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

const About = () => {
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
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
          About Our Chapter
        </h1>
        <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300">
          The Microsoft Student Chapter at VIT-AP is a community of passionate tech enthusiasts dedicated to fostering innovation and technical excellence through Microsoft technologies.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          {
            icon: BookOpen,
            color: 'cyber-primary',
            title: "Learning Resources",
            desc: "Access Microsoft's extensive learning materials and documentation to enhance your skills."
          },
          {
            icon: Users,
            color: 'cyber-blue',
            title: "Community Support",
            desc: "Connect with Microsoft enthusiasts and get help from experienced developers."
          },
          {
            icon: GraduationCap,
            color: 'cyber-purple',
            title: "Workshops",
            desc: "Participate in hands-on workshops and training sessions on Microsoft technologies."
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="apple-card p-8"
          >
            <feature.icon className="w-12 h-12 mb-4 text-apple-blue" />
            <h3 className="text-xl font-semibold mb-3 text-apple-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-apple-gray-600 dark:text-apple-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="apple-card p-8 md:p-12"
      >
        <h2 className="text-3xl font-bold mb-6 apple-text-gradient">Our Mission</h2>
        <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 mb-6">
          To create a vibrant community of student developers and tech enthusiasts who are passionate about Microsoft technologies and innovation. We aim to bridge the gap between academic learning and industry requirements through hands-on experience and practical knowledge.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="apple-card p-6">
            <h3 className="text-xl font-semibold mb-4 text-apple-gray-900 dark:text-white">
              What We Do
            </h3>
            <ul className="space-y-3 text-apple-gray-600 dark:text-apple-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-apple-blue rounded-full"></span>
                Organize technical workshops and seminars
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Host coding competitions and hackathons
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-apple-blue rounded-full"></span>
                Provide mentorship opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Facilitate industry connections
              </li>
            </ul>
          </div>
          <div className="apple-card p-6">
            <h3 className="text-xl font-semibold mb-4 text-apple-gray-900 dark:text-white">
              Our Values
            </h3>
            <ul className="space-y-3 text-apple-gray-600 dark:text-apple-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-apple-blue rounded-full"></span>
                Innovation and creativity
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Continuous learning
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-apple-blue rounded-full"></span>
                Collaboration and teamwork
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Technical excellence
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;