
import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  created_at: string;
}

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.github.com/users/Keerthithev/repos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub repositories');
        }
        
        const data: Repository[] = await response.json();
        // Filter out forked repositories and sort by most recent
        const filteredRepos = data
          .filter(repo => !repo.description?.includes('forked'))
          .sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        
        setRepos(filteredRepos.slice(0, 6)); // Get the 6 most recent repos
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError('Failed to load projects. Please try again later.');
        
        // Add fallback repos if GitHub API fails
        setRepos(fallbackRepos);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRepos();
  }, []);

  useEffect(() => {
    if (sectionRef.current && !isLoading) {
      // Animate the title
      gsap.from('.projects-title', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Animate the project cards
      gsap.from('.project-card', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.projects-container',
          start: 'top 80%',
        },
      });
    }
  }, [isLoading]);

  // Fallback repository data in case GitHub API fails
  const fallbackRepos: Repository[] = [
    {
      id: 1,
      name: 'data-science-portfolio',
      description: 'Collection of my data science projects and analyses.',
      html_url: 'https://github.com/Keerthithev/data-science-portfolio',
      homepage: null,
      language: 'Python',
      stargazers_count: 5,
      topics: ['data-science', 'machine-learning', 'analysis'],
      created_at: '2023-10-15T10:20:30Z',
    },
    {
      id: 2,
      name: 'task-manager-app',
      description: 'A full-stack MERN application for managing tasks and projects.',
      html_url: 'https://github.com/Keerthithev/task-manager-app',
      homepage: 'https://task-manager-demo.netlify.app',
      language: 'JavaScript',
      stargazers_count: 3,
      topics: ['react', 'nodejs', 'mongodb', 'express'],
      created_at: '2023-08-20T15:30:45Z',
    },
    {
      id: 3,
      name: 'personal-portfolio',
      description: 'My personal portfolio website built with React and Tailwind CSS.',
      html_url: 'https://github.com/Keerthithev/personal-portfolio',
      homepage: 'https://keerthigan.dev',
      language: 'TypeScript',
      stargazers_count: 4,
      topics: ['portfolio', 'react', 'tailwindcss'],
      created_at: '2023-07-05T08:15:30Z',
    },
    {
      id: 4,
      name: 'university-dashboard',
      description: 'Data visualization dashboard for university course data.',
      html_url: 'https://github.com/Keerthithev/university-dashboard',
      homepage: null,
      language: 'JavaScript',
      stargazers_count: 2,
      topics: ['data-visualization', 'd3js', 'dashboard'],
      created_at: '2023-06-10T14:25:30Z',
    },
    {
      id: 5,
      name: 'ml-algorithms',
      description: 'Implementation of various machine learning algorithms from scratch.',
      html_url: 'https://github.com/Keerthithev/ml-algorithms',
      homepage: null,
      language: 'Python',
      stargazers_count: 6,
      topics: ['machine-learning', 'algorithms', 'data-science'],
      created_at: '2023-04-18T11:45:20Z',
    },
    {
      id: 6,
      name: 'weather-forecast-app',
      description: 'A weather forecasting app using external API and React.',
      html_url: 'https://github.com/Keerthithev/weather-forecast-app',
      homepage: 'https://weather-forecast-demo.netlify.app',
      language: 'JavaScript',
      stargazers_count: 3,
      topics: ['react', 'api', 'weather-app'],
      created_at: '2023-03-25T09:30:40Z',
    },
  ];

  // Helper function to determine language color
  const getLanguageColor = (language: string | null) => {
    const colors: {[key: string]: string} = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Java: '#b07219',
    };
    return language && colors[language] ? colors[language] : '#8b5cf6';
  };

  // Get a suitable placeholder image URL based on the repository name/description
  const getProjectImage = (repo: Repository) => {
    const topics = repo.topics || [];
    const name = repo.name.toLowerCase();
    const desc = repo.description?.toLowerCase() || '';
    
    if (topics.includes('data-science') || name.includes('data') || desc.includes('data')) {
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71';
    } else if (topics.includes('web') || name.includes('app') || name.includes('website')) {
      return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b';
    } else if (topics.includes('machine-learning') || desc.includes('machine learning')) {
      return 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5';
    } else {
      return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6';
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="blur-light top-1/3 right-1/4" style={{ opacity: 0.05 }}></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title projects-title">My Projects</h2>
        <p className="text-portfolio-text-secondary mb-10 max-w-2xl">
          A showcase of my recent projects, mostly pulled directly from my GitHub repositories.
          These represent my interests in data science and web development.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-blue"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-8">
            {error}
          </div>
        ) : (
          <div className="projects-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <Card key={repo.id} className="project-card bg-portfolio-card border-portfolio-blue/10 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={getProjectImage(repo)} 
                    alt={repo.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold line-clamp-1">{repo.name.replace(/-/g, ' ')}</h3>
                    <div className="flex items-center">
                      <span 
                        className="inline-block w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      ></span>
                      <span className="text-xs text-portfolio-text-secondary">{repo.language || 'Various'}</span>
                    </div>
                  </div>
                  
                  <p className="text-portfolio-text-secondary text-sm mb-4 h-12 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {(repo.topics || []).slice(0, 3).map((topic, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-portfolio-blue/10 text-portfolio-blue rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-portfolio-text-secondary">
                      <svg className="w-4 h-4 mr-1 text-portfolio-blue" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                      </svg>
                      {repo.stargazers_count}
                    </div>
                    
                    <div className="flex gap-3">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-portfolio-text-secondary hover:text-portfolio-blue transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github size={18} />
                      </a>
                      {repo.homepage && (
                        <a 
                          href={repo.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-portfolio-text-secondary hover:text-portfolio-blue transition-colors"
                          aria-label="Live demo"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/Keerthithev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Projects <Github size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
