import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';
import { projects, type ProjectCategory } from '../data/projects';
import { SectionHeader } from '../components/SectionHeader';
import { GlareHover } from '../components/GlareHover';

const FILTERS: Array<'All' | ProjectCategory> = ['All', 'Full Stack', 'Frontend', 'Mobile & AI', 'Cloud & Systems'];

const Github: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Projects: React.FC<{ onOpenProject: (id: string) => void }> = ({ onOpenProject }) => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [query, setQuery] = useState('');
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(p => {
      const byCat = filter === 'All' || p.category === filter;
      const bySearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      return byCat && bySearch;
    });
  }, [filter, query]);

  return (
    <section id="projects" className="pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <SectionHeader eyebrow="Selected Work" title="My Projects" subtitle="Selected work I've built and contributed to." />

        {/* Filters + search */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {filter === f && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    filter === f ? 'text-white dark:text-neutral-900' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {f}
                </span>
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 h-9 px-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 sm:w-56">
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </label>
        </div>

        {/* Project list */}
        <motion.div layout className="mt-8 space-y-4">
          <AnimatePresence mode="popLayout">
            {visible.map(p => {
              return (
                <motion.article
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 rounded-2xl border border-text-secondary/10 bg-thirdary/20 p-4 md:p-5 hover:-translate-y-1.5 hover:border-text-primary/50 hover:bg-thirdary/50 transition-all duration-300"
                >
                  {/* Image */}
                  {p.image && !failed[p.id] ? (
                    <GlareHover className="md:col-span-4 rounded-xl bg-thirdary">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        onError={() => setFailed(f => ({ ...f, [p.id]: true }))}
                        className="w-full h-40 md:h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </GlareHover>
                  ) : (
                    <div className="md:col-span-4 flex items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-800/50 h-40 md:h-full">
                      <span className="text-3xl font-bold text-neutral-300 dark:text-neutral-600">{p.title[0]}</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className={`${p.image || !failed[p.id] ? 'md:col-span-8' : 'md:col-span-8'} flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
                        <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {p.category}
                        </span>
                        {p.featured && (
                          <span className="text-[11px] font-medium text-text-primary uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{p.subtitle}</p>
                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">{p.description}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.tags.map(t => (
                          <span
                            key={t}
                            className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {p.live && p.live !== '#' && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live demo`} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => onOpenProject(p.id)}
                        className="ml-auto text-xs font-bold text-text-secondary hover:text-text-primary transition-colors"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-neutral-400 text-sm">No projects match your search.</p>
        )}
      </div>
    </section>
  );
};