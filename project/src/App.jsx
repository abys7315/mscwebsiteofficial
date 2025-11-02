import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import EventDetail from './pages/EventDetail';
import Team from './pages/Team';
import Contact from './pages/Contact';
import CertificateValidation from './pages/CertificateValidation';
import Collaborate from './pages/Collaborate';

import AdminDashboard from './pages/admin/AdminDashboard';
import EventManagement from './pages/admin/EventManagement';
import CertificateManagement from './pages/admin/CertificateManagement';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/event/:id" element={<PageTransition><EventDetail /></PageTransition>} />
            <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/certificate" element={<PageTransition><CertificateValidation /></PageTransition>} />
            <Route path="/collaborate" element={<PageTransition><Collaborate /></PageTransition>} />
            <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
            <Route path="/admin/events" element={<PageTransition><EventManagement /></PageTransition>} />
            <Route path="/admin/certificates" element={<PageTransition><CertificateManagement /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#1C1C1E',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
    </div>
  );
}

export default App;
