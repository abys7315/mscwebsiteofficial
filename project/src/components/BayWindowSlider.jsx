import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const BayWindowSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverDirection, setHoverDirection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);
  const rotationIntervalRef = useRef(null);

  const events = [
    {
      id: 7,
      title: "Matrix Hackathon",
      date: "27th September, 2025",
      location: "CB-507",
      attendees: "Various",
      status: "COMPLETED",
      description: "Matrix Hackathon 2025 – Innovate. Solve. Conquer. The Microsoft Student Chapter proudly organized Matrix Hackathon 2025 on September 27th, 2025, at CB-507, bringing together brilliant young innovators, designers, and developers for an exciting day of creativity, coding, and problem solving. The event challenged participants to think beyond conventional boundaries and turn bold ideas into impactful solutions. At the start, each team drew a chit that determined their journey ahead: • Red Path – Innovators: Teams created their own problem statements and developed original solutions from scratch. • Blue Path – Solvers: Teams tackled curated, research-level problem statements provided by the organizers. The hackathon unfolded in two engaging and competitive rounds: Round 1 – The Reality Check (9 AM – 1 PM): Teams kick-started the day with a shark tank–style pitch, presenting their ideas, proposed solutions, and business models. Judges assessed clarity of thought, innovation, feasibility, and impact—rewarding teams that combined creativity with practicality. Round 2 – Portal to Prototype (2 PM – 6 PM): After validating their ideas, teams entered the development phase to build working prototypes while meeting progress checkpoints. Midway, a surprise feature twist tested their adaptability and teamwork under pressure. The round concluded with final prototype presentations, evaluated on technical execution, creativity, functionality, and overall presentation. The event concluded with the announcement of two major winners: • Red Pill Winner: Best innovation from self-created ideas. • Blue Pill Winner: Best solution from provided problem statements. Matrix Hackathon 2025 stood as a testament to innovation under pressure— celebrating creativity, collaboration, and technical excellence. Participants left with enhanced skills, real-world experience, and the thrill of bringing their visions to life. Choose your path. Build your vision. Claim your victory.",
      winner: {
        name: "404 Found (Blue Pill Winner)",
        position: "Winner"
      },
      runnerUp1: {
        name: "Ignite (Blue Pill Runner-Up)",
        position: "1st Runner-Up"
      },
      runnerUp2: {
        name: "Marine Drive (Red Pill Winner) & Zeroday (Red Pill Runner-Up)",
        position: "2nd Runner-Up"
      },
      image:"/gallery/matrix-3.png"
    },
    {
      id: 10,
      title: "Future-Ready Computing: The Memory Shift",
      date: "19th September, 2025",
      location: "Google Meet",
      attendees: "Various",
      status: "COMPLETED",
      description: "The Microsoft Student Chapter of VIT-AP University conducted an online session titled 'Future-Ready Computing: The Memory Shift'. The session was delivered by Dr. Arijit Nath, an Assistant Professor at IIIT Guwahati. The primary objective of the event was to provide participants with a comprehensive overview of advancements in computing systems and emerging memory technologies that are shaping the future of computing. Dr. Nath divided the presentation into two main parts. • Part A, Advancement in Computing Systems, explored the historical development of computers, focusing on Moore's Law and the subsequent challenges of the 'Power Wall' and 'Memory Wall'. It covered the paradigm shift from single-core to multi-core processors and the rise of specialized accelerators like GPUs and TPUs to handle modern workloads. • Part B, Emerging Memory Technologies, delved into innovative solutions designed to overcome current bottlenecks. Key topics included Near Data Processing (NDP), Emerging Non-Volatile Memories (NVM), Intermittent Computing for low-power IoT devices, and Disaggregated Memory Systems. Dr. Nath also shared insights from his own thesis work on enhancing the endurance of Non-Volatile Memory. Through this session, participants gained valuable insights into the architectural evolution of computers and the critical role of memory innovation in supporting demanding applications like AI, Machine Learning, and Big Data Analytics. The event encouraged students to understand the core challenges in computer architecture and explore the future of high performance, energy-efficient computing.",
      image:"/gallery/memory-shift-1.png"
    },
    {
      id: 9,
      title: "Near-Data Processing",
      date: "9th September, 2025",
      location: "Google Meet",
      attendees: "Various",
      status: "COMPLETED",
      description: "The Microsoft Student Chapter of VIT-AP University conducted an online session titled 'Near Data processing: An Emerging computer paradigm' on 9th September at 9:00 PM via Google Meet. Key Insights from Guest Lecture on Near-Data Processing: The guest lecture highlighted several crucial aspects of modern computing challenges and opportunities. The session emphasized sustainability in computing, where near-data processing reduces the excessive movement of data between memory and CPU, thereby improving overall energy efficiency. A major focus was on addressing the issue of high energy consumption in traditional architectures, as near-data approaches help in lowering power requirements and extending system lifetime. The speaker also discussed the role of runtime systems and Instruction Set Architecture (ISA), explaining how architectural support is essential for enabling processors to directly interact with memory units. This innovation not only enhances efficiency but also contributes to the reduction of the carbon footprint of large-scale data centers, aligning with global green technology goals. Furthermore, the lecture underlined the relevance of NDP in data-driven applications such as Artificial Intelligence, Big Data, and Machine Learning, where bringing computation closer to storage significantly reduces latency and improves processing speed. The talk concluded by addressing the trade-off between the increasing capacity of modern processors and the corresponding rise in power consumption, stressing how near data processing provides a balanced approach to achieving both high performance and energy optimization.",
      image:"/gallery/ndp-1.png"
    },
    {
      id: 2,
      title: "The CIPHER SAGA",
      date: "6th September, 2025",
      location: "Newton Hall, CB-G18",
      attendees: "Various",
      status: "COMPLETED",
      description: "The Cipher Saga, a cybersecurity competition, was successfully conducted on September 6, 2025, at Newton Hall, AB1 and CB-G18, from 9:00 AM to 6:00 PM. Organized by the Microsoft Student Chapter, in collaboration with Null Chapter, the event aimed to enhance students' cybersecurity skills through practical challenges. The competition featured a multi-round format designed to progressively test participants' technical abilities. Beginning with an online screening round that assessed logical and analytical skills, participants advanced through three main rounds: 'The Deception' focused on digital forensics and coding puzzles, 'The Cryptic' challenged teams with classical ciphers and encryption tasks, and 'The Final Escape' presented a comprehensive Capture the Flag (CTF) experience covering web security, network forensics, steganography, reverse engineering, etc. The event successfully engaged students in hands-on cybersecurity challenges, promoting teamwork and problem-solving under pressure. Participants gained valuable exposure to real-world security scenarios. The competition effectively achieved its objectives of building cybersecurity awareness, strengthening technical skills, and fostering collaborative learning among participants.",
      winner: {
        name: "Vatanesh Sharma & Atharv Sharma",
        position: "1st Place"
      },
      runnerUp1: {
        name: "Surya D Naidu & Tarini Bandlamudi",
        position: "2nd Place"
      },
      runnerUp2: {
        name: "TBD",
        position: "3rd Place"
      },
      image:"/gallery/cipher-1.png"
    },
    {
      id: 5,
      title: "DSA Quest: Fast & Furious Edition",
      date: "28th (Online) and 30th August, 2025 (Offline)",
      location: "AB-1 Newton Hall",
      attendees: "Various",
      status: "COMPLETED",
      description: "DSA QUEST: Fast & Furious Edition – A Battle of Speed and Precision The Microsoft Student Chapter proudly hosted DSA QUEST: Fast & Furious Edition on August 28th and 30th, 2025, a high-stakes coding contest that brought together some of the brightest problem solvers. The event was designed to test participants' mastery of data structures and algorithms (DSA) while pushing their limits of speed, logic, and precision. The competition unfolded in three intense rounds, each crafted to challenge a different dimension of coding expertise: Round 1 – Ride or Die MCQ: Participants started with a rapid-fire set of multiple-choice questions, ranging from fundamentals to edge cases. This round acted as a filter for sharp thinkers who could balance accuracy along with speed. Round 2 – Code it to the Max: Qualifiers advanced to hands-on coding, solving algorithmic and DSA-based problems of varying difficulty. With the leaderboard ticking and time pressure mounting, participants showcased not just their problem-solving ability but also their efficiency in coding under stress. Round 3 – Rapid Fire League: The grand finale tested the best of the best. Eight finalists battled through an application-based, difficult DSA challenge in a knockout format (8 → 4 → 2 → 1). Evaluated by a panel of faculty members, this round demanded clarity of thought, adaptability, and nerves of steel. To keep the competitive spirit high, the event offered a prize pool of ₹3,000. The event was not just about winning—it was about learning, experiencing real-time pressure, and growing as a problem solver. The participants walked away with sharpened coding reflexes, exposure to competitive environments, and the thrill of tackling problems head-on. Events like DSA QUEST stand as proof that competitive coding is more than just algorithms—it's about resilience, focus, and the pursuit of excellence.",
      winner: {
        name: "ATHIPATLA DEERAJ KUMAR (22BCE8574)",
        position: "Winner"
      },
      runnerUp1: {
        name: "MAMIDI GIRI NAGA VENKATA RANGA PRANEETH (23BCE9683)",
        position: "1st Runner-Up"
      },
      runnerUp2: {
        name: "VAISHYARAJU HARSHITHA (23BCE9773)",
        position: "2nd Runner-Up"
      },
      image:"/gallery/dsa-fast-2.png"
    }
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => prev === 0 ? events.length - 1 : prev - 1);
    }
  };

  // Auto-rotation logic
  useEffect(() => {
    if (!isHovering && !isMobile) {
      rotationIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 4000);
    } else {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    }

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [isHovering, isMobile, events.length]);

  // Hover-based rotation
  useEffect(() => {
    if (isHovering && hoverDirection) {
      const rotationInterval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (hoverDirection === 'right') {
            return (prev + 1) % events.length;
          } else {
            return prev === 0 ? events.length - 1 : prev - 1;
          }
        });
      }, 1400);

      return () => clearInterval(rotationInterval);
    }
  }, [isHovering, hoverDirection, events.length]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const threshold = rect.width * 0.3; // 30% from edges
    
    if (x < threshold) {
      setHoverDirection('left');
    } else if (x > rect.width - threshold) {
      setHoverDirection('right');
    } else {
      setHoverDirection(null);
    }
  };

  const getCardStyle = (index) => {
    const totalCards = events.length;
    const angle = (360 / totalCards) * (index - currentIndex);
    
    // Responsive radius
    const radius = window.innerWidth < 640 ? 180 : 
                  window.innerWidth < 1024 ? 240 : 320;
    
    // Calculate position on circle
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius;
    
    // Determine card position
    const isCenter = index === currentIndex;
    const isVisible = Math.abs(angle) <= 90;
    
    // Scale and rotation based on position
    let scale = 0.7;
    let rotateY = 0;
    let opacity = 0.4;
    let zIndex = 1;
    
    // Responsive scaling
    const baseScale = window.innerWidth < 640 ? 0.6 : 
                     window.innerWidth < 1024 ? 0.75 : 1;
    
    if (isCenter) {
      scale = baseScale * 1.1;
      rotateY = 0;
      opacity = 1;
      zIndex = 10;
    } else if (Math.abs(angle) <= 45) {
      // Side cards
      scale = baseScale * 0.85;
      rotateY = angle > 0 ? -25 : 25; // Rotate away from center
      opacity = 0.8;
      zIndex = 5;
    } else if (isVisible) {
      // Far side cards
      scale = baseScale * 0.7;
      rotateY = angle > 0 ? -35 : 35;
      opacity = 0.5;
      zIndex = 2;
    }
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: isVisible ? opacity : 0,
      zIndex,
    };
  };

  // Mobile horizontal slider layout
  const renderMobileSlider = () => (
    <div className="relative w-full h-[60vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Mobile Slider Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative w-full h-80 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Mobile Cards Container */}
          <motion.div
            className="flex h-full"
            animate={{ x: -currentIndex * 100 + '%' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {events.map((event, index) => (
              <div key={event.id} className="flex-shrink-0 w-full h-full px-2">
                <motion.div
                  className="w-full h-full apple-card rounded-2xl overflow-hidden shadow-2xl shadow-apple-blue/20 border border-apple-blue/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Section */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'COMPLETED'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-apple-blue/20 text-apple-blue border border-apple-blue/30'
                    }`}>
                      {event.status}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-white line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-3 h-3 text-apple-blue" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-3 h-3 text-apple-blue" />
                        <span className="truncate">{event.attendees}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      className="w-full apple-button text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Mobile Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => prev === 0 ? events.length - 1 : prev - 1)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % events.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Mobile Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-apple-blue shadow-lg shadow-apple-blue/50 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop 3D carousel layout
  const renderDesktopCarousel = () => (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
        {/* 3D Carousel Container */}
        <div
          ref={containerRef}
          className="relative h-64 md:h-80 lg:h-96 w-full flex items-center justify-center cursor-pointer"
          style={{
            perspective: window.innerWidth < 640 ? '800px' :
                        window.innerWidth < 1024 ? '1000px' : '1200px',
            transformStyle: 'preserve-3d'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setHoverDirection(null);
          }}
          onMouseMove={handleMouseMove}
        >
          {/* Hover Direction Indicators */}
          {isHovering && hoverDirection && (
            <div className={`absolute top-1/2 transform -translate-y-1/2 z-30 ${
              hoverDirection === 'left' ? 'left-8' : 'right-8'
            }`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20"
              >
                <ArrowRight className={`w-6 h-6 text-white ${
                  hoverDirection === 'left' ? 'rotate-180' : ''
                }`} />
              </motion.div>
            </div>
          )}

          {events.map((event, index) => {
            const cardStyle = getCardStyle(index);
            const isCenter = index === currentIndex;
            
            return (
              <motion.div
                key={event.id}
                className="absolute w-48 h-60 md:w-64 md:h-80 lg:w-80 lg:h-96 bay-window-card"
                style={cardStyle}
                animate={cardStyle}
                transition={{
                  duration: window.innerWidth < 640 ? 0.8 : 
                           window.innerWidth < 1024 ? 1.0 : 1.2,
                  ease: [0.23, 1, 0.32, 1], // Apple-style easing for ultra-smooth motion
                }}
              >
                {/* Card Container */}
                <div className={`
                  relative w-full h-full rounded-2xl overflow-hidden
                  ${isCenter 
                    ? 'apple-card shadow-2xl shadow-apple-blue/20 border border-apple-blue/30' 
                    : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700/50'
                  }
                  backdrop-blur-sm transition-all duration-500
                `}>
                  
                  {/* Image Section */}
                  <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'COMPLETED' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-apple-blue/20 text-apple-blue border border-apple-blue/30'
                    }`}>
                      {event.status}
                    </div>

                    {/* Rating */}
                    {event.rating !== 'N/A' && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white text-xs font-medium">{event.rating}</span>
                      </div>
                    )}

                    {/* Center Card Glow */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-apple-blue/20 via-transparent to-purple-500/20 pointer-events-none" />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-3 md:p-4 lg:p-6 space-y-2 md:space-y-3 lg:space-y-4">
                    <h3 className={`text-sm md:text-lg lg:text-xl font-bold line-clamp-2 transition-colors ${
                      isCenter ? 'text-apple-gray-900 dark:text-white' : 'text-gray-100'
                    }`}>
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-300 text-xs md:text-sm line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-1 md:gap-2 text-xs">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-2 h-2 md:w-3 md:h-3 text-apple-blue" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-2 h-2 md:w-3 md:h-3 text-purple-400" />
                        <span className="truncate">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-2 h-2 md:w-3 md:h-3 text-apple-blue" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-2 h-2 md:w-3 md:h-3 text-purple-400" />
                        <span className="truncate">{event.attendees}</span>
                      </div>
                    </div>

                    {/* Action Button - Only show on center card */}
                    {isCenter && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full apple-button text-white py-1 md:py-2 px-2 md:px-4 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 group"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    )}
                  </div>

                  {/* Center Card Enhanced Glow */}
                  {isCenter && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-apple-blue/10 via-purple-500/10 to-apple-blue/10 pointer-events-none" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 md:bottom-12 lg:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-apple-blue shadow-lg shadow-apple-blue/50 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Instructions */}
      </div>
    </div>
  );

  // Main render function
  return isMobile ? renderMobileSlider() : renderDesktopCarousel();
};

export default BayWindowSlider;
