
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

const App = () => {
  
  return (
    <main className='background1'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
