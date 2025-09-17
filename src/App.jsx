
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import CustomScrollbar from './components/CustomScrollbar';
import ScrollTop from './components/ScrollTop';
import ScrollProgress from './components/ScrollProgress';

const App = () => {
  
  return (
    <main className='background1'>
      <Router>
        <ScrollProgress />
        <Navbar />
        <CustomScrollbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollTop />
      </Router>
    </main>
  );
}

export default App;
