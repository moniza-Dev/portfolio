import React, { useEffect, useRef } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { Briefcase, GraduationCap, Mail, Rocket, User } from 'lucide-react';
import { CodeWindow } from '../components/CodeWindow2';
import { projects } from '../data/projects';
import { techStackData } from '../data/techStack';

/* Brand icons were removed from newer lucide-react versions, so they are inline SVGs here */
const Github: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const Linkedin: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ---------- Edit these ---------- */
const socials = [
  { label: 'GitHub', href: 'https://github.com/moniza-Dev', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mo-nizachan-a400aa438', Icon: Linkedin },
  { label: 'Email', href: 'https://mail.google.com/mail/?view=cm&to=moniza195@gmail.com', Icon: Mail },
];

const expertise = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind CSS', color: '#38BDF8' },
  { name: 'Framer Motion', color: '#EC4899' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Git', color: '#F05032' },
];

const stats = [
  { value: 1, suffix: '+', label: 'Year in accounting' },
  { value: projects.length, suffix: '', label: 'Projects built' },
  { value: techStackData.length, suffix: '', label: 'Technologies' },
];

const journey = [
  { when: '2024', title: 'Started building', text: 'Web apps with React and Tailwind', Icon: Rocket },
  { when: 'Oct 2025 – Apr 2026', title: 'Accounting Trainee', text: 'Air Cambodia · data entry and records', Icon: Briefcase },
  { when: 'Now', title: 'IT Engineering, Year 3', text: 'Royal University of Phnom Penh', Icon: GraduationCap },
];

/* ---------- Animation variants ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const pop = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

/* ---------- Number that counts up when it scrolls into view ---------- */
const CountUp: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${to}${suffix}`;
      return undefined;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: v => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, reduce]);

  return <span ref={ref}>0{suffix}</span>;
};

/* ---------- Profile card ---------- */
const ProfileCard: React.FC = () => (
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    className="h-full rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm p-6 sm:p-9"
  >
    {/* Name + socials */}
    <motion.div
      variants={item}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-5"
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-11 h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200">
          <User className="w-5 h-5" />
        </span>
        <div>
          <p className="text-lg font-semibold text-neutral-900 dark:text-white">Cheat Chanmoniza</p>
          <p className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Software Engineer &amp; UI/UX Designer
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {socials.map(({ label, href, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center justify-center w-11 h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>
    </motion.div>

    {/* Headline */}
    <motion.h2
      variants={item}
      className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-text-primary leading-tight"
    >
      Accounting precision, applied to{' '}
      <span className="bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
        frontend craftsmanship.
      </span>
    </motion.h2>
    <motion.p
      variants={item}
      className="mt-4 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl"
    >
      I come from accounting and business data analysis, so I build with strict logical precision and a
      database-minded way of thinking. I care about interfaces that are fast, type-safe, and visually polished.
    </motion.p>

    {/* Numbers */}
    <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map(({ value, suffix, label }) => (
        <motion.div
          key={label}
          variants={item}
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-3 py-4 text-center"
        >
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            <CountUp to={value} suffix={suffix} />
          </p>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-snug">{label}</p>
        </motion.div>
      ))}
    </div>

    {/* Expertise */}
    <motion.h3 variants={item} className="mt-8 text-lg font-semibold text-neutral-900 dark:text-white">
      Expertise
    </motion.h3>
    <div className="mt-3 flex flex-wrap gap-2.5">
      {expertise.map(({ name, color }) => (
        <motion.span
          key={name}
          variants={pop}
          whileHover={{ y: -3, scale: 1.06 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 cursor-default"
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
          {name}
        </motion.span>
      ))}
    </div>

    {/* Journey */}
    <motion.h3 variants={item} className="mt-8 text-lg font-semibold text-neutral-900 dark:text-white">
      My journey
    </motion.h3>
    <div className="relative mt-5 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
      <span
        aria-hidden="true"
        className="hidden sm:block absolute left-0 right-0 top-[7px] h-px bg-text-secondary/30"
      />
      {journey.map(({ when, title, text, Icon }) => (
        <motion.div key={title} variants={item} whileHover={{ y: -4 }} className="relative sm:pt-6">
          <span
            aria-hidden="true"
            className="hidden sm:block absolute left-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-text-primary bg-background"
          />
          <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">{when}</p>
          <div className="mt-2 flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-300" />
            <div>
              <p className="font-semibold text-neutral-900 dark:text-white leading-snug">{title}</p>
              <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400 leading-snug">{text}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ---------- Section ---------- */
export const Profile: React.FC = () => (
  <section id="profile" className="py-16 sm:py-24 relative bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-center gap-4"
        >
          {/* Code card (has its own 3D tilt + sliding divider) */}
          <CodeWindow showHint={false} />
        </motion.div>

        <div className="lg:col-span-7">
          <ProfileCard />
        </div>
      </div>
    </div>
  </section>
);