import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  ChevronDown,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

interface ProjectsShowcaseProps {
  activeLens: 'all' | 'fullstack' | 'java';
}

const CATEGORY_TABS = [
  'All (6)',
  'Java & Spring Boot',
  'Full-Stack & Real-Time',
  'AI & Geospatial',
];

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  activeLens,
}) => {
  const [selectedTab, setSelectedTab] = useState('All (6)');
  const [expandedArchIds, setExpandedArchIds] = useState<Record<string, boolean>>({
    'ticket-reserve': true, // Open by default as marquee example
  });

  const toggleArch = (projectId: string) => {
    setExpandedArchIds((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Sort and filter projects based on tab and active role lens
  const filteredProjects = useMemo(() => {
    const list = [...PROJECTS];

    // Priority sort based on active role lens
    list.sort((a, b) => {
      if (activeLens === 'java') {
        return a.lensPriority.java - b.lensPriority.java;
      }
      if (activeLens === 'fullstack') {
        return a.lensPriority.fullstack - b.lensPriority.fullstack;
      }
      return a.lensPriority.all - b.lensPriority.all;
    });

    if (selectedTab === 'All (6)') {
      return list;
    }

    return list.filter((p) => p.categoryTags.includes(selectedTab));
  }, [selectedTab, activeLens]);

  return (
    <section id="projects" className="py-24 px-4 relative max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PRODUCTION-GRADE CODEBASES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Featured Engineering Projects
        </h2>
        <p className="text-sm text-neutral-400 max-w-2xl mt-2">
          High-concurrency systems, real-time IoT pipelines, and spatial AI architectures. Every project card features an expandable system flow visualizer.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="projectTabIndicator"
                    className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/40 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        <AnimatePresence>
          {filteredProjects.map((project, index) => {
            const isArchOpen = !!expandedArchIds[project.id];

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isArchOpen={isArchOpen}
                onToggleArch={() => toggleArch(project.id)}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

// Project Card with Mouse Spotlight & 3D Hover
interface ProjectCardProps {
  project: Project;
  index: number;
  isArchOpen: boolean;
  onToggleArch: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isArchOpen,
  onToggleArch,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Node type badge helper
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'client':
        return '#61dafb';
      case 'gateway':
        return '#10b981';
      case 'service':
        return '#6db33f';
      case 'cache':
        return '#dc382d';
      case 'database':
        return '#00758f';
      case 'queue':
        return '#e05344';
      case 'ai':
        return '#8b5cf6';
      default:
        return '#10b981';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="spotlight-card flex flex-col justify-between p-6 sm:p-7 bg-[#0d0e17] border border-white/8 hover:border-emerald-500/30 transition-all duration-300 rounded-3xl group shadow-xl"
    >
      <div>
        {/* Card Header: Year & Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.categoryTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-500">
              {project.year}
            </span>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-300 border border-white/8 hover:border-emerald-500/40 transition-colors"
              title="View GitHub Repository"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-cyan-400 mb-4">
          {project.subtitle}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#131522] border border-white/6 text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Architecture Flow Toggle Button */}
        <div className="mb-5">
          <button
            onClick={onToggleArch}
            className={`w-full py-2 px-3 rounded-xl border transition-all flex items-center justify-between text-xs font-mono ${
              isArchOpen
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-white/5 border-white/8 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isArchOpen ? 'Hide Architecture Pipeline' : 'Inspect Architecture Pipeline'}</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isArchOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Expandable Architecture Drawer */}
          <AnimatePresence>
            {isArchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    Pipeline Architecture Under The Hood
                  </div>

                  {/* Flow Nodes Pipeline */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2">
                    {project.architectureNodes.map((node, nodeIdx) => (
                      <React.Fragment key={node.label}>
                        <div className="flex-1 min-w-[130px] p-2 rounded-xl bg-white/5 border border-white/8 flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: getNodeColor(node.type) }}
                            />
                            <span className="text-[11px] font-semibold text-neutral-200 truncate">
                              {node.label}
                            </span>
                          </div>
                          {node.sublabel && (
                            <span className="text-[9px] font-mono text-neutral-400 truncate">
                              {node.sublabel}
                            </span>
                          )}
                        </div>
                        {nodeIdx < project.architectureNodes.length - 1 && (
                          <div className="hidden sm:block text-neutral-600 font-mono text-xs">
                            &rarr;
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Architecture Summary String from Section 3 */}
                  <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-[11px] font-mono text-emerald-400/90 leading-relaxed">
                    <strong>Flow:</strong> {project.architectureSummary}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* EXACT Human-Written Bullet Points (Strict Content Rule) */}
        <div className="space-y-2 mb-6">
          {project.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 mt-1.5 shrink-0" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: GitHub Link */}
      <div className="pt-4 border-t border-white/8 flex items-center justify-between">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 group/btn"
        >
          <span>View Source Code</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </a>

        <span className="text-[10px] font-mono text-neutral-500">
          github.com/ranjitpatil7
        </span>
      </div>
    </motion.div>
  );
};
