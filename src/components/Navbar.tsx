
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      // Determine active section based on scroll position
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.clientHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      // Add shadow to navbar after scrolling 
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed w-full z-50 transition-all duration-300 py-4',
        scrolled ? 'bg-portfolio-background/80 backdrop-blur shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold gradient-text">Keerthigan</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'nav-link',
                activeSection === item.href.substring(1) && 'active'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-portfolio-text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'fixed top-[72px] right-0 w-full bg-portfolio-background border-t border-portfolio-blue/10 transition-all duration-300 ease-in-out md:hidden',
          isMenuOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-4 invisible'
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'py-2 px-4 rounded-lg hover:bg-portfolio-card transition-colors',
                  activeSection === item.href.substring(1) 
                    ? 'bg-portfolio-card text-portfolio-blue' 
                    : 'text-portfolio-text-secondary'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
