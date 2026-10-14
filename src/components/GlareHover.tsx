import React, { useRef } from 'react';

interface GlareHoverProps {
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  className?: string;
}

/** A light streak sweeps across the element on hover. Wrap any card or button. */
export const GlareHover: React.FC<GlareHoverProps> = ({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.35,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  className = '',
}) => {
  const overlay = useRef<HTMLDivElement | null>(null);

  const hex = glareColor.replace('#', '');
  const rgba = /^[\dA-Fa-f]{6}$/.test(hex)
    ? `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}, ${glareOpacity})`
    : glareColor;

  const sweep = (to: string) => {
    const el = overlay.current;
    if (!el) return;
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = to;
  };

  const enter = () => {
    const el = overlay.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%, 0 0';
    // force reflow so the reset applies before the sweep starts
    void el.offsetWidth;
    sweep('100% 100%, 0 0');
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={enter}
      onMouseLeave={() => sweep('-100% -100%, 0 0')}
    >
      <div
        ref={overlay}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `linear-gradient(${glareAngle}deg, hsla(0,0%,0%,0) 60%, ${rgba} 70%, hsla(0,0%,0%,0) 100%)`,
          backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '-100% -100%, 0 0',
        }}
      />
      {children}
    </div>
  );
};
