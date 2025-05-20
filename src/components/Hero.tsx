
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (heroRef.current && textRef.current) {
      const tl = gsap.timeline();
      
      tl.from(heroRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      tl.from(textRef.current.querySelectorAll('.animate-text'), {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      }, "-=0.5");
      
      tl.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, "-=0.3");
      
      // Subtle floating animation for the hero section
      gsap.to('.floating-effect', {
        y: 15,
        duration: 2.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
      });
    }
    
    // Typing animation
    const text = "Data Science Student";
    const typingSpeed = 100; // ms per character
    const typingElement = document.querySelector('.typewriter-text');
    let charIndex = 0;
    
    if (typingElement) {
      const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          typingElement.textContent = text.substring(0, charIndex + 1);
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);
    }
  }, []);

  return (
    <section id="home" ref={heroRef} className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="blur-light top-20 left-20 floating-effect"></div>
      <div className="blur-light bottom-10 right-10" style={{ background: '#8b5cf6' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h2 ref={textRef} className="mb-6">
              <span className="text-lg font-medium text-portfolio-blue block mb-3 animate-text">Hello, I'm</span>
              <span className="text-5xl md:text-6xl font-bold block mb-4 animate-text">Keerthigan T.</span>
              <div className="flex items-center">
                <span className="text-xl md:text-2xl text-portfolio-text-secondary font-medium animate-text typewriter">
                  <span className="typewriter-text"></span>
                </span>
              </div>
            </h2>
            
            <p className="text-lg text-portfolio-text-secondary mb-8 max-w-lg animate-text">
              Passionate about data science and MERN stack development. Currently pursuing my degree with a specialization in Data Science at Northern University, Jaffna.
            </p>
            
            <div className="flex flex-wrap gap-4 hero-cta">
              <a href="#projects" className="btn-primary flex items-center gap-2">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-outline">
                Contact Me
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-portfolio-blue to-portfolio-accent p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-portfolio-background flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                    alt="Abstract digital representation" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-portfolio-card px-6 py-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-medium">Ready for new opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
