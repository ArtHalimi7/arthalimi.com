import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About';
import Projects from '../components/Projects';
import WorkExperience from '../components/WorkExperience';
import ServicesSection  from '../components/Services';
import Education from '../components/Education';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <WorkExperience />
      <Education />
      <Projects />
      <ServicesSection />
    </div>
  )
}

export default Home;