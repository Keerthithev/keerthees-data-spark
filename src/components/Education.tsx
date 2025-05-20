
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      // Animate the title
      gsap.from('.education-title', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Animate timeline
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
        },
      });

      // Animate the vertical line first
      timeline.from('.timeline-line', {
        height: 0,
        duration: 1.5,
        ease: 'power3.out',
      });

      // Then animate each timeline item
      timeline.from('.timeline-item', {
        opacity: 0,
        x: -50,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=1');

      // Animate bullets with delay
      timeline.from('.timeline-bullet', {
        scale: 0,
        stagger: 0.3,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=1.5');
    }
  }, []);

  const educationData = [
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      specialization: 'Specialization in Data Science',
      institution: 'Northern University',
      location: 'Jaffna, Sri Lanka',
      period: '2022 - Present',
      description: 'Currently in the second year, moving to the third year after completing upcoming examinations. Focusing on data science coursework with strong academic performance.',
      courses: ['Data Structures & Algorithms', 'Database Management', 'Statistics for Data Science', 'Web Development'],
    },
    {
      id: 2,
      degree: 'MERN Stack Development',
      institution: 'Self-Paced Learning',
      period: '2023',
      description: 'Completed comprehensive MERN stack development course covering MongoDB, Express.js, React.js, and Node.js. Built several full-stack applications as part of this learning.',
      courses: [],
    },
    {
      id: 3,
      degree: 'High School Diploma',
      institution: 'Central College',
      location: 'Jaffna, Sri Lanka',
      period: '2019 - 2021',
      description: 'Graduated with distinction in Mathematics and Science subjects. Participated in programming competitions and science exhibitions.',
      courses: [],
    },
  ];

  return (
    <section id="education" ref={sectionRef} className="py-20 relative bg-portfolio-background/50">
      <div className="blur-light top-1/4 left-1/4" style={{ opacity: 0.04 }}></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title education-title">Education & Training</h2>
        
        <div className="timeline relative mt-16 pl-8 md:pl-0">
          {/* Vertical timeline line */}
          <div className="timeline-line absolute left-0 md:left-1/2 top-0 w-1 bg-gradient-to-b from-portfolio-blue to-portfolio-accent h-full transform md:-translate-x-1/2"></div>
          
          {educationData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item relative mb-16 md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'
              }`}
            >
              {/* Timeline bullet */}
              <div className="timeline-bullet absolute -left-4 md:left-auto md:-right-4 top-0 w-8 h-8 rounded-full bg-portfolio-card border-4 border-portfolio-blue flex items-center justify-center z-10">
                <div className="w-2 h-2 bg-portfolio-accent rounded-full"></div>
              </div>
              
              {/* Timeline content */}
              <div className="card">
                <span className="inline-block text-sm text-portfolio-blue font-medium mb-2 px-3 py-1 bg-portfolio-blue/10 rounded-full">
                  {item.period}
                </span>
                <h3 className="text-xl font-bold mb-1">{item.degree}</h3>
                {item.specialization && (
                  <p className="text-portfolio-accent font-medium mb-2">{item.specialization}</p>
                )}
                <p className="text-lg mb-1">{item.institution}</p>
                {item.location && (
                  <p className="text-sm text-portfolio-text-secondary mb-4">{item.location}</p>
                )}
                <p className="text-portfolio-text-secondary mb-4">{item.description}</p>
                
                {item.courses && item.courses.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Courses</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.courses.map((course, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-2 py-1 bg-portfolio-card border border-portfolio-blue/30 rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 card">
          <h3 className="text-xl font-semibold mb-4">Additional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-portfolio-background/50 rounded-lg">
              <h4 className="font-medium">Data Science Fundamentals</h4>
              <p className="text-sm text-portfolio-text-secondary">Coursera, 2023</p>
            </div>
            <div className="p-4 bg-portfolio-background/50 rounded-lg">
              <h4 className="font-medium">Web Development Bootcamp</h4>
              <p className="text-sm text-portfolio-text-secondary">Udemy, 2023</p>
            </div>
            <div className="p-4 bg-portfolio-background/50 rounded-lg">
              <h4 className="font-medium">React.js Mastery</h4>
              <p className="text-sm text-portfolio-text-secondary">freeCodeCamp, 2022</p>
            </div>
            <div className="p-4 bg-portfolio-background/50 rounded-lg">
              <h4 className="font-medium">Python for Data Analysis</h4>
              <p className="text-sm text-portfolio-text-secondary">DataCamp, 2022</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
