import React from 'react';

const links = [
  { label: 'Telegram', href: 'https://t.me/chanmoniza_cheat' },
  { label: 'GitHub', href: 'https://github.com/moniza-Dev' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mo-nizachan-a400aa438' },
  { label: 'Email', href: 'mailto:moniza195@gmail.com' },
];

export const Footer: React.FC = () => (
  <footer className="mt-16 w-full border-t border-text-secondary/10 bg-background py-8">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-12">
      <div className="text-center md:text-left">
        <p className="text-sm font-medium text-text-secondary">
          &copy; {new Date().getFullYear()} Cheat Chanmoniza. All rights reserved.
        </p>
        <p className="mt-1 text-xs font-medium text-text-secondary/70">
          Built with React &amp; Tailwind CSS &middot; Phnom Penh, Cambodia
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {links.map(l => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest text-text-secondary transition-colors hover:text-text-primary"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);
