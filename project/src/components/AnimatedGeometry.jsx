import React from 'react';
import { motion, Variants } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const AnimatedGeometry = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 dark:opacity-20">
      <motion.svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        initial="hidden"
        animate="visible"
        style={image}
        className="w-full h-full max-w-4xl"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="#007AFF"
          variants={draw}
          custom={1}
          style={shape}
        />
        <motion.line
          x1="220"
          y1="30"
          x2="360"
          y2="170"
          stroke="#34C759"
          variants={draw}
          custom={2}
          style={shape}
        />
        <motion.line
          x1="220"
          y1="170"
          x2="360"
          y2="30"
          stroke="#34C759"
          variants={draw}
          custom={2.5}
          style={shape}
        />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="30"
          rx="20"
          stroke="#5856D6"
          variants={draw}
          custom={3}
          style={shape}
        />
        <motion.circle
          cx="100"
          cy="300"
          r="80"
          stroke="#5856D6"
          variants={draw}
          custom={2}
          style={shape}
        />
        <motion.line
          x1="220"
          y1="230"
          x2="360"
          y2="370"
          stroke="#007AFF"
          custom={3}
          variants={draw}
          style={shape}
        />
        <motion.line
          x1="220"
          y1="370"
          x2="360"
          y2="230"
          stroke="#007AFF"
          custom={3.5}
          variants={draw}
          style={shape}
        />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="230"
          rx="20"
          stroke="#34C759"
          custom={4}
          variants={draw}
          style={shape}
        />
        <motion.circle
          cx="100"
          cy="500"
          r="80"
          stroke="#34C759"
          variants={draw}
          custom={3}
          style={shape}
        />
        <motion.line
          x1="220"
          y1="430"
          x2="360"
          y2="570"
          stroke="#5856D6"
          variants={draw}
          custom={4}
          style={shape}
        />
        <motion.line
          x1="220"
          y1="570"
          x2="360"
          y2="430"
          stroke="#5856D6"
          variants={draw}
          custom={4.5}
          style={shape}
        />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="430"
          rx="20"
          stroke="#007AFF"
          variants={draw}
          custom={5}
          style={shape}
        />
      </motion.svg>
    </div>
  );
};

const image = {
  maxWidth: "80vw",
};

const shape = {
  strokeWidth: 8,
  strokeLinecap: "round",
  fill: "transparent",
};

export default AnimatedGeometry;