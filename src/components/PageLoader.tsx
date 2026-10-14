import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Full-screen intro that slides up and blurs away after ~2s. */
export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 2000);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
        >
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text-primary/10 blur-[100px]" />

          <div className="relative flex h-16 items-center justify-center overflow-hidden">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="text-4xl font-black tracking-tighter text-text-primary md:text-5xl"
            >
              Chanmoniza<span className="text-text-secondary">.</span>
            </motion.div>
          </div>

          <div className="relative mt-2 flex h-8 items-center justify-center overflow-hidden">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="text-sm font-bold uppercase tracking-[0.3em] text-text-secondary"
            >
              Portfolio Loading
            </motion.div>
          </div>

          <div className="relative mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-text-secondary/20 md:w-64">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-y-0 left-0 w-full rounded-full bg-text-primary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
