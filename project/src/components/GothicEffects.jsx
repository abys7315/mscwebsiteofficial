import React from 'react';
import { motion } from 'framer-motion';

const GothicEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gothic Red Glow Effects */}
      <div className="absolute inset-0">
        {/* Pulsing Red Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/25 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Dark Energy Waves */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/10 via-transparent to-purple-900/10"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Gothic Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Dark Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
      
      {/* Gothic Scanlines */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent bg-[length:100%_4px] animate-pulse" />
      </div>
    </div>
  );
};

export default GothicEffects;