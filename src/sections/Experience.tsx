import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { experiences } from '../data/experience';
import { SectionHeader } from '../components/SectionHeader';

// Newest first: the year of the start date decides the order
const startYear = (period: string) => Number(period.match(/\d{4}/)?.[0] ?? 0);
const list = [...experiences].sort((a, b) => startYear(b.period) - startYear(a.period));

export const Experience: React.FC = () => (
  <section id="experience" className="relative bg-background pb-24 pt-36">
    <div className="mx-auto max-w-6xl px-6 md:px-12">
      <SectionHeader
        eyebrow="Career Path"
        title="Work Experience"
        subtitle="Accounting-trained precision, applied to building clean and type-safe web interfaces."
      />

      {/* Hovering one row dims and blurs the others */}
      <div className="group/list flex flex-col">
        {list.map((exp, index) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, y: 40, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group/item relative grid grid-cols-1 gap-4 rounded-2xl border border-transparent p-6 transition-all duration-500 hover:border-text-secondary/10 hover:bg-text-secondary/5 hover:!opacity-100 hover:!blur-none hover:shadow-lg group-hover/list:opacity-40 group-hover/list:blur-[2px] md:grid-cols-4 md:gap-8 md:p-8"
          >
            {/* Left: date */}
            <div className="pt-1 md:col-span-1 md:pt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">{exp.period}</span>
              <span className="mt-3 flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                <MapPin className="h-3.5 w-3.5" />
                {exp.location}
              </span>
            </div>

            {/* Right: details */}
            <div className="flex flex-col md:col-span-3">
              <h4 className="mb-1 text-2xl font-bold tracking-tight text-text-primary">{exp.role}</h4>
              <h5 className="mb-6 text-sm font-bold uppercase tracking-wide text-text-secondary">{exp.company}</h5>

              <p className="mb-4 text-base font-medium leading-relaxed text-text-secondary">{exp.summary}</p>

              <ul className="mb-6 space-y-2">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium leading-relaxed text-text-secondary">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map(skill => (
                  <span
                    key={skill}
                    className="rounded-lg border border-text-secondary/10 bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-text-primary transition-colors duration-300 md:bg-thirdary md:group-hover/item:bg-background"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
