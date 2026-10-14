import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useScrollSpy } from '../hooks/useScrollSpy';

export type Page = 'home' | 'projects' | 'experience' | 'tech-stack' | 'contact';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  page: Page;
  onNavigate: (id: string) => void;
}

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Tech Stack', href: '#tech-stack', id: 'tech-stack' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

/* Only these sections exist on the home page, so only they are scroll-spied */
const homeSectionIds = ['home', 'about'];

const Github: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const GITHUB_URL = 'https://github.com/moniza-Dev';

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, page, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const spyId = useScrollSpy(homeSectionIds, 120);
  const activeId = page === 'home' ? spyId || 'home' : page;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href.replace('#', ''));
  };

  return (
    <header className="fixed left-0 right-0 top-4 z-40 flex w-full justify-center px-4 pointer-events-none md:top-6">
      <div className="pointer-events-auto relative w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`relative flex items-center justify-between rounded-full border border-text-secondary/20 bg-background/80 px-5 py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 md:px-8 ${
            isScrolled ? 'md:py-2' : 'md:py-3'
          }`}
        >
          {/* Typographic logo */}
          <a
            href="#home"
            onClick={e => handleNavClick(e, '#home')}
            aria-label="Cheat Chanmoniza - Home"
            className="rounded-lg text-xl font-black tracking-tighter text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary md:text-2xl"
          >
            CHANMONIZA.
          </a>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main Navigation">
            {navItems.map(item => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`whitespace-nowrap text-sm tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'font-bold text-text-primary'
                      : 'font-medium text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden text-text-secondary transition-colors hover:text-text-primary sm:inline-flex"
            >
              <Github className="h-5 w-5" />
            </a>

            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-secondary transition-colors hover:text-text-primary lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ transformOrigin: 'top right' }}
              className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-text-secondary/10 bg-background/95 p-6 shadow-xl backdrop-blur-md lg:hidden"
            >
              <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
                {navItems.map(item => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={e => handleNavClick(e, item.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`text-sm transition-colors duration-200 hover:text-text-primary ${
                        isActive ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
