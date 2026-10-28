import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FileDown,
  Copy,
  ExternalLink,
  Code2,
  Server,
  Layers,
  Award,
  Mail,
  Check,
  FolderGit2,
  Sparkles,
  Command,
  Calendar,
  Zap
} from 'lucide-react';
import { PERSONAL_DETAILS, PROJECTS } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  activeLens?: 'all' | 'fullstack' | 'java';
  setActiveLens: (lens: 'all' | 'fullstack' | 'java') => void;
  triggerToast: (msg: string) => void;
  onOpenResumeModal?: (type: 'fullstack' | 'java') => void;
  onOpenRecruiterModal?: () => void;
  onOpenScheduleModal?: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Role View' | 'Projects' | 'Resumes' | 'Social & Contact';
  icon: React.ReactNode;
  isActive?: boolean;
  onSelect: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  activeLens = 'all',
  setActiveLens,
  triggerToast,
  onOpenResumeModal,
  onOpenRecruiterModal,
  onOpenScheduleModal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DETAILS.email);
    triggerToast('Email copied to clipboard!');
    onClose();
  };

  // Build list of actions
  const actions: PaletteAction[] = [
    // Role Views
    {
      id: 'lens-all',
      title: 'Switch to All Engineering View',
      subtitle: 'Display complete engineering projects, skills, and background',
      category: 'Role View',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      isActive: activeLens === 'all',
      onSelect: () => {
        setActiveLens('all');
        triggerToast('Switched to All Engineering view');
        onClose();
      },
    },
    {
      id: 'lens-fullstack',
      title: 'Switch to Full-Stack Developer View',
      subtitle: 'Highlight React, TypeScript, Node.js, and end-to-end architectures',
      category: 'Role View',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      isActive: activeLens === 'fullstack',
      onSelect: () => {
        setActiveLens('fullstack');
        triggerToast('Switched to Full-Stack Developer view');
        onClose();
      },
    },
    {
      id: 'lens-java',
      title: 'Switch to Java & Backend View',
      subtitle: 'Highlight Java 17, Spring Boot, Redis, Kafka, and concurrency',
      category: 'Role View',
      icon: <Server className="w-4 h-4 text-amber-400" />,
      isActive: activeLens === 'java',
      onSelect: () => {
        setActiveLens('java');
        triggerToast('Switched to Java & Backend Developer view');
        onClose();
      },
    },

    // Resumes & Recruiter Mode
    {
      id: 'recruiter-quick-view',
      title: 'Open Recruiter 30-Second Executive Summary',
      subtitle: 'Instant candidate breakdown, key metrics, and fast-track actions',
      category: 'Resumes',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      onSelect: () => {
        onClose();
        if (onOpenRecruiterModal) onOpenRecruiterModal();
      },
    },
    {
      id: 'resume-preview-fullstack',
      title: 'Preview Full-Stack Resume In-Browser',
      subtitle: 'Open high-resolution interactive PDF reader',
      category: 'Resumes',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      onSelect: () => {
        onClose();
        if (onOpenResumeModal) onOpenResumeModal('fullstack');
      },
    },
    {
      id: 'resume-preview-java',
      title: 'Preview Java Backend Resume In-Browser',
      subtitle: 'Open high-resolution interactive PDF reader',
      category: 'Resumes',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      onSelect: () => {
        onClose();
        if (onOpenResumeModal) onOpenResumeModal('java');
      },
    },
    {
      id: 'resume-fullstack',
      title: 'Download Full-Stack Developer Resume (PDF)',
      subtitle: '/Ranjit_Patil_Full_Stack_Resume.pdf',
      category: 'Resumes',
      icon: <FileDown className="w-4 h-4 text-emerald-400" />,
      onSelect: () => {
        window.open(PERSONAL_DETAILS.fullStackResumeUrl, '_blank');
        triggerToast('Downloading Full-Stack Developer Resume');
        onClose();
      },
    },
    {
      id: 'resume-java',
      title: 'Download Java Backend Developer Resume (PDF)',
      subtitle: '/Ranjit_Patil_Java_Developer_Resume.pdf',
      category: 'Resumes',
      icon: <FileDown className="w-4 h-4 text-amber-400" />,
      onSelect: () => {
        window.open(PERSONAL_DETAILS.javaResumeUrl, '_blank');
        triggerToast('Downloading Java Backend Developer Resume');
        onClose();
      },
    },

    // Navigation
    {
      id: 'nav-about',
      title: 'Jump to About Me',
      subtitle: 'Final-year student at SKN SCOE & Cognifyz Intern',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
      onSelect: () => scrollTo('about'),
    },
    {
      id: 'nav-experience',
      title: 'Jump to Experience & Internship',
      subtitle: 'Cognifyz IT Solutions Pvt. Ltd.',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
      onSelect: () => scrollTo('experience'),
    },
    {
      id: 'nav-projects',
      title: 'Jump to Featured Projects',
      subtitle: 'TicketReserve, Aegis Telemetry, Pulse-Triage & more',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      onSelect: () => scrollTo('projects'),
    },
    {
      id: 'nav-skills',
      title: 'Jump to Technical Skills',
      subtitle: 'Languages, Frontend, Backend, Databases, DevOps, Core CS',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-violet-400" />,
      onSelect: () => scrollTo('skills'),
    },
    {
      id: 'nav-achievements',
      title: 'Jump to Achievements & Certifications',
      subtitle: 'Patent & Publication, Neo4j, Oracle AI, NPTEL, TATA',
      category: 'Navigation',
      icon: <Award className="w-4 h-4 text-amber-400" />,
      onSelect: () => scrollTo('achievements'),
    },
    {
      id: 'nav-contact',
      title: 'Jump to Contact',
      subtitle: 'Send message, copy email, phone number',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      onSelect: () => scrollTo('contact'),
    },

    // Projects (Dynamic search)
    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.title,
      subtitle: `${proj.subtitle} • ${proj.techStack.slice(0, 4).join(', ')}`,
      category: 'Projects' as const,
      icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
      onSelect: () => {
        scrollTo('projects');
      },
    })),

    // Social & Contact
    {
      id: 'action-schedule-call',
      title: 'Schedule 15-Minute Technical Intro Call',
      subtitle: 'Propose a time window and discuss full-time/intern roles',
      category: 'Social & Contact',
      icon: <Calendar className="w-4 h-4 text-cyan-400" />,
      onSelect: () => {
        onClose();
        if (onOpenScheduleModal) {
          onOpenScheduleModal();
        } else {
          window.open(PERSONAL_DETAILS.scheduleMeetingFallback, '_blank');
        }
      },
    },
    {
      id: 'action-copy-email',
      title: `Copy Email: ${PERSONAL_DETAILS.email}`,
      subtitle: 'One-click copy to clipboard',
      category: 'Social & Contact',
      icon: <Copy className="w-4 h-4 text-emerald-400" />,
      onSelect: copyEmail,
    },
    {
      id: 'action-github',
      title: 'Open GitHub Profile',
      subtitle: PERSONAL_DETAILS.github,
      category: 'Social & Contact',
      icon: <ExternalLink className="w-4 h-4 text-neutral-300" />,
      onSelect: () => {
        window.open(PERSONAL_DETAILS.github, '_blank');
        onClose();
      },
    },
    {
      id: 'action-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: PERSONAL_DETAILS.linkedin,
      category: 'Social & Contact',
      icon: <ExternalLink className="w-4 h-4 text-blue-400" />,
      onSelect: () => {
        window.open(PERSONAL_DETAILS.linkedin, '_blank');
        onClose();
      },
    },
  ];

  // Filter actions based on query
  const filteredActions = actions.filter((action) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      action.title.toLowerCase().includes(q) ||
      (action.subtitle && action.subtitle.toLowerCase().includes(q)) ||
      action.category.toLowerCase().includes(q)
    );
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredActions.length || 1)) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].onSelect();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0c0d16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8 bg-[#0e101a]">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, switch roles, download resumes..."
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center text-sm text-neutral-500">
                  No matching results found for "{query}"
                </div>
              ) : (
                filteredActions.map((action, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      onClick={action.onSelect}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-white'
                          : 'text-neutral-300 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg border shrink-0 ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-white/5 border-white/8 text-neutral-400'
                          }`}
                        >
                          {action.icon}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-neutral-100 truncate">{action.title}</p>
                            {action.isActive && (
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                          </div>
                          {action.subtitle && (
                            <p className="text-xs text-neutral-400 truncate">{action.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 shrink-0 ml-2">
                        {action.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer bar */}
            <div className="px-4 py-2.5 border-t border-white/8 bg-[#090a10] flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400/80">
                <Command className="w-3 h-3" />
                <span>Ranjit Patil Engineering Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
