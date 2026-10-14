import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Tilt3D } from './Tilt3D';

interface LanyardCardProps {
  /** Your profile photo (same src you use today) */
  src: string;
  alt?: string;
  /** Text printed on the strap */
  strapText?: string;
  className?: string;
}

/**
 * A photo ID card hanging from a black lanyard.
 * - sways gently by itself
 * - drag sideways and let go: it swings back like a real pendulum
 * - the card also tilts in 3D under the cursor (Tilt3D)
 */
export const LanyardCard: React.FC<LanyardCardProps> = ({
  src,
  alt = 'Profile photo',
  strapText = '3D Card',
  className = '',
}) => {
  const reduce = useReducedMotion();
  const dragging = useRef(false);
  const intro = useRef(true); // true while the drop-in + first swing plays
  const rootRef = useRef<HTMLDivElement>(null);

  // How far the strap must reach up so it is fixed to the very top of the page
  const [rise, setRise] = useState(0);
  const angleScale = useRef(1); // a longer strap needs smaller angles

  useLayoutEffect(() => {
    const measure = () => {
      const el = rootRef.current;
      const section = el?.closest('section');
      const wide = window.matchMedia('(min-width: 1024px)').matches; // side-by-side layout only
      if (!el || !section || !wide) {
        angleScale.current = 1;
        setRise(0);
        return;
      }
      const r = Math.max(0, Math.round(el.getBoundingClientRect().top - section.getBoundingClientRect().top));
      angleScale.current = 0.65;
      setRise(r);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // target angle -> spring gives the wobbly pendulum feel
  const target = useMotionValue(0);
  const rotate = useSpring(target, { stiffness: 55, damping: 3.5, mass: 1.2 });

  // Drop-in: the card falls from above, then gets a push left or right
  useEffect(() => {
    if (reduce) {
      intro.current = false;
      return undefined;
    }
    const side = Math.random() < 0.5 ? -1 : 1;
    const kick = window.setTimeout(() => {
      target.set(side * 28); // big first push (degrees)
      window.setTimeout(() => target.set(0), 140); // spring now swings back and forth
    }, 650);
    const done = window.setTimeout(() => {
      intro.current = false;
    }, 7000);
    return () => {
      window.clearTimeout(kick);
      window.clearTimeout(done);
    };
  }, [reduce, target]);

  // idle sway
  useAnimationFrame(t => {
    if (reduce || dragging.current || intro.current) return;
    target.set(Math.sin(t / 1500) * 2.4 * angleScale.current);
  });

  const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

  return (
    <div
      ref={rootRef}
      className={`relative mx-auto flex h-[640px] w-full max-w-[340px] items-start justify-center ${className}`}
    >
      {/* Falls in from above when the page opens */}
      <motion.div
        initial={reduce ? false : { y: -780 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 9, mass: 1.2 }}
        style={{ marginTop: -rise }}
      >
      {/* Everything swings from the top of the page */}
      <motion.div
        className="relative flex flex-col items-center"
        style={{ rotate, transformOrigin: '50% 0%', touchAction: 'pan-y' }}
        onPanStart={() => {
          dragging.current = true;
          intro.current = false;
        }}
        onPan={(_, info) => target.set(clamp(info.offset.x / 9, -28, 28) * angleScale.current)}
        onPanEnd={() => {
          dragging.current = false;
          target.set(0);
        }}
      >
        {/* Strap */}
        <div
          className="relative w-9 shrink-0 select-none overflow-hidden bg-neutral-950 shadow-md"
          style={{ height: 160 + rise }}
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 bottom-0 flex h-40 flex-col items-center justify-evenly py-3">
            {[0, 1].map(i => (
              <span
                key={i}
                className="text-[11px] font-semibold leading-none tracking-[0.2em] text-white/90 [writing-mode:vertical-rl]"
              >
                {strapText}
              </span>
            ))}
          </div>
          {/* subtle stitched edges */}
          <span className="absolute inset-y-0 left-1 w-px bg-white/15" />
          <span className="absolute inset-y-0 right-1 w-px bg-white/15" />
        </div>

        {/* Metal clip */}
        <div className="relative z-10 -mt-1 flex flex-col items-center" aria-hidden="true">
          <div className="h-3 w-12 rounded-b-md bg-gradient-to-b from-neutral-500 to-neutral-300 shadow" />
          <div className="-mt-0.5 h-5 w-4 rounded-b-full border-2 border-neutral-400 bg-transparent" />
        </div>

        {/* Card */}
        <Tilt3D className="-mt-3 w-[300px]" max={9} radius="rounded-[1.6rem]">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/40 bg-neutral-900 shadow-2xl ring-1 ring-black/10">
            {/* slot the clip goes through */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-3 z-10 h-2 w-14 -translate-x-1/2 rounded-full bg-neutral-950/80 shadow-inner"
            />
            <img
              src={src}
              alt={alt}
              draggable={false}
              className="block aspect-[3/4.1] w-full select-none object-cover"
            />
            {/* soft top/bottom shading so the slot and bar read well */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/20"
            />
          </div>
        </Tilt3D>
      </motion.div>
      </motion.div>
    </div>
  );
};