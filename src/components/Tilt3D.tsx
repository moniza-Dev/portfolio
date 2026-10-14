import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
  glare?: boolean;
  radius?: string;
}

/** Pointer-driven perspective tilt. Children can use translateZ for depth. */
export const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  className = '',
  max = 10,
  glare = true,
  radius = 'rounded-3xl',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareBg = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.16), transparent 55%)`
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full will-change-transform"
      >
        {children}
        {glare && !reduce && (
          <motion.div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${radius}`}
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
};