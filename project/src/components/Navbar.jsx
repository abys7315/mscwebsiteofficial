import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/team', label: 'Team' },
    { path: '/contact', label: 'Contact' },
    { path: '/certificate', label: 'Certificate' },
    { path: '/join', label: 'Join' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1]
      }}
      className="fixed w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 bg-transparent">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-apple-blue to-purple-500 rounded-full blur-lg opacity-30"></div>
              <img
                src="/msc-logo.png"
                alt="MSC Logo"
                className="w-10 h-10 object-contain relative z-10"
              />
            </div>
            <span className="font-semibold text-xl text-apple-gray-900 dark:text-white tracking-tight">
              MSC VIT-AP
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-100 ${
                    isActive 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2 rounded-lg hover:bg-white/20 transition-all duration-100 ease-out"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.23, 1, 0.32, 1]
            }}
            className="md:hidden bg-transparent backdrop-blur-xl border-t border-white/30"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 bg-transparent">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: index * 0.08,
                    duration: 0.2,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 text-sm font-medium transition-all duration-100 ease-out ${
                        isActive 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-gray-700 hover:text-blue-600 hover:translate-x-2'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;