
import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  const [state, handleSubmit] = useForm("mdkgjlez");
  
  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    }
  }, [state.succeeded, toast]);

  useEffect(() => {
    if (sectionRef.current) {
      // Animate the title
      gsap.from('.contact-title', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Animate contact info
      gsap.from('.contact-info', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.contact-container',
          start: 'top 75%',
        },
      });

      // Animate contact form with slight delay
      gsap.from('.contact-form', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.contact-container',
          start: 'top 75%',
        },
      });

      // Animate the links and social icons
      gsap.from('.social-link', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 85%',
        },
      });
    }
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      <div className="blur-light bottom-1/4 right-1/4" style={{ opacity: 0.05 }}></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title contact-title">Get In Touch</h2>
        <p className="text-portfolio-text-secondary mb-10 max-w-2xl">
          Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
        </p>
        
        <div className="contact-container grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="contact-info space-y-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-portfolio-accent/10 flex items-center justify-center">
                    <Mail className="text-portfolio-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-portfolio-text-secondary">Email</p>
                    <p className="font-medium">keerthigan.t@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-portfolio-accent/10 flex items-center justify-center">
                    <Phone className="text-portfolio-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-portfolio-text-secondary">Phone</p>
                    <p className="font-medium">+94 77 123 4567</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4">Connect with me</h4>
                <div className="social-links flex space-x-4">
                  <a 
                    href="https://github.com/Keerthithev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link w-12 h-12 rounded-full bg-portfolio-accent/10 hover:bg-portfolio-accent/20 flex items-center justify-center transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="text-portfolio-accent" size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/keerthigan-t-225370251" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link w-12 h-12 rounded-full bg-portfolio-accent/10 hover:bg-portfolio-accent/20 flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="text-portfolio-accent" size={20} />
                  </a>
                  <a 
                    href="mailto:keerthigan.t@example.com" 
                    className="social-link w-12 h-12 rounded-full bg-portfolio-accent/10 hover:bg-portfolio-accent/20 flex items-center justify-center transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="text-portfolio-accent" size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Current Status</h3>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <p>Available for part-time opportunities</p>
              </div>
              <p className="text-portfolio-text-secondary">
                Currently focusing on my studies in data science, but open to freelance projects 
                and part-time roles in web development and data science.
              </p>
            </div>
          </div>
          
          {/* Contact Form - Using Formspree */}
          <div className="contact-form card">
            <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
            
            {state.succeeded ? (
              <div className="bg-green-500/10 text-green-500 p-6 rounded-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    className="w-full px-4 py-2 bg-portfolio-background border border-portfolio-accent/20 focus:border-portfolio-accent rounded-lg outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full px-4 py-2 bg-portfolio-background border border-portfolio-accent/20 focus:border-portfolio-accent rounded-lg outline-none transition-colors"
                    placeholder="Your email"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    className="w-full px-4 py-2 bg-portfolio-background border border-portfolio-accent/20 focus:border-portfolio-accent rounded-lg outline-none transition-colors"
                    placeholder="Subject of your message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    className="w-full px-4 py-2 bg-portfolio-background border border-portfolio-accent/20 focus:border-portfolio-accent rounded-lg outline-none transition-colors min-h-[150px]"
                    placeholder="Your message"
                  ></textarea>
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={state.submitting}
                >
                  {state.submitting ? (
                    <>Sending... <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
