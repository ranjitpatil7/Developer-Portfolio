import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Database,
  Terminal,
  Cpu,
  Sparkles,
  Layers,
  Search,
  CheckCircle2
} from 'lucide-react';
import { TECHNICAL_SKILLS } from '../data/portfolioData';

interface SkillsVaultProps {
  activeLens: 'all' | 'fullstack' | 'java';
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: <Code2 className="w-4 h-4 text-emerald-400" />,
  Frontend: <Layout className="w-4 h-4 text-cyan-400" />,
  Backend: <Server className="w-4 h-4 text-amber-400" />,
  'Databases & Messaging': <Database className="w-4 h-4 text-indigo-400" />,
  'DevOps, Testing & Tools': <Terminal className="w-4 h-4 text-teal-400" />,
  'Core CS': <Cpu className="w-4 h-4 text-rose-400" />,
};

// Skills to emphasize when Java & Backend is active
const JAVA_BACKEND_EMPHASIS = [
  'Java 17',
  'Spring Boot',
  'Spring Security',
  'JPA/Hibernate',
  'gRPC',
  'Redis',
  'Redpanda (Kafka)',
  'MySQL',
  'PostgreSQL',
  'Concurrency Control',
  'Flyway',
  'JUnit 5',
  'Mockito',
  'MockMvc',
];

// Skills to emphasize when Full-Stack is active
const FULLSTACK_EMPHASIS = [
  'React.js',
  'TypeScript',
  'JavaScript (ES6+)',
  'Next.js',
  'Tailwind CSS',
  'React Query',
  'Node.js',
  'Express.js',
  'FastAPI',
  'Socket.io',
  'MapLibre GL JS',
  'Docker',
  'PostgreSQL',
  'Redis',
];

export const SkillsVault: React.FC<SkillsVaultProps> = ({ activeLens }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Object.keys(TECHNICAL_SKILLS)];

  const isHighlighted = (skill: string) => {
    if (activeLens === 'java') {
      return JAVA_BACKEND_EMPHASIS.includes(skill);
    }
    if (activeLens === 'fullstack') {
      return FULLSTACK_EMPHASIS.includes(skill);
    }
    return false;
  };

  return (
    <section id="skills" className="py-24 px-4 relative max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>TECHNICAL INVENTORY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Engineering Skills &amp; Proficiencies
        </h2>
        <p className="text-sm text-neutral-400 max-w-xl mt-2">
          Languages, frontend systems, robust backends, distributed queues, and fundamental CS principles.
        </p>

        {/* Search & Category Filter */}
        <div className="w-full max-w-2xl mt-8 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specific skill..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                    : 'bg-white/5 text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(TECHNICAL_SKILLS).map(([category, skills]) => {
          if (selectedCategory !== 'All' && selectedCategory !== category) {
            return null;
          }

          // Filter by search query if present
          const displayedSkills = skills.filter((s) =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (displayedSkills.length === 0 && searchQuery) {
            return null;
          }

          return (
            <motion.div
              layout
              key={category}
              className="spotlight-card p-6 bg-[#0d0e17] border border-white/8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-white/8">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/8">
                    {CATEGORY_ICONS[category] || <Sparkles className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {category}
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {skills.length} core competencies
                    </span>
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {displayedSkills.map((skill) => {
                    const highlighted = isHighlighted(skill);
                    return (
                      <span
                        key={skill}
                        className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-all ${
                          highlighted
                            ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.25)] font-semibold scale-105'
                            : 'bg-black/40 border-white/8 text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {activeLens !== 'all' && (
                <div className="pt-3 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/80">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>
                    {activeLens === 'java' ? 'Java Backend Focus' : 'Full-Stack Focus'} Active
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
