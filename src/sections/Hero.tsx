import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { LanyardCard } from '../components/LanyardCard';

/* ---------- Edit this: the same photo path your Profile section uses ---------- */
const PROFILE_PHOTO = '/profile.jpg';
const CV_FILE = '/Cheat-Chanmoniza-Portfolio.pdf';
const CV_DOWNLOAD_NAME = 'Cheat-Chanmoniza-Portfolio.pdf'; // name when downloaded

/* ---------- Typewriter: types a word, holds, deletes it, then types the next one (loops forever) ---------- */
const ROLES = ['Software Engineer', 'UI/UX Designer'];

const LoopingTypewriter: React.FC<{ words: string[] }> = ({ words }) => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return undefined;
    const word = words[index];
    let delay = deleting ? 35 : 70;

    if (!deleting && count === word.length) delay = 1600; // hold the full word
    else if (deleting && count === 0) delay = 350; // short pause before the next word
    else if (count === 0 && !deleting && index === 0) delay = 2300; // wait for the page loader on first run

    const id = window.setTimeout(() => {
      if (!deleting && count < word.length) setCount(count + 1);
      else if (!deleting) setDeleting(true);
      else if (count > 0) setCount(count - 1);
      else {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      }
    }, delay);
    return () => window.clearTimeout(id);
  }, [count, deleting, index, words, reduce]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');
  const shown = reduce ? words[0] : words[index].slice(0, count);

  return (
    <>
      <span className="sr-only">{words.join(' and ')}</span>
      <span aria-hidden="true" className="relative inline-block">
        {/* invisible copy reserves the widest word so the layout never jumps */}
        <span className="invisible">{longest}</span>
        <span className="absolute inset-0 whitespace-nowrap">
          {shown}
          {!reduce && <span className="ml-0.5 -mb-1 inline-block h-[1.1em] w-0.5 animate-cursor bg-current" />}
        </span>
      </span>
    </>
  );
};

/* ---------- Small pieces ---------- */
const Corner: React.FC<{ className: string }> = ({ className }) => (
  <span className={`absolute h-2.5 w-2.5 rounded-[3px] bg-text-secondary/40 ${className}`} />
);

const FloatingChip: React.FC<{ className: string; delay?: number; children: React.ReactNode }> = ({
  className,
  delay = 0,
  children,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`absolute hidden rounded-lg border border-text-secondary/20 bg-background/90 px-4 py-2 text-lg font-semibold leading-normal tracking-normal text-text-primary shadow-lg backdrop-blur-md sm:block ${className}`}
    >
      {children}
    </motion.span>
  );
};

/* ---------- Section ---------- */
export const Hero: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => (
  <section
    id="home"
    className="relative flex min-h-screen items-center overflow-hidden bg-background pb-16 pt-28"
  >
    <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 2.1 }}
        >
          <span className="inline-flex items-center rounded-full border border-text-secondary/20 bg-thirdary/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-text-secondary">
            Welcome to my portfolio
          </span>

          <h1 className="relative mt-10 text-4xl font-black leading-[1.2] tracking-tighter text-text-primary sm:text-5xl lg:text-7xl">
            <FloatingChip className="sm:-top-8 sm:left-24">UI Magic</FloatingChip>
            <FloatingChip delay={1} className="sm:left-64 sm:top-4">Clean Code</FloatingChip>

            <span className="block">Hi, I&apos;m</span>
            <span className="mt-2 flex flex-wrap items-center gap-x-4">
              <span className="relative inline-block whitespace-nowrap rounded-md bg-thirdary px-3 sm:px-4">
                <span className="bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                  Chanmoniza
                </span>
                <Corner className="-left-1.5 -top-1.5" />
                <Corner className="-right-1.5 -top-1.5" />
                <Corner className="-bottom-1.5 -left-1.5" />
                <Corner className="-bottom-1.5 -right-1.5" />
              </span>
            </span>
          </h1>

          <div className="mt-8 text-xl font-bold tracking-tight text-text-primary md:text-2xl lg:text-3xl">
            <LoopingTypewriter words={ROLES} />
          </div>

          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-text-secondary md:text-lg">
            Combining financial precision with modern frontend development.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => onNavigate('projects')}
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-text-primary px-8 py-4 text-sm font-bold text-background transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] md:text-base"
            >
              Explore Work
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href={CV_FILE}
              download={CV_DOWNLOAD_NAME}
              className="group inline-flex items-center justify-center gap-3 rounded-xl border-2 border-text-secondary/20 bg-background/50 px-8 py-4 text-sm font-bold text-text-primary shadow-[0_4px_10px_rgb(0,0,0,0.03)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-text-primary hover:bg-thirdary/40 md:text-base"
            >
              Download CV
              <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </motion.div>

        {/* Right: hanging 3D card (your photo) */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 2.1 }}
        >
          <LanyardCard src={PROFILE_PHOTO} alt="Cheat Chanmoniza" strapText="3D Card" />
          <p className="mt-2 text-center text-xs font-bold uppercase tracking-widest text-text-secondary">
            Drag the card and let it swing
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);
