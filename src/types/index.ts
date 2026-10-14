export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  skills: string[];
  department: string;
}

export type TechCategory = 'All' | 'Frontend' | 'Tools' | 'Backend/Data';

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Tools' | 'Backend/Data';
  level: string;
  color: string; // brand accent color for glow effect
  description: string;
  iconSvg?: string;
}
