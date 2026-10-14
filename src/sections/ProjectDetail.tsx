import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Code2, ExternalLink, Layers, Star } from 'lucide-react';
import type { Project } from '../data/projects';
import { GlareHover } from '../components/GlareHover';

const Github: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ProjectDetailProps {
  project: Project | undefined;
  onBack: () => void;
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
});

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (!project) {
    return (
      <section className="pb-24 pt-40">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="text-lg font-medium text-text-secondary">This project could not be found.</p>
          <button
            onClick={onBack}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-text-secondary/20 px-5 py-2.5 text-sm font-bold hover:bg-thirdary/50"
          >
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </button>
        </div>
      </section>
    );
  }

  const hasLive = !!project.live && project.live !== '#';
  const features = project.features?.length ? project.features : project.metric.split('·').map(f => f.trim());

  return (
    <section className="pb-24 pt-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Back + breadcrumb */}
        <motion.div {...fade()} className="mb-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-text-secondary/20 bg-thirdary/30 px-4 py-2 text-sm font-bold text-text-primary transition-all hover:-translate-x-0.5 hover:border-text-primary/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-text-secondary">
            <button onClick={onBack} className="transition-colors hover:text-text-primary">
              Projects
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-text-primary">{project.title}</span>
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div>
            <motion.h1
              {...fade(0.05)}
              className="text-4xl font-black tracking-tighter text-text-primary md:text-5xl lg:text-6xl"
            >
              {project.title}
            </motion.h1>
            <motion.div {...fade(0.1)} className="mt-4 h-1 w-16 rounded-full bg-text-primary" />

            <motion.p {...fade(0.15)} className="mt-6 text-sm font-bold uppercase tracking-widest text-text-secondary">
              {project.category} &middot; {project.subtitle}
            </motion.p>
            <motion.p {...fade(0.2)} className="mt-5 text-base font-medium leading-relaxed text-text-secondary">
              {project.description}
            </motion.p>

            {/* Stats */}
            <motion.div {...fade(0.25)} className="mt-8 grid grid-cols-2 gap-4">
              {[
                { Icon: Code2, value: project.tags.length, label: 'Total Technologies' },
                { Icon: Layers, value: features.length, label: 'Key Features' },
              ].map(({ Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-text-secondary/10 bg-thirdary/20 p-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-text-primary text-background">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-2xl font-black leading-none text-text-primary">{value}</p>
                    <p className="mt-1 text-xs font-medium text-text-secondary">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap gap-4">
              {hasLive && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-text-primary px-6 py-3 text-sm font-bold text-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-1 ${
                    hasLive
                      ? 'border-2 border-text-secondary/20 bg-background/50 text-text-primary hover:border-text-primary hover:bg-thirdary/40'
                      : 'bg-text-primary text-background hover:shadow-lg'
                  }`}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </motion.div>

            {/* Technologies */}
            <motion.div {...fade(0.35)} className="mt-10">
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-text-primary">
                <Code2 className="h-5 w-5 text-text-secondary" />
                Technologies Used
              </h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {project.tags.map(t => (
                  <span
                    key={t}
                    className="rounded-lg border border-text-secondary/10 bg-thirdary px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <motion.div {...fade(0.15)}>
              <GlareHover className="rounded-2xl border border-text-secondary/10 bg-thirdary/30">
                {project.image && !imageFailed ? (
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    onError={() => setImageFailed(true)}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center">
                    <span className="text-6xl font-black text-text-secondary/30">{project.title[0]}</span>
                  </div>
                )}
              </GlareHover>
            </motion.div>

            <motion.div
              {...fade(0.25)}
              className="rounded-2xl border border-text-secondary/10 bg-thirdary/20 p-6 md:p-8"
            >
              <h2 className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-text-primary">
                <Star className="h-5 w-5" />
                Key Features
              </h2>
              <ul className="mt-5 space-y-4">
                {features.map(f => (
                  <li key={f} className="flex gap-3 text-sm font-medium leading-relaxed text-text-secondary">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
