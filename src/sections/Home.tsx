import React from 'react';
import type { ToastMessage } from '../components/Toast';
import { Hero } from './Hero';
import { Profile } from './Profile';
import { TechStack } from './TechStack';
import { Contact } from './Contact';

interface HomeProps {
  onNavigate: (id: string) => void;
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onAddToast }) => (
  <>
    <Hero onNavigate={onNavigate} />
    <Profile />
    <TechStack />
    <Contact onAddToast={onAddToast} />
  </>
);