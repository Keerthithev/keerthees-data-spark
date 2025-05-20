
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize smooth scrolling
    const initSmoothScroll = () => {
      // Using GSAP ScrollTrigger for scroll animations
      ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
        markers: false
      });
      
      // Add parallax effect to sections
      const sections = document.querySelectorAll('section');
      sections.forEach((section, i) => {
        const bg = section.querySelector('.blur-light');
        if (bg) {
          gsap.to(bg, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      });
      
      // Ensure all scroll triggers are refreshed when the page is fully loaded
      ScrollTrigger.refresh();
    };

    initSmoothScroll();
  
    // Back to top button visibility
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTopButton.classList.remove('opacity-0', 'invisible');
          backToTopButton.classList.add('opacity-100', 'visible');
        } else {
          backToTopButton.classList.remove('opacity-100', 'visible');
          backToTopButton.classList.add('opacity-0', 'invisible');
        }
      });
    }
    
    // Clean up event listeners on unmount
    return () => {
      const backToTopButton = document.getElementById('back-to-top');
      if (backToTopButton) {
        window.removeEventListener('scroll', () => {});
      }
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-portfolio-background">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
      
      {/* Back to top button */}
      <button 
        id="back-to-top"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-portfolio-accent shadow-lg flex items-center justify-center text-white opacity-0 invisible transition-all duration-300 z-50 hover:scale-110"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
