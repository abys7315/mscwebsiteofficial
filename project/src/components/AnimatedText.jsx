"use client";

import React from "react";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    // Generate random delay between 0 and 4 seconds for parallel animation
    const delay = Math.random() * 4;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 2, bounce: 0.1 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export default function AlphabetDrawing() {
  return (
    <div className="flex items-center justify-center w-full min-h-[200px] sm:min-h-[300px] lg:min-h-[400px]">
      <motion.svg 
        width="1200" 
        height="400" 
        viewBox="-150 0 1200 400" 
        initial="hidden" 
        animate="visible" 
        style={image}
        className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl h-auto mx-auto"
      >
        {/* MICROSOFT - Line 1 - Elegant Futuristic Design */}

        {/* M - Futuristic Angular */}
        <motion.path
          d="M 30 40 L 30 130 M 30 40 L 60 85 L 90 40 M 90 40 L 90 130"
          stroke="#007AFF"
          variants={draw}
          custom={1}
          style={shape}
        />

        {/* I - Minimalist Elegant */}
        <motion.path
          d="M 130 40 L 170 40 M 150 40 L 150 130 M 130 130 L 170 130"
          stroke="#00D4FF"
          variants={draw}
          custom={2}
          style={shape}
        />

        {/* C - Smooth Curve */}
        <motion.path
          d="M 240 45 Q 190 25 190 85 Q 190 145 240 125"
          stroke="#007AFF"
          variants={draw}
          custom={3}
          style={shape}
        />

        {/* R - Sharp Modern */}
        <motion.path
          d="M 280 40 L 280 130 M 280 40 L 320 40 Q 350 40 350 65 Q 350 85 320 85 L 280 85 M 315 85 L 350 130"
          stroke="#00D4FF"
          variants={draw}
          custom={4}
          style={shape}
        />

        {/* O - Perfect Circle */}
        <motion.path
          d="M 390 85 Q 390 40 430 40 Q 470 40 470 85 Q 470 130 430 130 Q 390 130 390 85"
          stroke="#007AFF"
          variants={draw}
          custom={5}
          style={shape}
        />

        {/* S - Elegant Curve */}
        <motion.path
          d="M 540 50 Q 490 35 490 60 Q 490 82 520 87 Q 550 92 550 110 Q 550 135 500 120"
          stroke="#00D4FF"
          variants={draw}
          custom={6}
          style={shape}
        />

        {/* O - Perfect Circle */}
        <motion.path
          d="M 590 85 Q 590 40 630 40 Q 670 40 670 85 Q 670 130 630 130 Q 590 130 590 85"
          stroke="#007AFF"
          variants={draw}
          custom={7}
          style={shape}
        />

        {/* F - Clean Lines */}
        <motion.path
          d="M 710 40 L 710 130 M 710 40 L 760 40 M 710 85 L 750 85"
          stroke="#00D4FF"
          variants={draw}
          custom={8}
          style={shape}
        />

        {/* T - Balanced */}
        <motion.path
          d="M 800 40 L 880 40 M 840 40 L 840 130"
          stroke="#007AFF"
          variants={draw}
          custom={9}
          style={shape}
        />

        {/* STUDENT - Line 2 - Equal Spacing */}

        {/* S - Elegant */}
        <motion.path
          d="M 140 170 Q 90 155 90 180 Q 90 200 120 205 Q 150 210 150 230 Q 150 255 100 240"
          stroke="#00D4FF"
          variants={draw}
          custom={10}
          style={shape}
        />

        {/* T - Clean */}
        <motion.path
          d="M 170 170 L 250 170 M 210 170 L 210 260"
          stroke="#007AFF"
          variants={draw}
          custom={11}
          style={shape}
        />

        {/* U - Smooth */}
        <motion.path
          d="M 290 170 L 290 230 Q 290 260 320 260 Q 350 260 350 230 L 350 170"
          stroke="#00D4FF"
          variants={draw}
          custom={12}
          style={shape}
        />

        {/* D - Perfect Arc */}
        <motion.path
          d="M 390 170 L 390 260 M 390 170 L 430 170 Q 470 170 470 215 Q 470 260 430 260 L 390 260"
          stroke="#007AFF"
          variants={draw}
          custom={13}
          style={shape}
        />

        {/* E - Geometric */}
        <motion.path
          d="M 510 170 L 510 260 M 510 170 L 570 170 M 510 215 L 555 215 M 510 260 L 570 260"
          stroke="#00D4FF"
          variants={draw}
          custom={14}
          style={shape}
        />

        {/* N - Angular */}
        <motion.path
          d="M 610 170 L 610 260 M 610 170 L 670 260 M 670 170 L 670 260"
          stroke="#007AFF"
          variants={draw}
          custom={15}
          style={shape}
        />

        {/* T - Balanced */}
        <motion.path
          d="M 710 170 L 790 170 M 750 170 L 750 260"
          stroke="#00D4FF"
          variants={draw}
          custom={16}
          style={shape}
        />

        {/* CHAPTER - Line 3 - Futuristic Elegance */}

        {/* C - Smooth */}
        <motion.path
          d="M 140 305 Q 90 285 90 345 Q 90 405 140 385"
          stroke="#007AFF"
          variants={draw}
          custom={17}
          style={shape}
        />

        {/* H - Strong */}
        <motion.path
          d="M 190 300 L 190 390 M 240 300 L 240 390 M 190 345 L 240 345"
          stroke="#00D4FF"
          variants={draw}
          custom={18}
          style={shape}
        />

        {/* A - Sharp Peak */}
        <motion.path
          d="M 280 390 L 315 300 L 350 390 M 295 360 L 335 360"
          stroke="#007AFF"
          variants={draw}
          custom={19}
          style={shape}
        />

        {/* P - Clean */}
        <motion.path
          d="M 390 300 L 390 390 M 390 300 L 430 300 Q 460 300 460 325 Q 460 345 430 345 L 390 345"
          stroke="#00D4FF"
          variants={draw}
          custom={20}
          style={shape}
        />

        {/* T - Elegant */}
        <motion.path
          d="M 500 300 L 580 300 M 540 300 L 540 390"
          stroke="#007AFF"
          variants={draw}
          custom={21}
          style={shape}
        />

        {/* E - Geometric */}
        <motion.path
          d="M 620 300 L 620 390 M 620 300 L 680 300 M 620 345 L 665 345 M 620 390 L 680 390"
          stroke="#00D4FF"
          variants={draw}
          custom={22}
          style={shape}
        />

        {/* R - Modern */}
        <motion.path
          d="M 720 300 L 720 390 M 720 300 L 760 300 Q 790 300 790 325 Q 790 345 760 345 L 720 345 M 755 345 L 790 390"
          stroke="#007AFF"
          variants={draw}
          custom={23}
          style={shape}
        />

        {/* Futuristic Glow Effects */}
        <defs>
          <filter id="futuristicGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="8" result="bigBlur"/>
            <feMerge> 
              <feMergeNode in="bigBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="futuristicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#007AFF", stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:"#00D4FF", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#007AFF", stopOpacity:1}} />
          </linearGradient>
        </defs>

      </motion.svg>
    </div>
  );
}

/**
 * ==============   Futuristic Styles   ================
 */
const image = {
  maxWidth: "95vw",
  maxHeight: "45vh",
  filter: "url(#futuristicGlow)",
};

const shape = {
  strokeWidth: 6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "transparent",
  filter: "drop-shadow(0 0 12px currentColor)",
};