import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About';
import Projects from '../components/Projects';
import WorkExperience from '../components/WorkExperience';
import ServicesSection  from '../components/Services';
import Education from '../components/Education';
import ModelViewer from '../components/ModelViewer';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="my-8 flex justify-center">
        <ModelViewer url="/models/audirs7.glb" width={1200} height={800} />
      </div>
      <About />
      <WorkExperience />
      <Education />
      <Projects />
      <ServicesSection />
    </div>
  )
}

export default Home;