import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About';
import Projects from '../components/Projects';
import QuoteSection from '../components/QuoteSection';
import WorkExperience from '../components/WorkExperience';
import ServicesSection  from '../components/Services';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import HighlightSection from '../components/HighlightSection';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <HighlightSection />
      <WorkExperience />
      <Education />
  <Projects />
  <QuoteSection />
      <ServicesSection />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home;