import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string; // small uppercase label above the title
  title: string;
  subtitle?: string;
  className?: string;
}

/** Eyebrow label + big bold tracking-tight title, left aligned. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, subtitle, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className={`mb-14 w-full text-left md:mb-20 ${className}`}
  >
    <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-text-secondary">{eyebrow}</h2>
    <h3 className="text-4xl font-black tracking-tighter text-text-primary md:text-5xl lg:text-6xl">{title}</h3>
    {subtitle && (
      <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">{subtitle}</p>
    )}
  </motion.div>
);
