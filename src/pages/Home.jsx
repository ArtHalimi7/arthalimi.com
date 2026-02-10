/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../components/Hero'
const About = React.lazy(() => import('../components/About'));
const Projects = React.lazy(() => import('../components/Projects'));
const WorkExperience = React.lazy(() => import('../components/WorkExperience'));
const ServicesSection = React.lazy(() => import('../components/Services'));
const Contact = React.lazy(() => import('../components/Contact'));
const Footer = React.lazy(() => import('../components/Footer'));
const TechStack = React.lazy(() => import('../components/TechStack'));

const Home = () => {
  return (
    <div>
      <Hero />
      <React.Suspense fallback={<div className="h-screen bg-black" />}>
        <About />
        <WorkExperience />
        <br />
        <TechStack />
        <br /><br /><br />
        <ServicesSection />
        <Projects />
        <Contact />
        <Footer />
      </React.Suspense>
    </div>
  )
}

export default Home;