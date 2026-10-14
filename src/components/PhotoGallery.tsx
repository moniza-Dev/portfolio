import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GlareHover } from './GlareHover';
import { SectionHeader } from './SectionHeader';

/* ---------- Edit these: photos live in /public/gallery ---------- */
interface Photo {
  src: string;
  label: string; // small uppercase line
  caption: string;
  className: string; // grid placement on desktop
  position?: string; // object-position, so the faces stay in frame
}

const photos: Photo[] = [
  {
    src: '/gallery/istad-top-team.jpg',
    label: 'Golden Award',
    caption: 'Top 1 Project Team, ISTAD',
    className: 'md:col-span-2 md:row-span-2',
    position: 'center 40%',
  },
  {
    src: '/gallery/istad-golden-award.jpg',
    label: 'Award Ceremony',
    caption: 'Graduation & Digital Innovation Project Competition',
    className: '',
    position: 'center 45%',
  },
  {
    src: '/gallery/istad-certificate.jpg',
    label: 'Certificate',
    caption: 'Web Development Fundamentals',
    className: '',
    position: 'center 40%',
  },
  {
    src: '/gallery/istad-group.jpg',
    label: 'With my team and lecturers',
    caption: 'Phnom Penh, October 3, 2026',
    className: 'md:col-span-2',
    position: 'center 35%',
  },
  {
    src: '/gallery/istad-classroom.jpg',
    label: 'Studying',
    caption: 'Learning at ISTAD',
    className: '',
    position: 'center 50%',
  },
];

export const PhotoGallery: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  // Close the enlarged photo with Escape and lock page scroll while it is open
  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close]);

  return (
    <div className="mt-24 sm:mt-32">
      <SectionHeader
        eyebrow="Achievements & Moments"
        title="Beyond the Code"
        subtitle="Milestones from my journey at ISTAD, from classroom to the stage."
      />

      <div className="grid auto-rows-[15rem] grid-cols-1 gap-4 md:auto-rows-[16rem] md:grid-cols-3">
        {photos.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
            aria-label={`Enlarge photo: ${p.label}`}
            className={`group relative block text-left ${p.className}`}
          >
            <GlareHover className="h-full rounded-2xl border border-text-secondary/10 bg-thirdary transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-text-primary/50">
              <img
                src={p.src}
                alt={`${p.label}: ${p.caption}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: p.position }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 pt-16">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">{p.label}</p>
                <p className="mt-1 text-sm font-bold leading-snug text-white md:text-base">{p.caption}</p>
              </div>
            </GlareHover>
          </motion.button>
        ))}
      </div>

      {/* Enlarged photo */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={photos[active].label}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-background/90 p-4 backdrop-blur-md sm:p-10"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close photo"
              className="absolute right-5 top-5 rounded-full border border-text-secondary/20 bg-background p-2 text-text-primary transition-colors hover:bg-thirdary"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={photos[active].src}
              alt={`${photos[active].label}: ${photos[active].caption}`}
              onClick={e => e.stopPropagation()}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-4 text-center text-sm font-bold text-text-primary">
              {photos[active].label}
              <span className="font-medium text-text-secondary"> · {photos[active].caption}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
