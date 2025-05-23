import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const skillsData = {
    programmingLanguages: [
      { name: 'C', proficiency: 85 },
      { name: 'C++', proficiency: 85 },
      { name: 'Java', proficiency: 80 },
      { name: 'JavaScript', proficiency: 80 },
      { name: 'TypeScript', proficiency: 70 },
      { name: 'Python', proficiency: 45 },
      { name: 'HTML & CSS', proficiency: 90 },
    ],
    frameworksAndLibraries: [
      { name: 'React', proficiency: 80 },
      { name: 'Node.js', proficiency: 75 },
      { name: 'Express', proficiency: 75 },
      { name: 'MongoDB', proficiency: 90 },
    ],
    dataScience: [
      { name: 'Data Analysis', proficiency: 0 },
      { name: 'Machine Learning', proficiency: 0 },
      { name: 'Statistics', proficiency: 90 },
      { name: 'SQL', proficiency: 90 },
    ],
    toolsAndPlatforms: [
      { name: 'Git & GitHub', proficiency: 85 },
      { name: 'VS Code', proficiency: 90 },
      { name: 'Postman', proficiency: 85 },
    ],
  };

  useEffect(() => {
    if (sectionRef.current) {
      // Animate title and category headings
      gsap.from('.skills-title, .skills-category', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Animate skill bars with stagger
      gsap.from('.skill-item', {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Animate progress bars
      gsap.from('.progress-bar', {
        width: 0,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative bg-portfolio-background/50">
      <div className="blur-light bottom-10 left-1/4" style={{ opacity: 0.04, background: 'rgba(230, 76, 102, 0.3)' }}></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title skills-title">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="card">
              <h3 className="text-xl font-semibold mb-6 gradient-text skills-category capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
              
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-2 bg-portfolio-background rounded-full">
                      <div 
                        className="progress-bar h-full rounded-full" 
                        style={{ 
                          width: `${skill.proficiency}%`, 
                          background: `linear-gradient(to right, ${
                            skill.proficiency > 80 ? '#e64c66' : '#f39c12'
                          }, ${
                            skill.proficiency > 60 ? '#f39c12' : '#2ecc71'
                          })`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-14 card">
          <h3 className="text-xl font-semibold mb-6 gradient-text">Other Skills</h3>
          <div className="flex flex-wrap gap-3">
            {[
              'RESTful API', 'Responsive Design', 'UI/UX Design', 'Agile Methodology',
              'Tailwind CSS', 'Data Visualization', 'Problem Solving', 'Team Collaboration'
            ].map((skill, index) => (
              <span key={index} className="skill-pill">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;