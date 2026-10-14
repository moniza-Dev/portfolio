import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const FACES = [
  'rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)',
  'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)',
];

const Cube: React.FC<{ size: number; duration: number; className: string }> = ({ size, duration, className }) => {
  const reduce = useReducedMotion();
  return (
    <div className={`absolute ${className}`} style={{ width: size, height: size, perspective: 700 }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', rotateX: 25, rotateY: 35 }}
        animate={reduce ? undefined : { rotateX: [25, 385], rotateY: [35, 395] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {FACES.map(f => (
          <div
            key={f}
            className="absolute inset-0 border border-text-secondary/30 bg-text-secondary/5"
            style={{ transform: `${f} translateZ(${size / 2}px)` }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const Ring: React.FC<{ size: number; className: string }> = ({ size, className }) => {
  const reduce = useReducedMotion();
  return (
    <div className={`absolute ${className}`} style={{ width: size, height: size, perspective: 700 }}>
      <motion.div
        className="w-full h-full rounded-full border-[6px] border-text-secondary/30"
        style={{ rotateX: 65 }}
        animate={reduce ? undefined : { rotateZ: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export const FloatingShapes: React.FC = () => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
    <Cube size={84} duration={26} className="top-28 right-[6%] hidden md:block" />
    <Cube size={44} duration={18} className="bottom-20 left-[5%]" />
    <Cube size={28} duration={12} className="top-1/3 left-[46%] hidden lg:block" />
    <Ring size={120} className="bottom-24 right-[28%] hidden md:block" />
  </div>
);