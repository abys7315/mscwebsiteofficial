import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({
  children,
  onClick,
  className = '',
  type = 'button'
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative group overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-microsoft-blue via-microsoft-darkBlue to-microsoft-blue bg-[length:200%_200%] animate-gradient" />
      <div className="relative bg-gradient-to-r from-microsoft-blue to-microsoft-darkBlue group-hover:opacity-0 transition-opacity duration-300 px-6 py-3 rounded-lg">
        {children}
      </div>
    </motion.button>
  );
};

export default GradientButton;