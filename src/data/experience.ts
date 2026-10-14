import type { ExperienceItem } from '../types';

export const experiences: ExperienceItem[] = [
  {
    id: 'air-cambodia',
    company: 'Air Cambodia',
    role: 'Accounting Trainee',
    period: 'Oct 2025 – Apr 2026',
    location: 'Phnom Penh, Cambodia',
    type: 'Internship / Apprenticeship',
    department: 'Financial Operations & Data Analysis',
    summary: 'Supported the finance team by preparing accounting documents and entering selected records into the accounting system.',
    achievements: [
      'Prepared and organized accounting documents into boxes for filing and archiving.',
      'Selected documents and entered their data into the accounting system accurately.',
      'Applied the strict verification habits from accounting into software development — ensuring form validation, type safety, and clean data flow.'
    ],
    skills: ['Document Preparation', 'Data Entry', 'Record Keeping', 'Attention to Detail']
  },
  {
    id: 'independent-engineering',
    company: 'Independent Projects & Open Source',
    role: 'Software Engineer & UI/UX Designer',
    period: '2024 – Present',
    location: 'Phnom Penh, Cambodia',
    type: 'Freelance & Personal Projects',
    department: 'Web Engineering',
    summary: 'Designing and building responsive, type-safe web applications using React, TypeScript, and Tailwind CSS.',
    achievements: [
      'Developed responsive full-stack applications with React, TypeScript, and modern component systems.',
      'Designed UI/UX wireframes and prototypes in Figma with consistent spacing scales, typography, and accessibility.',
      'Built performant client forms with React Hook Form and Zod to validate input data reliably.'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'PostgreSQL', 'Git']
  }
];