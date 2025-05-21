
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, Book } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from('.education-title', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.education-card', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.education-container',
          start: 'top 80%',
        },
      });
    }
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-20 relative">
      <div className="blur-light top-1/4 left-1/4" style={{ opacity: 0.05, background: 'rgba(230, 76, 102, 0.3)' }}></div>
      <div className="container mx-auto px-4">
        <h2 className="section-title education-title">Education</h2>
        <p className="text-portfolio-text-secondary mb-10 max-w-2xl">
          My academic journey and qualifications that shape my knowledge and expertise.
        </p>

        <div className="education-container relative">
          {/* Timeline vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-portfolio-primary/50 to-transparent h-full transform -translate-x-1/2 hidden md:block"></div>

          {/* 1. BSc in  Information Technology*/}
          <div className="education-card relative mb-12 md:w-1/2 md:pr-12 pl-10 md:pl-0 md:ml-auto">
            <div className="hidden md:block absolute top-0 right-0 w-4 h-4 rounded-full bg-portfolio-primary transform translate-x-1/2"></div>
            <div className="md:hidden absolute top-0 left-0 w-4 h-4 rounded-full bg-portfolio-primary transform -translate-x-1/2"></div>

            <div className="card relative">
              <div className="absolute -top-6 -right-6 md:-left-6 md:-right-auto w-12 h-12 rounded-full bg-portfolio-primary/10 flex items-center justify-center">
                <GraduationCap className="text-portfolio-primary" />
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold">Bachelor of Science in Information Technology</h3>
                <h4 className="text-lg text-portfolio-accent">Northern University, Sri Lanka</h4>

                <div className="flex flex-wrap mt-3 gap-4 text-portfolio-text-secondary">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>2023 - Present (2nd Year, 2nd Semester)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span>Sri Lanka</span>
                  </div>
                </div>

                <p className="mt-4 text-portfolio-text-secondary">
                  Currently pursuing my degree in Information Technology. Planning to specialize in Data Science in my 3rd year (starting next month).
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-portfolio-primary mt-1.5 mr-2"></div>
                    <p>Currently finishing 2nd year studies before specialization</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-portfolio-primary mt-1.5 mr-2"></div>
                    <p>Interested in exploring Data Science as my specialization path</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. MERN Stack Certification */}
          <div className="education-card relative mb-12 md:w-1/2 md:pr-12 pl-10 md:pl-0">
            <div className="hidden md:block absolute top-0 left-0 w-4 h-4 rounded-full bg-portfolio-accent transform -translate-x-1/2"></div>
            <div className="md:hidden absolute top-0 left-0 w-4 h-4 rounded-full bg-portfolio-accent transform -translate-x-1/2"></div>

            <div className="card relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-portfolio-accent/10 flex items-center justify-center">
                <Book className="text-portfolio-accent" />
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold">MERN Stack Development</h3>
                <h4 className="text-lg text-portfolio-secondary">Self-Study & Projects</h4>

                <div className="flex flex-wrap mt-3 gap-4 text-portfolio-text-secondary">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>2023</span>
                  </div>
                </div>

                <p className="mt-4 text-portfolio-text-secondary">
                  Recently completed comprehensive MERN stack (MongoDB, Express.js, React, Node.js) 
                  development training, building full-stack web applications.
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-portfolio-accent mt-1.5 mr-2"></div>
                    <p>Built several projects using the MERN technology stack</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-portfolio-accent mt-1.5 mr-2"></div>
                    <p>Continuously learning and applying web development best practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. A/L Education */}
          <div className="education-card relative mb-12 md:w-1/2 md:pr-12 pl-10 md:pl-0 md:ml-auto">
            <div className="hidden md:block absolute top-0 right-0 w-4 h-4 rounded-full bg-portfolio-secondary transform translate-x-1/2"></div>
            <div className="md:hidden absolute top-0 left-0 w-4 h-4 rounded-full bg-portfolio-secondary transform -translate-x-1/2"></div>

            <div className="card relative">
              <div className="absolute -top-6 -right-6 md:-left-6 md:-right-auto w-12 h-12 rounded-full bg-portfolio-secondary/10 flex items-center justify-center">
                <GraduationCap className="text-portfolio-secondary" />
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold">Advanced Level Secondary Education</h3>
                <h4 className="text-lg text-portfolio-secondary">Jaffna Hindu College</h4>

                <div className="flex flex-wrap mt-3 gap-4 text-portfolio-text-secondary">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>2013 - 2021</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span>Jaffna, Sri Lanka</span>
                  </div>
                </div>

                <p className="mt-4 text-portfolio-text-secondary">
                  Completed secondary education with a focus on mathematics stream, building a solid foundation for higher studies.
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-portfolio-secondary mt-1.5 mr-2"></div>
                    <p>Studied in Mathematics stream and achieved 3C grades</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-portfolio-secondary mt-1.5 mr-2"></div>
                    <p>Developed strong analytical and problem-solving skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;