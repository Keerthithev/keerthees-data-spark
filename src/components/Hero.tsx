
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (heroRef.current && textRef.current) {
      const tl = gsap.timeline();
      
      const contentCard = heroRef.current.querySelector('.hero-content');
tl.from(contentCard, {
  opacity: 1,
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
      
      // Parallax effect on background
      gsap.to('.hero-bg', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
    
    // Typing animation
    const text = "Junior Full Stack Developer | Data Science Track";
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
    <section 
      id="home" 
      ref={heroRef} 
      className="min-h-screen flex items-center pt-20 relative overflow-hidden"
    >
      {/* Background with parallax effect */}
      <div className="hero-bg absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Background" 
          className="w-full h-full object-cover opacity-"
        />
      </div>
      
      {/* Glass-like overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-portfolio-background/40 z-0"></div>
      
      {/* Animated gradient blobs in cool blue tones */}
      <div className="blur-light top-20 left-20 floating-effect" style={{background: 'rgba(59, 130, 246, 0.2)', width: '400px', height: '400px'}}></div>
      <div className="blur-light bottom-10 right-10 floating-effect" style={{background: 'rgba(99, 102, 241, 0.2)', width: '350px', height: '350px'}}></div>
      <div className="blur-light top-1/3 right-1/4 floating-effect" style={{background: 'rgba(79, 70, 229, 0.15)', width: '300px', height: '300px'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            {/* Glass card for text content */}
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl">
              <h2 ref={textRef} className="mb-6">
                <span className="text-lg font-medium text-blue-400 block mb-3 animate-text">Hello, I'm</span>
                <span className="text-5xl md:text-7xl font-bold block mb-4 animate-text bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">Keerthigan T.</span>
                <div className="flex items-center">
                  <span className="text-xl md:text-2xl text-portfolio-text-secondary font-medium animate-text typewriter">
                    <span className="typewriter-text"></span>
                  </span>
                </div>
              </h2>
              
              <p className="text-lg text-portfolio-text-primary mb-8 max-w-lg animate-text">
                Passionate about Data Science and MERN stack development. Currently pursuing my degree at Northern Uni, Sliit, with plans to specialize in Data Science after completing my second-year exams.
              </p>
              
              <div className="flex flex-wrap gap-4 hero-cta">
                <a href="#projects" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2 transform transition-all hover:scale-105">
                  View Projects <ArrowRight size={18} />
                </a>
                <a href="/resume.pdf" download className="px-6 py-3 border border-blue-500/30 text-portfolio-text-primary rounded-lg font-medium transition-all hover:bg-blue-500/10 flex items-center gap-2 transform transition-all hover:scale-105">
                  Download Resume <Download size={18} />
                </a>
                <a href="#contact" className="px-6 py-3 border border-indigo-500/30 text-portfolio-text-primary rounded-lg font-medium transition-all hover:bg-indigo-500/10 transform transition-all hover:scale-105">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Profile image with enhanced effects */}
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-1 animate-float shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-portfolio-background flex items-center justify-center border-4 border-white/10 backdrop-filter backdrop-blur-sm">
                  <img 
                    src="/images/myimg.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-500 animate-pulse opacity-70"></div>
                <div className="absolute -bottom-2 left-12 w-8 h-8 rounded-full bg-indigo-500 animate-pulse opacity-70 delay-300"></div>
                <div className="absolute top-1/2 -right-6 w-10 h-10 rounded-full bg-purple-500 animate-pulse opacity-70 delay-700"></div>
              </div>
              
              {/* Status badge with glass effect */}
              <div className="absolute -bottom-4 -right-4 backdrop-blur-md bg-white/10 px-6 py-3 rounded-lg shadow-xl border border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                  <span className="font-medium text-white">Ready for new opportunities</span>
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