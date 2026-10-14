import React, { useCallback, useEffect, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { Heart } from 'lucide-react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const LENGTH = 1600;

const randomString = (len: number) =>
  Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');

interface HoverRevealCardProps {
  href: string;
  title: string;
  hint: string;
  className?: string;
}

/**
 * A card whose surface is hidden until you hover it.
 * A gradient spot follows the cursor and reveals a field of random characters
 * (new characters on every move). A heart replaces the cursor inside the card.
 */
export const HoverRevealCard: React.FC<HoverRevealCardProps> = ({
  href,
  title,
  hint,
  className = '',
}) => {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [text, setText] = useState('');

  useEffect(() => {
    setText(randomString(LENGTH));
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
      if (!reduce) setText(randomString(LENGTH));
    },
    [mouseX, mouseY, reduce],
  );

  // The same mask is used by the gradient layer and the character layer
  const mask = useMotionTemplate`radial-gradient(190px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const maskStyle = { maskImage: mask, WebkitMaskImage: mask };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} ${hint}`}
      onPointerMove={onMove}
      className={`group/reveal relative block overflow-hidden rounded-2xl md:cursor-none ${className}`}
    >
      {/* Gradient revealed under the cursor */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 opacity-0 backdrop-blur-xl transition duration-500 group-hover/reveal:opacity-100"
        style={maskStyle}
      />

      {/* Random characters revealed under the cursor */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-500 group-hover/reveal:opacity-100"
        style={maskStyle}
      >
        <p className="absolute inset-0 h-full overflow-hidden break-words whitespace-pre-wrap font-mono text-xs font-bold leading-tight text-white dark:text-neutral-900">
          {text}
        </p>
      </motion.div>

      {/* Centered label */}
      <div className="relative z-10 flex h-full min-h-[10rem] items-center justify-center">
        <div className="relative flex h-28 w-44 items-center justify-center rounded-full">
          <div className="absolute inset-0 rounded-full bg-background/80 blur-md" />
          <div className="relative text-center">
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">{title}</p>
            <p className="mt-0.5 text-sm font-semibold text-neutral-600 dark:text-neutral-300">{hint}</p>
          </div>
        </div>
      </div>

      {/* Heart that follows the cursor */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 -ml-3 -mt-3 hidden opacity-0 transition-opacity duration-200 group-hover/reveal:opacity-100 md:block"
        style={{ x: mouseX, y: mouseY }}
      >
        <Heart className="h-6 w-6 fill-text-primary text-text-primary drop-shadow" />
      </motion.span>
    </a>
  );
};