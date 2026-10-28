import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  Download,
  Calendar,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  Copy
} from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: (type: 'fullstack' | 'java') => void;
  triggerToast: (msg: string) => void;
}

export const RecruiterModal: React.FC<RecruiterModalProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal,
  triggerToast,
}) => {
  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DETAILS.email);
    triggerToast('Copied email to clipboard: ' + PERSONAL_DETAILS.email);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0b12] border border-emerald-500/35 rounded-3xl p-5 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-emerald-400">
                      RECRUITER 30-SECOND EXECUTIVE VIEW
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                      TL;DR
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Ranjit Patil &bull; Candidate Overview
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Candidate Summary Cards */}
            <div className="mt-5 space-y-4">
              {/* Top Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#121422] border border-white/8 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Education (2027)</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">
                      B.E. CSE (Honors AI/ML)
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      SKN SCOE &bull; CGPA: 7.52
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#121422] border border-white/8 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span>Current Experience</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">
                      Full Stack Intern
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Cognifyz IT Solutions (Remote)
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#121422] border border-white/8 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1">
                    <Award className="w-4 h-4" />
                    <span>Intellectual Property</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">
                      Patent &amp; Paper (SIH25001)
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      EpiGuard AI Health Platform
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Roles & Value Proposition */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/[0.08] to-cyan-500/[0.06] border border-emerald-500/25">
                <span className="text-[11px] font-mono text-emerald-400 font-bold block mb-1">
                  TARGET ROLES: FULL-STACK DEVELOPER &bull; JAVA BACKEND SOFTWARE ENGINEER
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Specialized in building high-throughput backend services and responsive client web applications. Hands-on experience tackling race conditions via <strong className="text-white">Redis atomic locks (SET NX)</strong> and <strong className="text-white">JPA @Version optimistic locking</strong>, streaming real-time IoT events with <strong className="text-white">Kafka / Redpanda DLQs</strong>, and designing clean relational schemas across MySQL and PostgreSQL.
                </p>
              </div>

              {/* Core Tech Stack Badges */}
              <div className="p-4 rounded-2xl bg-[#121422] border border-white/8 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Primary Technology Arsenal
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Java 17',
                    'Spring Boot 3',
                    'Spring Security',
                    'JPA / Hibernate',
                    'Redis (Atomic Locks)',
                    'Kafka / Redpanda',
                    'React.js',
                    'TypeScript',
                    'Next.js',
                    'Tailwind CSS',
                    'FastAPI',
                    'MySQL 8',
                    'PostgreSQL',
                    'PostGIS',
                    'Docker',
                    'JUnit 5',
                    'Flyway',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top 2 Star Production Codebases */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Top Production Projects
                </div>

                <div className="p-3.5 rounded-2xl bg-[#121422] border border-white/8 hover:border-emerald-500/30 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">TicketReserve</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Zero Double-Bookings
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                      Event ticketing engine eliminating double-bookings using Redis <code className="text-emerald-300">SET NX</code> locks &amp; JPA <code className="text-emerald-300">@Version</code> optimistic locking under 500 concurrent requests.
                    </p>
                  </div>
                  <a
                    href="https://github.com/ranjitpatil7/Ticket-Reserve"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-emerald-400 border border-white/10 flex items-center gap-1.5 text-xs font-mono shrink-0 transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#121422] border border-white/8 hover:border-cyan-500/30 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">Aegis Cloud Telemetry</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        1,000 Trucks/s Stream
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                      Real-time IoT fleet monitoring streaming 1,000 trucks/sec via Socket.io and Redpanda (Kafka) Dead-Letter Queues with GPU-accelerated MapLibre WebGL rendering.
                    </p>
                  </div>
                  <a
                    href="https://github.com/ranjitpatil7/IOT-Fleet-Management-Microservices"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-cyan-400 border border-white/10 flex items-center gap-1.5 text-xs font-mono shrink-0 transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                {/* 15-Minute Intro Call */}
                <a
                  href={PERSONAL_DETAILS.scheduleMeetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => triggerToast('Opening Cal.com meeting scheduler')}
                  className="flex-1 min-w-[200px] py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book 15-Min Intro Call</span>
                </a>

                {/* Preview Full Stack Resume */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenResumeModal('fullstack');
                  }}
                  className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 hover:text-white font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full-Stack Resume</span>
                </button>

                {/* Preview Java Resume */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenResumeModal('java');
                  }}
                  className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 hover:text-white font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Java Resume</span>
                </button>

                {/* Copy Email */}
                <button
                  onClick={copyEmail}
                  className="py-3 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                  title="Copy Direct Email"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Email</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
