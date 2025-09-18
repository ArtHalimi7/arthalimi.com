import React, { useState, useEffect } from 'react';
import Alogo from '../assets/Alogo.png';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Save navlink ids and labels (keep your navlinks)
  const navLinks = [
    { id: 'about', label: t('nav_about') },
    { id: 'work', label: t('nav_work') },
    { id: 'education', label: t('nav_education') },
    { id: 'projects', label: t('nav_projects') },
    { id: 'services', label: t('nav_services') },
    { id: 'contact', label: t('nav_contact') },
  ];

  // Track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersection, observerOptions);
    navLinks.forEach(link => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });
    return () => {
      navLinks.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [navLinks]);

  // Scroll to section with offset
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // px, adjust if needed
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
      setIsOpen(false);
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className="bg-[#18191A] shadow-sm fixed w-full top-0 left-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('about')}>
            <img src={Alogo} alt="Alogo" className="h-10 w-10 rounded-full object-cover" />
            <div className="ml-3">
              <span className="text-lg font-bold text-white">Art Halimi</span>
              <div className="text-xs text-zinc-400">Full Stack Dev</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-3 py-2 text-sm font-medium relative group transition-colors duration-200 ${
                    activeSection === link.id ? 'text-[#B71C1C]' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className={`absolute bottom-1 left-3 h-0.5 bg-[#B71C1C] transition-all duration-300 ${
                    activeSection === link.id ? 'w-[calc(100%-24px)]' : 'w-0 group-hover:w-[calc(100%-24px)]'
                  }`}></span>
                </button>
              ))}
              {/* Language Selector */}
              <div className="flex items-center space-x-2 ml-4 border-l pl-4 border-white/10">
                <button
                  onClick={() => i18n.changeLanguage('sq')}
                  className={`px-2 py-1 text-sm font-medium rounded ${
                    i18n.language === 'sq' ? 'bg-[#B71C1C] text-white' : 'text-zinc-300 hover:text-[#B71C1C]'
                  }`}
                >
                  SQ
                </button>
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-2 py-1 text-sm font-medium rounded ${
                    i18n.language === 'en' ? 'bg-[#B71C1C] text-white' : 'text-zinc-300 hover:text-[#B71C1C]'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => i18n.changeLanguage('de')}
                  className={`px-2 py-1 text-sm font-medium rounded ${
                    i18n.language === 'de' ? 'bg-[#B71C1C] text-white' : 'text-zinc-300 hover:text-[#B71C1C]'
                  }`}
                >
                  DE
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-300 hover:text-white hover:bg-[#B71C1C]/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 h-screen w-64 bg-[#18191A] transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl`}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center">
            <img src={Alogo} alt="Alogo" className="h-8 w-8 rounded-full object-cover" />
            <div className="ml-2">
              <div className="text-lg font-semibold text-white">Art Halimi</div>
              <div className="text-xs text-zinc-400">Full Stack Dev</div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#B71C1C] rounded-md"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile menu links */}
        <div className="px-2 py-4">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 mb-2 relative group ${
                activeSection === link.id ? 'text-[#B71C1C] bg-[#B71C1C]/10' : 'text-zinc-200 hover:text-[#B71C1C] hover:bg-[#B71C1C]/10'
              }`}
            >
              <span>{link.label}</span>
              <span className={`absolute bottom-0 left-4 h-0.5 bg-[#B71C1C] transition-all duration-300 ${
                activeSection === link.id ? 'w-[calc(100%-32px)]' : 'w-0 group-hover:w-[calc(100%-32px)]'
              }`}></span>
            </button>
          ))}
          {/* Mobile Language Selector */}
          <div className="mt-4 px-4 py-3 border-t border-white/10">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => i18n.changeLanguage('sq')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  i18n.language === 'sq' ? 'bg-[#B71C1C] text-white' : 'text-zinc-300 hover:text-[#B71C1C] border border-zinc-600'
                }`}
              >
                SQ
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  i18n.language === 'en' ? 'bg-[#B71C1C] text-white' : 'text-zinc-300 hover:text-[#B71C1C] border border-zinc-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('de')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  i18n.language === 'de' ? 'bg-[#B71C1C] text-white' : 'text-zinc-300 hover:text-[#B71C1C] border border-zinc-600'
                }`}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
