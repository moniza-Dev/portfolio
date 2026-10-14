import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    className="text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary rounded-full"
  >
    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
  </button>
);
