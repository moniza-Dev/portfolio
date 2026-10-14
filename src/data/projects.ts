export type ProjectCategory = 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile & AI' | 'Cloud & Systems';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  category: ProjectCategory;
  featured?: boolean;
  tags: string[];
  features?: string[]; // shown in "Key Features" on the detail page
  image?: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: 'nexa',
    title: 'NEXA',
    subtitle: 'Lost & Found and Q&A Platform',
    description:
      'Nexa brings people together to find what\'s lost and answers to what they\'re wondering. Report lost or found items, ask questions, and share helpful knowledge with your community.',
    metric: 'Lost & Found · Q&A · Community',
    category: 'Frontend',
    featured: true,
    tags: ['React', 'JavaScript', 'CSS', 'HTML', 'REST API'],
    features: [
      'Report lost or found items.',
      'Ask questions and get answers from the community.',
      'Share helpful knowledge with other people.',
    ],
    image: '/nexa-preview.png',
    github: 'https://github.com/moniza-Dev/NEXA-project',
    // Add `live: 'https://...'` once the project is deployed.
  },
  {
    id: 'movie-search-engine',
    title: 'Movie Search Engine',
    subtitle: 'Java console app connected with TMDB API',
    description:
      'A Java console app that searches movies through the TMDB API. Browse paginated results with ratings and YouTube trailer links, then open a detail view with runtime, budget, genres, and country of origin.',
    metric: 'TMDB API · Pagination · Trailer links',
    category: 'Backend',
    tags: ['Java', 'Gradle', 'TMDB API', 'HTTP Client', 'JSON Parsing'],
    features: [
      'Search movies through the TMDB API.',
      'Browse paginated results with ratings.',
      'Open YouTube trailer links for each movie.',
      'Detail view with runtime, budget, genres, and country of origin.',
    ],
    // Put movie-search-preview.png in your portfolio's public/ folder.
    image: '/movie-search-preview.png',
    github: 'https://github.com/moniza-Dev/Movie_Search_Engine',
  },
];