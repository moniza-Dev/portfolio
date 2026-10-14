import React, { useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { TechIcon } from './TechIcon';

interface IconCloudProps {
  /** Names must match keys supported by TechIcon */
  names: string[];
  radius?: number;
  className?: string;
}

/**
 * Icons spread evenly over a sphere that turns slowly by itself.
 * Move the cursor over it to steer the rotation. Icons at the back are
 * smaller and fainter, so it reads as 3D.
 */
export const IconCloud: React.FC<IconCloudProps> = ({ names, radius = 100, className = '' }) => {
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  // Fibonacci sphere: evenly distributed points
  const base = useMemo(
    () =>
      names.map((_, i) => {
        const n = names.length;
        const phi = Math.acos(-1 + (2 * i + 1) / n);
        const theta = Math.sqrt(n * Math.PI) * phi;
        return {
          x: Math.cos(theta) * Math.sin(phi),
          y: Math.sin(theta) * Math.sin(phi),
          z: Math.cos(phi),
        };
      }),
    [names],
  );

  useEffect(() => {
    let rx = 0.35;
    let ry = 0;
    let vx = 0.002;
    let vy = 0.006;
    let raf = 0;

    const draw = () => {
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);

      base.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y1 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 = back, 1 = front

        el.style.transform = `translate3d(${x1 * radius}px, ${y1 * radius}px, 0) scale(${0.55 + depth * 0.6})`;
        el.style.opacity = String(0.3 + depth * 0.7);
        el.style.zIndex = String(Math.round(depth * 100));
      });
    };

    draw();
    if (reduce) return undefined;

    const tick = () => {
      let targetVx = 0.002;
      let targetVy = 0.006;
      const p = pointer.current;
      if (p) {
        targetVy = p.x * 0.035;
        targetVx = -p.y * 0.035;
      }
      vx += (targetVx - vx) * 0.06;
      vy += (targetVy - vy) * 0.06;
      rx += vx;
      ry += vy;
      draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [base, radius, reduce]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    pointer.current = {
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    };
  };

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label="Technologies I use"
      onPointerMove={onMove}
      onPointerLeave={() => {
        pointer.current = null;
      }}
      className={`relative h-full w-full ${className}`}
    >
      {names.map((name, i) => (
        <span
          key={name}
          ref={el => {
            itemRefs.current[i] = el;
          }}
          title={name}
          className="absolute left-1/2 top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-xl p-1.5 will-change-transform dark:bg-white/90"
        >
          <TechIcon name={name} className="h-full w-full" />
        </span>
      ))}
    </div>
  );
};