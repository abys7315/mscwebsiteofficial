import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import StarryBackground from '../components/StarryBackground';

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    regNo: '',
    branch: '',
    year: '',
    interests: [],
    motivation: '',
    joinReason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.regNo.trim()) errors.push('Registration number is required');
    if (!formData.branch) errors.push('Branch is required');
    if (!formData.year) errors.push('Year is required');
    if (formData.interests.length === 0) errors.push('At least one interest department must be selected');
    if (!formData.motivation.trim()) errors.push('Description is required');
    else if (formData.motivation.trim().length < 10) errors.push('Description must be at least 10 characters');
    else if (formData.motivation.trim().length > 1000) errors.push('Description cannot exceed 1000 characters');
    if (!formData.joinReason.trim()) errors.push('Join reason is required');
    else if (formData.joinReason.trim().length < 10) errors.push('Join reason must be at least 10 characters');
    else if (formData.joinReason.trim().length > 500) errors.push('Join reason cannot exceed 500 characters');

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(validationErrors.join('\n'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Application submitted successfully! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          regNo: '',
          branch: '',
          year: '',
          interests: [],
          motivation: '',
          joinReason: ''
        });
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => err.msg || err.message).join('\n');
          toast.error(errorMessages);
        } else {
          toast.error(data.message || 'Failed to submit application. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests = [
    "Technical",
    "Hi Tech",
    "Creative/Design",
    "Marketing",
    "Documentation",
    "Event Management",
    "Public Relations",
    "Outreach",
    "Social Media",
    "Research and Development"
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
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            Join Microsoft Student Chapter
          </h1>
          <p className="text-lg text-black dark:text-white">
            Be part of an innovative community of tech enthusiasts and future leaders.
          </p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="apple-card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-black dark:text-white">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="apple-input w-full"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black dark:text-white">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="apple-input w-full"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black dark:text-white">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({...formData, phone: value});
                  }}
                  className="apple-input w-full"
                  placeholder="Enter 10-digit phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black dark:text-white">Registration Number</label>
                <input
                  type="text"
                  value={formData.regNo}
                  onChange={(e) => setFormData({...formData, regNo: e.target.value})}
                  className="apple-input w-full"
                  placeholder="Enter your registration number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black dark:text-white">Branch</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  className="apple-input w-full"
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science</option>
                  <option value="ECE">Electronics</option>
                  <option value="MECH">Mechanical</option>
                  <option value="CIVIL">Civil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black dark:text-white">Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="apple-input w-full"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">Interest Department</label>
              <div className="grid md:grid-cols-2 gap-4">
                {interests.map((interest) => (
                  <label key={interest} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={(e) => {
                        const newInterests = e.target.checked
                          ? [...formData.interests, interest]
                          : formData.interests.filter(i => i !== interest);
                        setFormData({...formData, interests: newInterests});
                      }}
                      className="form-checkbox text-apple-blue"
                    />
                    <span className="text-black dark:text-white">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">Describe Yourself</label>
              <textarea
                value={formData.motivation}
                onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                className="apple-input w-full"
                rows={4}
                placeholder="Tell us about yourself and what makes you suitable for the role you've opted for..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">Why do you want to join MSC?</label>
              <textarea
                value={formData.joinReason}
                onChange={(e) => setFormData({...formData, joinReason: e.target.value})}
                className="apple-input w-full"
                rows={3}
                placeholder="Share your motivation for joining Microsoft Student Chapter..."
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full apple-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;