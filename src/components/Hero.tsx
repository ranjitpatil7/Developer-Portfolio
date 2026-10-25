import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  FileDown,
  Layers,
  Code2,
  Server,
  Activity,
  Zap,
  Database,
  Cpu,
  Radio,
  ChevronDown
} from 'lucide-react';
import { PERSONAL_DETAILS, HERO_COPY } from '../data/portfolioData';

interface HeroProps {
  activeLens: 'all' | 'fullstack' | 'java';
  setActiveLens: (lens: 'all' | 'fullstack' | 'java') => void;
  triggerToast: (msg: string) => void;
  onOpenResumeModal?: (type: 'fullstack' | 'java') => void;
}

interface ArchFlow {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  latency: string;
  nodes: {
    id: string;
    label: string;
    detail: string;
    icon: React.ReactNode;
    color: string;
  }[];
  pulseLabel: string;
}

const ARCH_FLOWS: ArchFlow[] = [
  {
    id: 'ticket-reserve',
    name: 'TicketReserve',
    tagline: 'High-Concurrency Atomic Lock Pipeline',
    badge: 'Distributed Locking & JPA @Version',
    latency: '< 18ms latency',
    pulseLabel: 'Simulate Concurrent Seat Request',
    nodes: [
      {
        id: 'node-ui',
        label: 'React UI',
        detail: 'Seat Matrix & Client State',
        icon: <Code2 className="w-4 h-4" />,
        color: '#61dafb',
      },
      {
        id: 'node-api',
        label: 'Spring Boot 3',
        detail: 'JWT Auth & Hold Lifecycle',
        icon: <Server className="w-4 h-4" />,
        color: '#6db33f',
      },
      {
        id: 'node-redis',
        label: 'Redis (SET NX Lock)',
        detail: 'Atomic Key-Value Hold with TTL',
        icon: <Zap className="w-4 h-4" />,
        color: '#dc382d',
      },
      {
        id: 'node-db',
        label: 'MySQL 8 (JPA @Version)',
        detail: 'ACID Commit & Optimistic Locking',
        icon: <Database className="w-4 h-4" />,
        color: '#00758f',
      },
    ],
  },
  {
    id: 'aegis-telemetry',
    name: 'Aegis Telemetry',
    tagline: '1,000 Trucks/s Ingestion & Map Pipeline',
    badge: 'Kafka Streaming + WebGL Map',
    latency: '1,000 msgs/s',
    pulseLabel: 'Emit 1,000 Fleet Telemetry Packets',
    nodes: [
      {
        id: 'node-sim',
        label: '1,000 Trucks/s',
        detail: 'Simulated IoT GPS Coordinates',
        icon: <Radio className="w-4 h-4" />,
        color: '#f59e0b',
      },
      {
        id: 'node-socket',
        label: 'Socket.io',
        detail: 'Node.js Gateway Ingestion',
        icon: <Zap className="w-4 h-4" />,
        color: '#10b981',
      },
      {
        id: 'node-kafka',
        label: 'Redpanda (Kafka)',
        detail: 'Topic Partitioning & DLQ Worker',
        icon: <Activity className="w-4 h-4" />,
        color: '#e05344',
      },
      {
        id: 'node-map',
        label: 'MapLibre WebGL',
        detail: 'GPU Polygon Rendering & Geofences',
        icon: <Cpu className="w-4 h-4" />,
        color: '#06b6d4',
      },
    ],
  },
  {
    id: 'pulse-triage',
    name: 'Pulse-Triage',
    tagline: 'Real-time Healthcare IoT & gRPC Bridge',
    badge: 'Java Stream API + gRPC Low-Latency',
    latency: 'Low-latency RPC',
    pulseLabel: 'Stream IoT Vitals Window',
    nodes: [
      {
        id: 'node-vitals',
        label: 'IoT Vitals Stream',
        detail: 'Simulated Hospital Sensor Packets',
        icon: <Activity className="w-4 h-4" />,
        color: '#ef4444',
      },
      {
        id: 'node-stream',
        label: 'Spring Boot Stream API',
        detail: 'Rolling Statistical Windowing',
        icon: <Server className="w-4 h-4" />,
        color: '#6db33f',
      },
      {
        id: 'node-grpc',
        label: 'gRPC Bridge',
        detail: 'Protobuf Binary Protocol',
        icon: <Zap className="w-4 h-4" />,
        color: '#8b5cf6',
      },
      {
        id: 'node-fastapi',
        label: 'Python FastAPI',
        detail: 'Patient Anomaly Triage Scoring',
        icon: <Cpu className="w-4 h-4" />,
        color: '#06b6d4',
      },
    ],
  },
];

