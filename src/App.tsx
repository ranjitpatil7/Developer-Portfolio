import { useState, useEffect } from 'react';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ParticleNetwork } from './components/ParticleNetwork';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoHighlights } from './components/BentoHighlights';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsVault } from './components/SkillsVault';
import { AchievementsVault } from './components/AchievementsVault';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { RecruiterModal } from './components/RecruiterModal';
import { TerminalDrawer } from './components/TerminalDrawer';
import { ToastContainer } from './components/Toast';
import type { ToastMessage } from './components/Toast';

export function App() {
  const [activeLens, setActiveLens] = useState<'all' | 'fullstack' | 'java'>('all');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeModalType, setResumeModalType] = useState<'fullstack' | 'java'>('fullstack');
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);

  // Resume Modal Opener
  const handleOpenResumeModal = (type: 'fullstack' | 'java' = 'fullstack') => {
    setResumeModalType(type);
    setResumeModalOpen(true);
  };

  const handleOpenRecruiterModal = () => {
    setRecruiterModalOpen(true);
  };

  // Toast trigger helper
  const triggerToast = (text: string, type: 'success' | 'info' | 'alert' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut: Ctrl+K / Cmd+K to open Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Intersection Observer for active section in navbar
  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06060b] text-neutral-100 selection:bg-emerald-500/20 selection:text-emerald-300 font-sans antialiased overflow-x-hidden">
      {/* Interactive Cursor Spotlight & Ambient Background Gradients */}
      <CursorSpotlight />

      {/* Cybernetic Particle Network Background */}
      <ParticleNetwork />

      {/* Floating Glassmorphic Pill Navbar */}
      <Navbar
        activeSection={activeSection}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        triggerToast={triggerToast}
        onOpenResumeModal={handleOpenResumeModal}
      />

      <main className="relative z-10">
        {/* Hero Section with Role Lens Switcher & Live Architecture Visualizer */}
        <Hero
          activeLens={activeLens}
          setActiveLens={setActiveLens}
          triggerToast={triggerToast}
          onOpenResumeModal={handleOpenResumeModal}
          onOpenRecruiterModal={handleOpenRecruiterModal}
        />

        {/* 3D Bento Grid: About, Internship Status, Patent/Paper, Infinite Marquee, Academics */}
        <BentoHighlights />

        {/* Featured Projects Showcase with Animated Architecture Pipelines */}
        <ProjectsShowcase
          activeLens={activeLens}
        />

        {/* Experience & Education Scroll-Driven Timeline */}
        <ExperienceTimeline />

        {/* Technical Skills Vault with Lens Highlighting */}
        <SkillsVault activeLens={activeLens} />

        {/* Certifications, Publications & Achievements */}
        <AchievementsVault />

        {/* Contact Section with Live FormSubmit Delivery & WhatsApp */}
        <ContactSection triggerToast={triggerToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Developer CLI Shell Drawer */}
      <TerminalDrawer
        onOpenResumeModal={handleOpenResumeModal}
        triggerToast={triggerToast}
      />

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        activeLens={activeLens}
        setActiveLens={setActiveLens}
        triggerToast={triggerToast}
        onOpenResumeModal={handleOpenResumeModal}
        onOpenRecruiterModal={handleOpenRecruiterModal}
      />

      {/* In-Browser PDF Resume Preview Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        initialType={resumeModalType}
        triggerToast={triggerToast}
      />

      {/* Recruiter 30-Second Executive Summary Modal */}
      <RecruiterModal
        isOpen={recruiterModalOpen}
        onClose={() => setRecruiterModalOpen(false)}
        onOpenResumeModal={handleOpenResumeModal}
        triggerToast={triggerToast}
      />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
