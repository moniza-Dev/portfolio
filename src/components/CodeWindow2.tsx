import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { projects } from '../data/projects';

/* ---------- Tiny syntax-highlight model ---------- */
type Seg = [string, string]; // [text, tailwind class]
type Line = Seg[];

const kw = (t: string): Seg => [t, 'text-violet-300'];
const key = (t: string): Seg => [t, 'text-amber-200'];
const str = (t: string): Seg => [JSON.stringify(t), 'text-emerald-300'];
const fn = (t: string): Seg => [t, 'text-sky-300'];
const pl = (t: string): Seg => [t, 'text-neutral-300'];

/* Short lines on purpose: every line stays readable next to the divider */
const profileLines: Line[] = [
  [kw('const '), fn('profile'), pl(' = {')],
  [pl('  '), key('name'), pl(': '), str('Cheat Chanmoniza'), pl(',')],
  [pl('  '), key('role'), pl(': '), str('Software Engineer'), pl(',')],
  [pl('  '), key('design'), pl(': '), str('UI/UX Designer'), pl(',')],
  [pl('  '), key('background'), pl(': '), str('Accounting'), pl(',')],
  [pl('  '), key('location'), pl(': '), str('Phnom Penh'), pl(',')],
  [pl('  '), key('stack'), pl(': ['), str('React'), pl(', '), str('TS'), pl('],')],
  [pl('  '), key('detailOriented'), pl(': '), kw('true'), pl(',')],
  [pl('  '), key('typeSafe'), pl(': '), kw('true'), pl(',')],
  [pl('  '), key('designsInFigma'), pl(': '), kw('true'), pl(',')],
  [pl('};')],
];

const shortTitle = (t: string) => t.split(' ').slice(0, 2).join(' ');

const projectLines: Line[] = [
  [kw('const '), fn('projects'), pl(' = [')],
  ...projects.slice(0, 4).map((p): Line => [pl('  '), str(shortTitle(p.title)), pl(',')]),
  [pl('];')],
];

const CodeLines: React.FC<{ lines: Line[]; gutter?: boolean }> = ({ lines, gutter = true }) => (
  <pre className="px-5 pb-5 pt-14 font-mono whitespace-pre select-none" style={{ fontSize: 'clamp(11px, calc((100cqw - 64px) / 24), 15px)' }}>
    {lines.map((line, i) => (
      <div key={i} className="flex" style={{ minHeight: '1.75em', lineHeight: 1.75 }}>
        {gutter && <span className="w-8 shrink-0 text-right pr-4 text-neutral-600">{i + 1}</span>}
        <code>
          {line.map(([t, c], j) => (
            <span key={j} className={c}>{t}</span>
          ))}
        </code>
      </div>
    ))}
  </pre>
);

const FileChip: React.FC<{ label: string; className?: string }> = ({ label, className = '' }) => (
  <span
    className={`absolute left-5 top-4 rounded-md px-2.5 py-1 font-mono text-[11px] tracking-wide ${className}`}
  >
    {label}
  </span>
);

/* ---------- Code window: divider follows the mouse + 3D tilt ---------- */
const DEFAULT_POS = 66;

interface CodeWindowProps {
  /** Show the "Move your mouse..." hint under the window */
  showHint?: boolean;
  className?: string;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({ showHint = true, className = '' }) => {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [value, setValue] = useState(DEFAULT_POS);

  // Divider position in %, with a spring so it glides toward the cursor
  const target = useMotionValue(DEFAULT_POS);
  const spring = useSpring(target, { stiffness: 140, damping: 22, mass: 0.6 });
  const pos = reduce ? target : spring;
  const clip = useTransform(pos, v => `inset(0 0 0 ${v}%)`);
  const left = useTransform(pos, v => `${v}%`);

  // The projects side starts exactly at the divider (so nothing overlaps)
  const width = useMotionValue(560);
  const shiftX = useTransform([pos, width], ([p, w]: number[]) => (p / 100) * w);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return undefined;
    width.set(el.clientWidth);
    const ro = new ResizeObserver(() => width.set(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const moveTo = useCallback(
    (clientX: number) => {
      const el = areaRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(95, Math.max(5, ((clientX - r.left) / r.width) * 100));
      target.set(p);
      setValue(Math.round(p));
    },
    [target],
  );

  const reset = useCallback(() => {
    target.set(DEFAULT_POS);
    setValue(DEFAULT_POS);
  }, [target]);

  // Touch / pen dragging via the handle
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragging.current) moveTo(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [moveTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      const p = Math.max(5, value - 5);
      target.set(p);
      setValue(p);
    }
    if (e.key === 'ArrowRight') {
      const p = Math.min(95, value + 5);
      target.set(p);
      setValue(p);
    }
  };

  // 3D tilt of the whole window
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });

  const onFrameMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onFrameLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className={className}>
      <motion.div
        ref={frameRef}
        onMouseMove={reduce ? undefined : onFrameMove}
        onMouseLeave={reduce ? undefined : onFrameLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
        className="rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-slate-200 to-slate-400 dark:from-neutral-700 dark:to-neutral-900 shadow-xl"
      >
        <div
          className="rounded-xl overflow-hidden bg-[#0f1117] shadow-2xl"
          style={reduce ? undefined : { transform: 'translateZ(28px)' }}
        >
          {/* Window chrome */}
          <div className="flex gap-1.5 px-4 py-3.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>

          {/* Code area */}
          <div
            ref={areaRef}
            onPointerMove={e => {
              if (e.pointerType === 'mouse') moveTo(e.clientX);
            }}
            onPointerLeave={e => {
              if (e.pointerType === 'mouse' && !dragging.current) reset();
            }}
            className="relative h-[24rem] overflow-hidden [container-type:inline-size]"
          >
            {/* Left: profile */}
            <div className="absolute inset-0">
              <FileChip label="profile.ts" className="bg-white/10 text-neutral-200" />
              <CodeLines lines={profileLines} />
            </div>

            {/* Right: projects (tinted, begins at the divider) */}
            <motion.div
              className="absolute inset-0 bg-[#121a33]"
              style={{ clipPath: clip }}
              aria-hidden="true"
            >
              <motion.div className="absolute inset-0" style={{ x: shiftX }}>
                <FileChip label="projects.ts" className="bg-violet-400/20 text-violet-200" />
                <CodeLines lines={projectLines} gutter={false} />
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="absolute top-0 bottom-0 w-px bg-violet-400/80 shadow-[0_0_16px_2px_rgba(167,139,250,0.5)]"
              style={{ left }}
            />
            <motion.div
              role="slider"
              tabIndex={0}
              aria-label="Compare profile and projects code"
              aria-valuemin={5}
              aria-valuemax={95}
              aria-valuenow={value}
              onPointerDown={e => {
                e.preventDefault();
                dragging.current = true;
              }}
              onKeyDown={onKeyDown}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-1/2 w-8 h-8 -mt-4 -ml-4 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              style={{ left }}
            >
              <span className="flex flex-col gap-0.5">
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {showHint && (
        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Move your mouse over the code to slide the divider
        </p>
      )}
    </div>
  );
};