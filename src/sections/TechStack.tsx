import React from 'react';
import { motion } from 'framer-motion';
import { techStackData } from '../data/techStack';
import { TechIcon } from '../components/TechIcon';
import { SectionHeader } from '../components/SectionHeader';
import type { TechItem } from '../types';

const groups: { title: TechItem['category']; description: string }[] = [
  { title: 'Frontend', description: 'Frameworks, libraries and styling for building interactive interfaces.' },
  { title: 'Backend/Data', description: 'Languages and databases behind the interface.' },
  { title: 'Tools', description: 'Design, version control and deployment tools.' },
];

export const TechStack: React.FC = () => (
  <section id="tech-stack" className="relative bg-background pb-24 pt-36">
    <div className="mx-auto max-w-6xl px-6 md:px-12">
      <SectionHeader eyebrow="Skills & Tools" title="My Tech Stack" />

      <div className="flex flex-col gap-16">
        {groups.map((group, gi) => {
          const items = techStackData.filter(t => t.category === group.title);
          return (
            <div key={group.title} className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: gi * 0.1 }}
                className="md:w-1/3"
              >
                <h4 className="mb-2 text-2xl font-black tracking-tight text-text-primary">
                  {group.title === 'Backend/Data' ? 'Backend & Data' : group.title}
                </h4>
                <p className="text-sm font-medium text-text-secondary">{group.description}</p>
              </motion.div>

              <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:w-2/3 md:grid-cols-4">
                {items.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                    title={tech.description}
                    className="group flex h-full flex-col items-center justify-center rounded-2xl border border-text-secondary/10 bg-thirdary/20 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-text-primary/50 hover:bg-thirdary/50"
                  >
                    <div className="pointer-events-none mb-4 flex h-12 w-12 items-center justify-center">
                      <TechIcon name={tech.name} className="h-full w-full" />
                    </div>
                    <span className="text-center text-sm font-bold text-text-primary">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