export const Hero: React.FC<HeroProps> = ({
  activeLens,
  setActiveLens,
  triggerToast,
  onOpenResumeModal,
}) => {
  const [activeArchIndex, setActiveArchIndex] = useState(0);
  const [pulseCount, setPulseCount] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setResumeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeArch = ARCH_FLOWS[activeArchIndex];

  // Auto trigger small animated pulse periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSimulate = () => {
    setIsSimulating(true);
    setPulseCount((prev) => prev + 1);
    triggerToast(`Triggered: ${activeArch.pulseLabel}`);
    setTimeout(() => setIsSimulating(false), 1200);
  };

  return (
    <section className="relative min-h-[92vh] pt-28 pb-28 px-4 flex items-center justify-center z-20">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Human-written Bio & Role Lens Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6 shadow-sm shadow-emerald-950/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{HERO_COPY.statusBadge}</span>
          </motion.div>

          {/* Name & Headline Roles */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3"
          >
            {PERSONAL_DETAILS.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg sm:text-xl font-medium text-emerald-400/90 mb-4 font-mono tracking-tight"
          >
            {PERSONAL_DETAILS.headlineRoles}
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-xl sm:text-2xl font-semibold text-neutral-100 leading-snug mb-5"
          >
            {HERO_COPY.headline}
          </motion.h2>

          {/* Exact Human-Written Summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8 max-w-2xl"
          >
            {HERO_COPY.summary}
          </motion.p>

          {/* Role Lens Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="w-full max-w-xl mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Engineering Lens Switcher
              </span>
              <span className="text-[11px] font-mono text-emerald-400/80">
                Filters projects &amp; skills below
              </span>
            </div>

            <div className="p-1 rounded-2xl bg-black/50 border border-white/10 flex items-center gap-1 backdrop-blur-md">
              <button
                onClick={() => {
                  setActiveLens('all');
                  triggerToast('Viewing all engineering projects');
                }}
                className={`relative flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeLens === 'all'
                    ? 'text-white shadow-lg'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                {activeLens === 'all' && (
                  <motion.div
                    layoutId="lensSelectorPill"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/25 to-cyan-500/25 border border-emerald-500/50 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Layers className="w-3.5 h-3.5 text-emerald-400 relative z-10" />
                <span className="relative z-10">All Engineering</span>
              </button>

              <button
                onClick={() => {
                  setActiveLens('fullstack');
                  triggerToast('Full-Stack Lens activated: React, Node, WebGL prioritized');
                }}
                className={`relative flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeLens === 'fullstack'
                    ? 'text-white shadow-lg'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                {activeLens === 'fullstack' && (
                  <motion.div
                    layoutId="lensSelectorPill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 border border-cyan-500/50 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Code2 className="w-3.5 h-3.5 text-cyan-400 relative z-10" />
                <span className="relative z-10">Full-Stack Focus</span>
              </button>

              <button
                onClick={() => {
                  setActiveLens('java');
                  triggerToast('Java & Backend Lens activated: Spring Boot, Redis, Concurrency prioritized');
                }}
                className={`relative flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeLens === 'java'
                    ? 'text-white shadow-lg'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                {activeLens === 'java' && (
                  <motion.div
                    layoutId="lensSelectorPill"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/25 to-emerald-500/25 border border-amber-500/50 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Server className="w-3.5 h-3.5 text-amber-400 relative z-10" />
                <span className="relative z-10">Java &amp; Backend</span>
              </button>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-semibold text-sm hover:from-emerald-400 hover:to-teal-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Split Resume Dropdown Button */}
            <div className="relative z-30" ref={resumeRef}>
              <button
                onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                className="px-4 py-2.5 rounded-xl bg-[#0d0e17] hover:bg-[#131522] border border-white/10 hover:border-emerald-500/40 text-neutral-200 text-sm font-medium transition-colors flex items-center gap-2"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span>Download Resume</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${resumeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {resumeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#0c0d16]/98 border border-white/15 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-50 flex flex-col gap-1 backdrop-blur-2xl"
                  >
                    {onOpenResumeModal && (
                      <button
                        onClick={() => {
                          setResumeDropdownOpen(false);
                          onOpenResumeModal('fullstack');
                        }}
                        className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors mb-1"
                      >
                        <span>👁 Quick Preview Resumes (In-Browser)</span>
                      </button>
                    )}

                    <a
                      href={PERSONAL_DETAILS.fullStackResumeUrl}
                      download="Ranjit_Patil_Full_Stack_Resume.pdf"
                      onClick={() => {
                        setResumeDropdownOpen(false);
                        triggerToast('Downloading Full-Stack Developer Resume (PDF)');
                      }}
                      className="p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-emerald-500/30 text-left transition-colors flex items-center gap-2.5"
                    >
                      <FileDown className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white">Full-Stack Resume (PDF)</div>
                        <div className="text-[10px] text-neutral-400">React, TypeScript, APIs</div>
                      </div>
                    </a>

                    <a
                      href={PERSONAL_DETAILS.javaResumeUrl}
                      download="Ranjit_Patil_Java_Developer_Resume.pdf"
                      onClick={() => {
                        setResumeDropdownOpen(false);
                        triggerToast('Downloading Java Backend Developer Resume (PDF)');
                      }}
                      className="p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-amber-500/30 text-left transition-colors flex items-center gap-2.5"
                    >
                      <FileDown className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white">Java Backend Resume (PDF)</div>
                        <div className="text-[10px] text-neutral-400">Spring Boot, Redis, Concurrency</div>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#contact"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 text-neutral-300 text-sm font-medium transition-colors"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Live Architecture Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-3xl bg-[#0c0d16]/90 border border-white/10 p-5 shadow-2xl backdrop-blur-2xl overflow-hidden group">
            {/* Top glowing ambient accent */}
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Architecture Card Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/8">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-mono tracking-wider text-neutral-100 uppercase">
                    Live System Flow Visualizer
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Interactive Data Pulse Engine
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{activeArch.latency}</span>
              </div>
            </div>

            {/* Architecture Tab Selector (3 Core Architectures) */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-xl border border-white/5 mb-4">
              {ARCH_FLOWS.map((arch, idx) => (
                <button
                  key={arch.id}
                  onClick={() => {
                    setActiveArchIndex(idx);
                    setActiveNodeIndex(null);
                  }}
                  className={`py-1.5 px-2 text-center rounded-lg text-xs font-medium transition-all ${
                    activeArchIndex === idx
                      ? 'bg-white/10 text-white border border-white/15 shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {arch.name}
                </button>
              ))}
            </div>

            {/* Active Architecture Header info */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-neutral-200 mb-0.5">
                {activeArch.tagline}
              </div>
              <div className="text-[11px] font-mono text-emerald-400/90">
                {activeArch.badge}
              </div>
            </div>

            {/* Interactive Vertical Pipeline with Animated SVG Cable & Glowing Pulse */}
            <div className="relative pl-6 py-2 my-2 space-y-4">
              {/* Continuous vertical SVG connection cable */}
              <div className="absolute left-2.5 top-3 bottom-5 w-0.5 bg-neutral-800">
                <motion.div
                  key={`${activeArch.id}-${pulseCount}`}
                  initial={{ top: '0%', opacity: 1 }}
                  animate={{ top: '100%', opacity: 0 }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  className="absolute w-2.5 h-2.5 -left-1 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]"
                />
              </div>

              {/* Node items */}
              {activeArch.nodes.map((node, nodeIdx) => {
                const isSelected = activeNodeIndex === nodeIdx;
                return (
                  <motion.div
                    key={node.id}
                    onClick={() => setActiveNodeIndex(isSelected ? null : nodeIdx)}
                    whileHover={{ x: 4 }}
                    className={`relative cursor-pointer p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/40 shadow-lg'
                        : 'bg-white/5 border-white/8 hover:border-white/20'
                    }`}
                  >
                    {/* Cable branch dot */}
                    <div
                      className="absolute -left-[19px] top-4 w-2 h-2 rounded-full border border-black"
                      style={{ backgroundColor: node.color }}
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="p-1.5 rounded-lg border text-white"
                          style={{
                            backgroundColor: `${node.color}20`,
                            borderColor: `${node.color}40`,
                            color: node.color,
                          }}
                        >
                          {node.icon}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-100 flex items-center gap-1.5">
                            <span>{node.label}</span>
                            <span className="text-[9px] font-mono px-1 rounded bg-white/5 text-neutral-400">
                              Step {nodeIdx + 1}
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {node.detail}
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-neutral-500">
                        {isSelected ? 'Inspect ▲' : 'Details ▼'}
                      </div>
                    </div>

                    {/* Expandable inspector note */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 pt-2 border-t border-white/8 text-[11px] text-emerald-300 font-mono"
                        >
                          ✓ Validated under stress test scenarios. Real-world verified architecture component.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Simulation Action Button */}
            <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between">
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-neutral-200 hover:text-emerald-300 text-xs font-medium transition-all flex items-center justify-center gap-2 group"
              >
                <Zap className={`w-3.5 h-3.5 text-emerald-400 ${isSimulating ? 'animate-bounce' : 'group-hover:scale-125'} transition-transform`} />
                <span>{isSimulating ? 'Processing Pipeline Packet...' : activeArch.pulseLabel}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
