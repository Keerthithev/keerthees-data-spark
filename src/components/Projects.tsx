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
  fork: boolean;
}

const fallbackRepos: Repository[] = [
  {
    id: 1,
    name: 'Portfolio-Site',
    description: 'My personal portfolio website built with React and Tailwind CSS.',
    html_url: 'https://github.com/Keerthithev/Portfolio-Site',
    homepage: 'https://keerthidev.vercel.app',
    language: 'TypeScript',
    stargazers_count: 12,
    topics: ['portfolio', 'react', 'tailwind'],
    created_at: '2023-08-01T00:00:00Z',
    fork: false,
  },
  {
    id: 2,
    name: 'Expense-Tracker-App',
    description: 'A Kotlin-based expense tracker with SharedPreferences.',
    html_url: 'https://github.com/Keerthithev/Expense-Tracker-App',
    homepage: '',
    language: 'Kotlin',
    stargazers_count: 8,
    topics: ['android', 'kotlin', 'mobile'],
    created_at: '2023-10-15T00:00:00Z',
    fork: false,
  },
  {
    id: 3,
    name: 'Vehicle-Rental-System',
    description: 'Admin dashboard for vehicle rentals with JARVIS-inspired UI.',
    html_url: 'https://github.com/Keerthithev/Vehicle-Rental-System',
    homepage: '',
    language: 'JavaScript',
    stargazers_count: 5,
    topics: ['mern', 'admin', 'dashboard'],
    created_at: '2024-01-10T00:00:00Z',
    fork: false,
  },
];

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
          throw new Error('GitHub API response not ok');
        }

        const data: Repository[] = await response.json();
        const filteredRepos = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setRepos(filteredRepos.slice(0, 6));
      } catch (err) {
        console.error('GitHub fetch error:', err);
        setError('Failed to load live GitHub projects. Showing fallback data.');
        setRepos(fallbackRepos);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    if (sectionRef.current && !isLoading) {
      gsap.from('.projects-title', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

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

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Java: '#b07219',
      Kotlin: '#A97BFF',
    };
    return language && colors[language] ? colors[language] : '#8b5cf6';
  };

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
          A showcase of my personal projects and collaborative work,
          reflecting my journey as a MERN stack developer and future data scientist.
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-accent"></div>
          </div>
        ) : (
          <>
            {error && (
              <div className="text-center text-yellow-400 mb-4">{error}</div>
            )}
            <div className="projects-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <Card key={repo.id} className="project-card bg-portfolio-card border-portfolio-accent/10 overflow-hidden">
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
                          className="text-xs px-2 py-1 bg-portfolio-accent/10 text-portfolio-accent rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-portfolio-text-secondary">
                        <svg className="w-4 h-4 mr-1 text-portfolio-accent" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                        </svg>
                        {repo.stargazers_count}
                      </div>

                      <div className="flex gap-3">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-portfolio-text-secondary hover:text-portfolio-accent transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github size={18} />
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-portfolio-text-secondary hover:text-portfolio-accent transition-colors"
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
          </>
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
