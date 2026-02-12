/* eslint-disable no-unused-vars */
import React, { useState, Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import CustomScrollbar from './components/CustomScrollbar';
import ScrollTop from './components/ScrollTop';

const CookiesModal = lazy(() => import('./components/CookiesModal'));

const App = () => {
  return (
    <main className='bg-architecture min-h-screen relative'>

      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />

        <div className="relative z-10">
          <CustomScrollbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollTop />
        </div>
        <Suspense fallback={null}>
          <CookiesModal animateIn={true} />
        </Suspense>
      </Router>
    </main>
  );
}

export default App;