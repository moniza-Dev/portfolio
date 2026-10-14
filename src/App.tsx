import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { Navbar, type Page } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';
import { CursorGlow } from './components/CursorGlow';
import { Toast, type ToastMessage } from './components/Toast';
import { Hero } from './sections/Hero';
import { Profile } from './sections/Profile';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { ProjectDetail } from './sections/ProjectDetail';
import { projects } from './data/projects';
import { Experience } from './sections/Experience';
import { TechStack } from './sections/TechStack';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

/* Tabs that are their own page. "home" and "about" live on the home page. */
const PAGE_TABS: Page[] = ['projects', 'experience', 'tech-stack', 'contact'];
const isPageTab = (id: string): id is Page => PAGE_TABS.includes(id as Page);

/* A project detail page lives at #project/<id> */
type AppPage = Page | 'project';

const getRoute = (): { page: AppPage; projectId: string } => {
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('project/')) return { page: 'project', projectId: decodeURIComponent(hash.slice(8)) };
  return { page: isPageTab(hash) ? hash : 'home', projectId: '' };
};

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [route, setRoute] = useState(getRoute);
  const { page, projectId } = route;
  const setPage = useCallback((p: Page) => setRoute({ page: p, projectId: '' }), []);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const pendingScroll = useRef<string | null>(null);

  /* ---------- Toasts (used by the Contact form) ---------- */
  const dismissToast = useCallback((id: string) => {
    setToasts(list => list.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts(list => [...list, { ...toast, id }]);
      window.setTimeout(() => dismissToast(id), 5000);
    },
    [dismissToast]
  );

  /* ---------- Navigation ---------- */
  const navigate = useCallback(
    (id: string) => {
      // Separate page tabs: Projects, Experience, Tech Stack, Contact
      if (isPageTab(id)) {
        window.history.replaceState(null, '', `#${id}`);
        setPage(id);
        window.scrollTo({ top: 0 });
        return;
      }
      // Coming back from a page tab to a home section (home / about)
      if (page !== 'home') {
        pendingScroll.current = id;
        window.history.replaceState(null, '', `#${id}`);
        setPage('home');
        window.scrollTo({ top: 0 });
        return;
      }
      // Already on home: smooth scroll
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    },
    [page, setPage]
  );

  const openProject = useCallback((id: string) => {
    window.location.hash = `project/${encodeURIComponent(id)}`;
  }, []);

  useEffect(() => {
    if (page === 'home' && pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => {
        if (id !== 'home') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [page]);

  // Browser back / forward buttons
  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'projects':
        return <div className="min-h-[80vh]"><Projects onOpenProject={openProject} /></div>;
      case 'project':
        return (
          <div className="min-h-[80vh]">
            <ProjectDetail project={projects.find(p => p.id === projectId)} onBack={() => navigate('projects')} />
          </div>
        );
      case 'experience':
        return <div className="min-h-[80vh]"><Experience /></div>;
      case 'tech-stack':
        return <div className="min-h-[80vh]"><TechStack /></div>;
      case 'contact':
        return <div className="min-h-[80vh]"><Contact onAddToast={addToast} /></div>;
      default:
        return (
          <>
            <Hero onNavigate={navigate} />
            <Profile />
            <About />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-text-primary">
      <PageLoader />

      {/* Full-page background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgb(var(--text-secondary) / 0.35) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Website content */}
      <div className="relative z-10">
        <ScrollProgress />
        <CustomCursor />
        <CursorGlow />

        <Navbar theme={theme} onToggleTheme={toggleTheme} page={page === 'project' ? 'projects' : page} onNavigate={navigate} />

        <motion.main
          key={page + projectId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderPage()}
        </motion.main>

        <Footer />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </div>
    </div>
  );
};

export default App;