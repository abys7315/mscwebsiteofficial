import React from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { ArrowRight, Users, Calendar, Award, MapPin, Clock, ChevronRight, Play, Info, Star, Zap, Trophy, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView as useInViewHook } from 'react-intersection-observer';
import { useEffect } from 'react';
import AlphabetDrawing from '../components/AnimatedText';
import BayWindowSlider from '../components/BayWindowSlider';
import StarryBackground from '../components/StarryBackground';

const Home = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.95]);

  const [featuresRef, featuresInView] = useInViewHook({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '100px 0px'
  });

  const [statsRef, statsInView] = useInViewHook({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '100px 0px'
  });

  const features = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "Cutting-edge Microsoft technologies and development practices",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
      color: "#007AFF"
    },
    {
      icon: Trophy,
      title: "Excellence Driven",
      description: "Premium workshops, hackathons, and technical excellence",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
      color: "#5856D6"
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building connections with industry leaders and peers",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      color: "#007AFF"
    }
  ];

  const stats = [
    { number: 500, suffix: "+", label: "Active Members", icon: Users, color: "#007AFF" },
    { number: 50, suffix: "+", label: "Events Hosted", icon: Calendar, color: "#5856D6" },
    { number: 100, suffix: "+", label: "Projects Completed", icon: Award, color: "#007AFF" },
    { number: 25, suffix: "+", label: "Industry Partners", icon: Star, color: "#5856D6" }
  ];

  // Animated Counter Component
  const AnimatedCounter = ({ value, suffix = "", inView }) => {
    const count = useMotionValue(0);
    const rounded = useSpring(count, { damping: 50, stiffness: 100 });
    const [displayValue, setDisplayValue] = React.useState(0);

    useEffect(() => {
      const unsubscribe = rounded.on("change", (latest) => {
        setDisplayValue(Math.round(latest));
      });
      return unsubscribe;
    }, [rounded]);

    useEffect(() => {
      if (inView) {
        const controls = animate(count, value, {
          duration: 2,
          ease: "easeOut",
        });
        return controls.stop;
      }
    }, [count, value, inView]);

    return (
      <span>
        {displayValue}{suffix}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black relative">
      {/* Starry Background Throughout */}
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>
      
      {/* Apple-Style Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
            alt="Technology Background"
            className="w-full h-full object-cover opacity-20 dark:opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Apple-Style Logo */}
          <motion.div 
            className="mb-16 flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-apple-blue to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img
                src="/msc-logo.png"
                alt="MSC Logo"
                className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 object-contain apple-floating relative z-10"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0, 122, 255, 0.3))' }}
              />
            </div>
          </motion.div>

          {/* Apple-Style Title */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="text-center mb-8"
          >
            <div className="mb-8 flex items-center justify-center min-h-[30vh]">
              <div className="flex justify-center w-full">
                <AlphabetDrawing />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
              <Zap className="w-6 h-6 text-apple-blue" />
              <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
            </div>
            <p className="text-xl md:text-2xl text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed max-w-4xl mx-auto font-normal">
              Empowering students through Microsoft technologies and innovation
            </p>
          </motion.div>

          {/* Apple-Style Buttons */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/join">
              <motion.button 
                className="apple-button-secondary px-8 py-4 text-lg flex items-center gap-3"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <Play className="w-5 h-5" />
                Join Now
              </motion.button>
            </Link>
            
            <Link to="/about">
              <motion.button 
                className="apple-button-secondary px-8 py-4 text-lg flex items-center gap-3"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <Info className="w-5 h-5" />
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Apple-Style Features Section */}
      <section className="relative py-20 px-4 z-10" ref={featuresRef}>
        {/* Section Background Overlay */}
        <div className="absolute inset-0 bg-black/15"></div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={featuresInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
              What We Offer
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
              <Zap className="w-6 h-6 text-apple-blue" />
              <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
            </div>
            <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-3xl mx-auto">
              Comprehensive programs designed for technical excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                animate={featuresInView ? { y: 0, opacity: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08, 
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="apple-card overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Feature Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm">
                      <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-apple-gray-900 dark:text-white group-hover:text-apple-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apple-Style Stats Section */}
      <section className="relative py-20 px-4 z-10" ref={statsRef}>
        {/* Section Background Overlay */}
        <div className="absolute inset-0 bg-black/25"></div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={statsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
              Our Impact
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
              <Trophy className="w-6 h-6 text-apple-blue" />
              <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
            </div>
            <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0, scale: 0.9 }}
                animate={statsInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.06, 
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="apple-card p-8 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-out bg-gradient-to-br from-apple-blue/10 to-purple-500/10">
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                </div>
                
                <div className="text-4xl md:text-5xl font-bold mb-2 text-apple-gray-900 dark:text-white">
                  <AnimatedCounter value={stat.number} suffix={stat.suffix} inView={statsInView} />
                </div>
                
                <div className="text-apple-gray-600 dark:text-apple-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Events Carousel Section */}
      <section className="relative py-20 px-4 z-10">
        {/* Section Background Overlay */}
        <div className="absolute inset-0 bg-black/35"></div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "100px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
              Experience Our Events
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
              <Calendar className="w-6 h-6 text-apple-blue" />
              <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
            </div>
            <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              Discover our upcoming and past events, workshops, hackathons, and technical sessions.
            </p>
          </motion.div>

          {/* Bay Window Slider */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "100px 0px" }}
            transition={{ 
              duration: 1.0, 
              ease: [0.23, 1, 0.32, 1],
              delay: 0.3 
            }}
          >
            <BayWindowSlider />
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "100px 0px" }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="text-center mt-12"
          >
            <Link to="/events">
              <motion.button 
                className="apple-button-secondary px-8 py-4 text-lg flex items-center gap-3 mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View All Events
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;