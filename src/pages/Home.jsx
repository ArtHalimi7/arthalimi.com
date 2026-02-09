/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About';
import Projects from '../components/Projects';
import WorkExperience from '../components/WorkExperience';
import ServicesSection  from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import TechStack from '../components/TechStack';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <WorkExperience />
      <br />
      <TechStack />
      <br /><br /><br />
      <ServicesSection />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home;