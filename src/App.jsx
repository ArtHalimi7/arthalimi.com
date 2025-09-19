
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import CustomScrollbar from './components/CustomScrollbar';
import ScrollTop from './components/ScrollTop';
import SplashScreen from './components/SplashScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  // Called by SplashScreen when its exit animation completes
  const handleSplashComplete = () => {
    setShowSplash(false);
    // small timeout to allow DOM settle, then show app content
    setTimeout(() => setAppReady(true), 80);
  };

  return (
    <main className='background1'>
      <Router>
                    <Navbar />
  {/* console.log('[app] showSplash=', showSplash, 'appReady=', appReady) */}
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

        {/* Render app content only after splash has fully exited */}
        {appReady && (
          <div className="opacity-0 animate-fade-in">
            <CustomScrollbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollTop />
          </div>
        )}
      </Router>
    </main>
  );
}

export default App;
