import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="min-h-screen pt-16 relative"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 via-transparent to-cyber-blue/5" />
      </motion.div>
      {children}
    </motion.div>
  );
};

export default PageTransition;