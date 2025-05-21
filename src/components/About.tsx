
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, FileText } from 'lucide-react';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && contentRef.current) {
      // Content animation
      gsap.from(contentRef.current.querySelectorAll('.animate-item'), {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 80%',
          toggleActions: 'play none none none'
        }
      });

      // Image animation with more delay
      gsap.from('.about-image', {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 80%',
          toggleActions: 'play none none none'
        }
      });
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="blur-light top-1/4 right-1/4" style={{ opacity: 0.05, background: 'rgba(243, 156, 18, 0.2)' }}></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title animate-item">About Me</h2>
        
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <div className="space-y-6">
            <p className="text-lg text-portfolio-text-secondary animate-item">
              Hello! I'm Keerthigan, a second-year student at Northern Uni, Slit, specializing in Data Science. I'm passionate about analyzing data, building web applications, and solving problems with code.
            </p>
            
            <p className="text-lg text-portfolio-text-secondary animate-item">
              I recently completed the MERN stack (MongoDB, Express.js, React.js, Node.js) and am excited to advance to my third year of studies, where I'll focus more deeply on Data Science.
            </p>
            
            <p className="text-lg text-portfolio-text-secondary animate-item">
              When I'm not studying or coding, I enjoy exploring new technologies, contributing to open-source projects, and expanding my knowledge in the ever-evolving tech landscape.
            </p>
            
            <div className="flex space-x-4 animate-item">
              <a 
                href="https://github.com/Keerthithev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <Github size={18} />
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/keerthigan-t-225370251" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              {/* <a 
                href="#" 
                className="btn-outline flex items-center gap-2"
              >
                <FileText size={18} />
                Resume
              </a> */}
            </div>
          </div>
          
          <div className="about-image relative">
            <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-portfolio-card p-1 rounded-xl border border-portfolio-accent/10">
                <img 
                  src="images/nothernuni.jpg"
                  alt="Northern University" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-portfolio-card px-5 py-3 rounded-lg shadow-lg border border-portfolio-primary/10">
              <p className="text-lg font-semibold">Northern Uni | SLIIT</p>
              <p className="text-sm text-portfolio-text-secondary">Data Science Student</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;