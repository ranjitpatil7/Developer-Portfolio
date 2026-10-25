import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2
} from 'lucide-react';
import {
  INTERNSHIP_EXPERIENCE,
  EDUCATION_LIST
} from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll driven progress for the vertical gradient beam
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="py-24 px-4 relative max-w-5xl mx-auto" ref={containerRef}>
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER PATH &amp; ACADEMICS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Experience &amp; Education Timeline
        </h2>
        <p className="text-sm text-neutral-400 max-w-xl mt-2">
          Verified industry experience, software engineering internship, and academic achievements.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 sm:pl-10 space-y-12">
        {/* Animated Background Vertical Track */}
        <div className="absolute left-2.5 sm:left-4 top-2 bottom-4 w-[2px] bg-white/10 rounded-full">
          {/* Active progressive gradient beam */}
          <motion.div
            style={{ height: beamHeight }}
            className="w-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_12px_#10b981]"
          />
        </div>

        {/* 1. INTERNSHIP EXPERIENCE CARD */}
        <div className="relative group">
          {/* Node marker */}
          <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 rounded-full bg-[#06060b] border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Card Content */}
          <div className="spotlight-card p-6 sm:p-7 bg-[#0d0e17] border border-white/10 group-hover:border-emerald-500/40 rounded-3xl transition-all shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
                  Active Internship
                </span>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  {INTERNSHIP_EXPERIENCE.period}
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                {INTERNSHIP_EXPERIENCE.location}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              {INTERNSHIP_EXPERIENCE.title}
            </h3>
            <p className="text-sm font-semibold text-emerald-400/90 mb-5 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>{INTERNSHIP_EXPERIENCE.company}</span>
            </p>

            {/* EXACT Human-Written Bullets from Section 3 */}
            <div className="space-y-3">
              {INTERNSHIP_EXPERIENCE.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. EDUCATION SECTION HEADER IN TIMELINE */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/8">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Academic Milestones</span>
          </div>
        </div>

        {/* 3. EDUCATION ITEMS */}
        {EDUCATION_LIST.map((edu) => (
          <div key={edu.degree} className="relative group">
            {/* Node marker */}
            <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 rounded-full bg-[#06060b] border-2 border-cyan-400/80 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>

            <div className="spotlight-card p-6 bg-[#0d0e17] border border-white/8 hover:border-cyan-500/30 rounded-2xl transition-all shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold">
                  {edu.score}
                </span>
                {edu.period && (
                  <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    {edu.period}
                  </span>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                {edu.degree}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                <span>{edu.institution}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
