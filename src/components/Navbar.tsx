import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileDown,
  Command,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface NavbarProps {
  activeSection: string;
  onOpenCommandPalette: () => void;
  triggerToast: (msg: string) => void;
  onOpenResumeModal?: (type: 'fullstack' | 'java') => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenCommandPalette,
  triggerToast,
  onOpenResumeModal,
}) => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 pb-2 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 py-2.5 rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d0e17]/85 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-[#0d0e17]/60 backdrop-blur-xl border border-white/8'
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#root"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group pl-2"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px] flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
            <div className="w-full h-full bg-[#080911] rounded-[7px] flex items-center justify-center">
              <span className="font-mono font-bold text-xs bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                RP
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              Ranjit Patil
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              CS &bull; Honors AI/ML
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-black/40 border border-white/5 rounded-full px-2 py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillIndicator"
                    className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/40 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/8 text-neutral-300 hover:text-white text-xs transition-colors group"
            title="Press Ctrl + K to open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline font-mono text-[11px] text-neutral-400 group-hover:text-neutral-300">
              Ctrl+K
            </span>
          </button>

          {/* Split Resume Download Dropdown */}
          <div className="relative" ref={resumeRef}>
            <button
              onClick={() => setResumeOpen(!resumeOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-all shadow-sm shadow-emerald-950"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  resumeOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {resumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0c0d16] border border-white/12 p-2 shadow-2xl backdrop-blur-2xl z-50 flex flex-col gap-1"
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 border-b border-white/5">
                    Select Customized Resume (PDF)
                  </div>

                  {onOpenResumeModal && (
                    <button
                      onClick={() => {
                        setResumeOpen(false);
                        onOpenResumeModal('fullstack');
                      }}
                      className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors mb-1"
                    >
                      <span>👁 Preview In-Browser</span>
                    </button>
                  )}

                  {/* 1. Full-Stack Developer Resume */}
                  <a
                    href={PERSONAL_DETAILS.fullStackResumeUrl}
                    download="Ranjit_Patil_Full_Stack_Resume.pdf"
                    onClick={() => {
                      setResumeOpen(false);
                      triggerToast('Downloading Full-Stack Developer Resume');
                    }}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 shrink-0">
                      <FileDown className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-emerald-300">
                        Full-Stack Developer Resume
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        React, TypeScript, Node.js &amp; APIs
                      </p>
                    </div>
                  </a>

                  {/* 2. Java Backend Developer Resume */}
                  <a
                    href={PERSONAL_DETAILS.javaResumeUrl}
                    download="Ranjit_Patil_Java_Developer_Resume.pdf"
                    onClick={() => {
                      setResumeOpen(false);
                      triggerToast('Downloading Java Backend Developer Resume');
                    }}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-amber-500/20 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 shrink-0">
                      <FileDown className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-amber-300">
                        Java Backend Developer Resume
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        Spring Boot, Redis, Kafka, Concurrency
                      </p>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pointer-events-auto md:hidden absolute top-16 left-4 right-4 bg-[#0d0e17]/95 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl flex flex-col gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-white/8 flex items-center justify-around">
              <a
                href={PERSONAL_DETAILS.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-neutral-400 hover:text-white"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_DETAILS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-neutral-400 hover:text-blue-400"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
