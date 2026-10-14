import React, { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

/**
 * Background effect that follows the mouse:
 *  1. a soft neutral glow under the cursor
 *  2. a dot grid that lights up only around the cursor
 * It is a fixed, click-through layer (below the navbar), so it never blocks anything.
 * Disabled on touch devices and when the user prefers reduced motion.
 */
export const CursorGlow: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.5 });

  const glow = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgb(var(--text-primary) / 0.07), rgb(var(--text-primary) / 0.03) 45%, transparent 70%)`;
  const mask = useMotionTemplate`radial-gradient(200px circle at ${sx}px ${sy}px, black, transparent 70%)`;

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Soft glow */}
      <motion.div className="absolute inset-0" style={{ background: glow }} />

      {/* Dot grid revealed around the cursor */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--text-primary) / 0.35) 1.3px, transparent 1.3px)',
          backgroundSize: '22px 22px',
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </motion.div>
  );
};