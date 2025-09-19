
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import CustomScrollbar from './components/CustomScrollbar';
import ScrollTop from './components/ScrollTop';
import SplashScreen from './components/SplashScreen';
import HiringModePanel from './components/HiringModePanel';

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
        <HiringModePanel />
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        {appReady && (
          <div className="opacity-0 animate-fade-in">
            <CustomScrollbar />
            <Routes>
              <Route path="/" element={<Home />} />
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
