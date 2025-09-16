import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About';
import Projects from '../components/Projects';
import WorkExperience from '../components/WorkExperience';
import ServicesSection  from '../components/Services';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <WorkExperience />
      <Projects />
      <ServicesSection />
    </div>
  )
}

export default Home;