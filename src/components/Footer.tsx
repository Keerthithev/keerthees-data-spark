
import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
        },
      });
    }
  }, []);

  return (
    <footer ref={footerRef} className="bg-portfolio-card py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold gradient-text mb-2">Keerthigan T.</h3>
            <p className="text-portfolio-text-secondary">Data Science Student & MERN Stack Developer</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/Keerthithev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-portfolio-text-secondary hover:text-portfolio-blue transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a 
              href="https://linkedin.com/in/keerthigan-t-225370251" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-portfolio-text-secondary hover:text-portfolio-blue transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a 
              href="mailto:keerthigan.t@example.com" 
              className="text-portfolio-text-secondary hover:text-portfolio-blue transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
        
        <hr className="border-portfolio-blue/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-portfolio-text-secondary text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Keerthigan T. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#home" className="text-sm text-portfolio-text-secondary hover:text-portfolio-text-primary transition-colors">Home</a>
            <a href="#about" className="text-sm text-portfolio-text-secondary hover:text-portfolio-text-primary transition-colors">About</a>
            <a href="#projects" className="text-sm text-portfolio-text-secondary hover:text-portfolio-text-primary transition-colors">Projects</a>
            <a href="#contact" className="text-sm text-portfolio-text-secondary hover:text-portfolio-text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
