import React from 'react';
import { motion } from 'framer-motion';

const StarryBackground = () => {
  // Generate different types of stars
  const generateStars = (count, type) => {
    return Array.from({ length: count }, (_, i) => {
      const baseSize = type === 'small' ? 1 : type === 'medium' ? 2 : type === 'large' ? 3 : 4;
      const sizeVariation = Math.random() * 1.5 + 0.5;
      
      return {
        id: `${type}-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: baseSize * sizeVariation,
        opacity: type === 'bright' ? Math.random() * 0.4 + 0.6 : Math.random() * 0.3 + 0.2,
        animationDelay: Math.random() * 8,
        animationDuration: Math.random() * 6 + 3,
        twinkleIntensity: type === 'bright' ? 0.8 : type === 'large' ? 0.6 : 0.4,
        color: type === 'bright' ? 'white' : 'rgb(203, 213, 225)', // slate-300
      };
    });
  };

  // Create different star layers for depth (reduced counts for performance)
  const smallStars = generateStars(50, 'small');
  const mediumStars = generateStars(20, 'medium');
  const largeStars = generateStars(10, 'large');
  const brightStars = generateStars(5, 'bright');

  // Generate star clusters (reduced for performance)
  const generateCluster = (centerX, centerY, starCount) => {
    return Array.from({ length: starCount }, (_, i) => ({
      id: `cluster-${centerX}-${centerY}-${i}`,
      x: centerX + (Math.random() - 0.5) * 8,
      y: centerY + (Math.random() - 0.5) * 8,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.3,
      animationDelay: Math.random() * 4,
      animationDuration: Math.random() * 4 + 2,
    }));
  };

  const clusters = [
    ...generateCluster(20, 30, 3),
    ...generateCluster(75, 15, 3),
    ...generateCluster(85, 70, 3),
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900" />
      
      {/* Subtle Nebula Clouds */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 right-1/3 w-80 h-80 bg-purple-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-400/6 rounded-full blur-3xl" />
      </div>

      {/* Milky Way Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-400/5 to-transparent transform rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-300/3 to-transparent transform -rotate-12" />
      </div>

      {/* Small Background Stars */}
      {smallStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.2)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [star.opacity * 0.3, star.opacity * 0.8, star.opacity * 0.3],
          }}
          transition={{
            duration: star.animationDuration,
            delay: star.animationDelay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Medium Stars */}
      {mediumStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.3)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.animationDuration,
            delay: star.animationDelay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Large Prominent Stars */}
      {largeStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 4}px rgba(255, 255, 255, 0.4), 0 0 ${star.size * 8}px rgba(255, 255, 255, 0.1)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            scale: [0.9, 1.3, 0.9],
          }}
          transition={{
            duration: star.animationDuration,
            delay: star.animationDelay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Bright Twinkling Stars */}
      {brightStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        >
          {/* Main star */}
          <motion.div
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 6}px rgba(255, 255, 255, 0.6), 0 0 ${star.size * 12}px rgba(255, 255, 255, 0.2)`,
            }}
            animate={{ 
              opacity: [star.opacity * 0.6, 1, star.opacity * 0.6],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: star.animationDuration,
              delay: star.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Cross sparkle effect */}
          <motion.div
            className="absolute bg-white"
            style={{
              width: `${star.size * 3}px`,
              height: '1px',
              left: `${-star.size}px`,
              top: `${star.size / 2}px`,
            }}
            animate={{ 
              opacity: [0, star.twinkleIntensity, 0],
            }}
            transition={{
              duration: star.animationDuration * 0.7,
              delay: star.animationDelay + 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bg-white"
            style={{
              width: '1px',
              height: `${star.size * 3}px`,
              left: `${star.size / 2}px`,
              top: `${-star.size}px`,
            }}
            animate={{ 
              opacity: [0, star.twinkleIntensity, 0],
            }}
            transition={{
              duration: star.animationDuration * 0.7,
              delay: star.animationDelay + 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      ))}

      {/* Star Clusters */}
      {clusters.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-slate-200 rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.3)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [star.opacity * 0.4, star.opacity * 0.9, star.opacity * 0.4],
          }}
          transition={{
            duration: star.animationDuration,
            delay: star.animationDelay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Subtle Twinkling Dust (reduced for performance) */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-px h-px bg-slate-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 1px rgba(255, 255, 255, 0.4)`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              delay: Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Distant Galaxy Glow */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/5 right-1/4 w-40 h-40 bg-gradient-radial from-white/20 to-transparent rounded-full blur-xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-32 h-32 bg-gradient-radial from-blue-200/15 to-transparent rounded-full blur-xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default StarryBackground;