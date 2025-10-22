import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import StarryBackground from '../components/StarryBackground';

const CertificateValidation = () => {
  const [certificateId, setCertificateId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handleValidation = (e) => {
    e.preventDefault();
    if (certificateId.trim() === '') {
      toast.error('Please enter a certificate ID');
      return;
    }

    if (certificateId === 'MSC2024001') {
      setSearchResult({
        valid: true,
        name: 'John Doe',
        event: 'Azure Cloud Workshop 2024',
        date: 'March 15, 2024'
      });
      toast.success('Certificate validated successfully!');
    } else {
      setSearchResult({ valid: false });
      toast.error('Invalid certificate ID');
    }
  };

  const handleAdminLogin = () => {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') {
      setIsAdmin(true);
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid password');
    }
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
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
            Certificate Validation
          </h1>
          <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300">
            Verify the authenticity of certificates issued by Microsoft Student Chapter VIT-AP.
          </p>
        </div>

        <div className="apple-card p-8">
          <form onSubmit={handleValidation} className="space-y-6">
            <div>
              <label htmlFor="certificateId" className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                Certificate ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate ID (e.g., MSC2024001)"
                  className="apple-input w-full pl-4 pr-10"
                />
                <Search className="absolute right-3 top-2.5 text-apple-gray-400" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full apple-button"
            >
              Validate Certificate
            </motion.button>
          </form>

          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 apple-card p-6"
            >
              {searchResult.valid ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-apple-blue">
                    <Shield className="w-6 h-6" />
                    <span className="font-semibold text-apple-gray-900 dark:text-white">Valid Certificate</span>
                  </div>
                  <div className="grid gap-2 text-apple-gray-600 dark:text-apple-gray-300">
                    <p><span className="font-medium">Name:</span> {searchResult.name}</p>
                    <p><span className="font-medium">Event:</span> {searchResult.event}</p>
                    <p><span className="font-medium">Date:</span> {searchResult.date}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-6 h-6" />
                  <span className="font-semibold text-apple-gray-900 dark:text-white">Invalid Certificate</span>
                </div>
              )}
            </motion.div>
          )}

          {!isAdmin && (
            <div className="mt-8 text-center">
              <button
                onClick={handleAdminLogin}
                className="text-sm text-apple-blue hover:underline"
              >
                Admin Access
              </button>
            </div>
          )}

          {isAdmin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 apple-card p-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-apple-gray-900 dark:text-white">
                Admin Panel
              </h3>
              <div className="space-y-4">
                <button className="w-full apple-button">
                  Generate New Certificate
                </button>
                <button className="w-full apple-button">
                  View All Certificates
                </button>
                <button className="w-full apple-button">
                  Manage Templates
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CertificateValidation;