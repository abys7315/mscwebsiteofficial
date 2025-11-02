import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-apple-gray-50 dark:bg-apple-gray-900 text-apple-gray-900 dark:text-white relative overflow-hidden border-t border-apple-gray-200 dark:border-apple-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-apple-blue to-purple-500 rounded-full blur-lg opacity-30"></div>
                <img
                  src="/msc-logo.png"
                  alt="MSC Logo"
                  className="w-12 h-12 object-contain relative z-10"
                />
              </div>
              <span className="font-semibold text-xl">MSC VIT-AP</span>
            </div>
            <p className="text-apple-gray-600 dark:text-apple-gray-300 mb-4 leading-relaxed">
              Empowering students through Microsoft technologies and innovation at VIT-AP University.
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/company/microsoft-student-chapter-vit-ap/" target="_blank" rel="noopener noreferrer" className="p-3 apple-card hover:bg-apple-blue hover:text-white transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/msc_vitap?igsh=MzBocmYwNXU2MTJj" target="_blank" rel="noopener noreferrer" className="p-3 apple-card hover:bg-apple-blue hover:text-white transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="relative z-10">
            <h3 className="font-semibold text-lg mb-6 text-apple-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/gallery', label: 'Gallery' },
                { path: '/team', label: 'Our Team' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue transition-all duration-200 font-medium hover:translate-x-1"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="relative z-10">
            <h3 className="font-semibold text-lg mb-6 text-apple-gray-900 dark:text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-apple-gray-600 dark:text-apple-gray-300">
                <div className="w-10 h-10 bg-apple-blue rounded-xl flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">microsoft.chap@vitap.ac.in</span>
              </li>
              <li className="flex items-center gap-3 text-apple-gray-600 dark:text-apple-gray-300">
                <div className="w-10 h-10 bg-apple-blue rounded-xl flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">VIT-AP University, Amaravati</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="relative z-10">
            <h3 className="font-semibold text-lg mb-6 text-apple-gray-900 dark:text-white">Stay Updated</h3>
            <p className="text-apple-gray-600 dark:text-apple-gray-300 mb-4">
              Subscribe for updates on activities.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full apple-input"
              />
              <button
                type="submit"
                className="w-full apple-button"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-apple-gray-200 dark:border-apple-gray-800 mt-12 pt-8 text-center text-apple-gray-600 dark:text-apple-gray-300 relative z-10">
          <p className="font-medium">© {currentYear} Microsoft Student Chapter VIT-AP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;