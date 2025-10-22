import React from 'react';
import { motion } from 'framer-motion';

const CartiGlitch = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Glitch Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-purple-500/5"
        animate={{
          x: [-10, 10, -5, 5, 0],
          opacity: [0, 0.3, 0, 0.2, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }}
      />

      {/* Digital Noise */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-red-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              delay: Math.random() * 2,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Carti-style Neon Lines */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
          animate={{
            opacity: [0, 0.8, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 5,
            delay: 1,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Dark Energy Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CartiGlitch;