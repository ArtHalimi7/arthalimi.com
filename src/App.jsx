/* eslint-disable no-unused-vars */
import React, { useState, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import CookiesModal from './components/CookiesModal';
import CustomScrollbar from './components/CustomScrollbar';
import ScrollTop from './components/ScrollTop';
import SplashScreen from './components/SplashScreen';
import HiringModePanel from './components/HiringModePanel';


const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => setAppReady(true), 80);
  };

  return (
    // CHANGE: Added bg-architecture here
    <main className='bg-architecture min-h-screen relative'>
      {/* NEW: The Grain Overlay (Always visible, sits on top but ignores clicks) */}
      <div className="bg-grain" />

      <Router>
        <Navbar />
        <HiringModePanel />

        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

        {appReady && (
          <>
            <div className="opacity-0 animate-fade-in relative z-10">
              <CustomScrollbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ScrollTop />
            </div>
            <CookiesModal animateIn={true} />
          </>
        )}
      </Router>
    </main>
  );
}

export default App;