import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Mode = 'default' | 'link' | 'text';
interface Ripple { id: number; x: number; y: number }

const INTERACTIVE = 'a, button, [role="button"], summary, select, label, .hoverable';
const TEXT_FIELDS = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]), textarea';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const hoveredEl = useRef<Element | null>(null);

  // Arrow follows tightly; the halo trails with a soft spring.
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const hx = useMotionValue(-100);
  const hy = useMotionValue(-100);
  const arrowX = useSpring(mx, { stiffness: 1000, damping: 45, mass: 0.2 });
  const arrowY = useSpring(my, { stiffness: 1000, damping: 45, mass: 0.2 });
  const haloX = useSpring(hx, { stiffness: 220, damping: 22, mass: 0.6 });
  const haloY = useSpring(hy, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return undefined;

    setEnabled(true);
    const style = document.createElement('style');
    style.textContent = 'html.custom-cursor, html.custom-cursor * { cursor: none !important; }';
    document.head.appendChild(style);
    document.documentElement.classList.add('custom-cursor');

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setVisible(true);
      mx.set(e.clientX);
      my.set(e.clientY);
      const el = hoveredEl.current;
      if (el && !el.matches(TEXT_FIELDS)) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        hx.set(cx + (e.clientX - cx) * 0.3);
        hy.set(cy + (e.clientY - cy) * 0.3);
      } else {
        hx.set(e.clientX);
        hy.set(e.clientY);
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const text = t?.closest(TEXT_FIELDS);
      const link = t?.closest(INTERACTIVE);
      hoveredEl.current = text || link || null;
      setMode(text ? 'text' : link ? 'link' : 'default');
    };

    const onDown = (e: PointerEvent) => {
      setPressed(true);
      const id = Date.now() + Math.random();
      setRipples(r => [...r, { id, x: e.clientX, y: e.clientY }]);
    };
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('custom-cursor');
      style.remove();
    };
  }, [mx, my, hx, hy]);

  if (!enabled) return null;

  const isLink = mode === 'link';
  const isText = mode === 'text';

  return (
    <>
      {/* Click ripples */}
      {ripples.map(r => (
        <motion.span
          key={r.id}
          aria-hidden="true"
          className="fixed z-[100] pointer-events-none w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-text-primary"
          style={{ left: r.x, top: r.y }}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          onAnimationComplete={() => setRipples(list => list.filter(x => x.id !== r.id))}
        />
      ))}

      {/* Soft trailing halo (no border, no blend mode) */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-0 h-0 z-[99] pointer-events-none flex items-center justify-center"
        style={{ x: haloX, y: haloY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="shrink-0 bg-text-primary"
          animate={{
            width: isText ? 3 : 34,
            height: isText ? 28 : 34,
            borderRadius: isText ? 4 : 999,
            scale: pressed ? 0.8 : isLink ? 1.6 : 1,
            opacity: isText ? 0.9 : isLink ? 0.28 : 0.16,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        />
      </motion.div>

      {/* Arrow pointer */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-0 h-0 z-[100] pointer-events-none"
        style={{ x: arrowX, y: arrowY }}
        animate={{ opacity: visible && !isText ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ marginLeft: -2, marginTop: -2, transformOrigin: '2px 2px', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.35))' }}
          animate={{ scale: pressed ? 0.85 : isLink ? 1.12 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <path
            d="M2 2 L2 18 L6.5 14 L9.5 21 L12.5 19.7 L9.5 12.8 L15.5 12.5 Z"
            fill={isLink ? '#7c3aed' : '#8b5cf6'}
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </>
  );
};