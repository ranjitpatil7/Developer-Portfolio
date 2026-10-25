import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  Award,
  GraduationCap,
  Calendar,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Cpu
} from 'lucide-react';
import {
  ABOUT_COPY,
  MARQUEE_SKILLS_ROW1,
  MARQUEE_SKILLS_ROW2
} from '../data/portfolioData';

// 3D Tilt Wrapper Component for Bento Cards
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    // Spotlight cursor effect
    ref.current.style.setProperty('--mouse-x', `${mouseX}px`);
    ref.current.style.setProperty('--mouse-y', `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`spotlight-card transition-all duration-300 ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

export const BentoHighlights: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENGINEERING HIGHLIGHTS &amp; FOUNDATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Background, Research &amp; Track Record
        </h2>
        <p className="text-sm text-neutral-400 max-w-xl mt-2">
          Grounded engineering fundamentals, verified industry internship, and peer-reviewed research.
        </p>
      </div>

      {/* 3D Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* CARD 1: About & Live Internship Status (Span 7) */}
        <TiltCard className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-[#0e0f1a] to-[#0a0a10]">
          <div>
            {/* Top Live Internship Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono">{ABOUT_COPY.internshipBadge}</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                Oct 2026 – Present
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span>About Me &amp; Current Work</span>
            </h3>

            {/* EXACT Human-written Paragraph 1 */}
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              {ABOUT_COPY.paragraph1}
            </p>

            {/* EXACT Human-written Paragraph 2 */}
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              {ABOUT_COPY.paragraph2}
            </p>
          </div>

          <div className="pt-4 mt-2 border-t border-white/8 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Active Remote Internship
            </span>
            <span className="text-neutral-500 text-[11px]">Production &bull; Concurrency &bull; APIs</span>
          </div>
        </TiltCard>

        {/* CARD 2: Published Paper & Registered Patent (Span 5) */}
        <TiltCard className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-[#12111d] to-[#0a0a12] border-amber-500/20">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
                SIH25001 Registered
              </span>
            </div>

            <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">
              Registered Patent &amp; Published Paper
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              EpiGuard AI Platform
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              Published research paper and registered patent for <strong>"Smart Community Health Monitoring and Early Warning Platform"</strong> (EpiGuard AI, 2026).
            </p>

            <div className="space-y-2 p-3 rounded-xl bg-black/40 border border-white/8 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Scope:</span>
                <span className="text-neutral-200">Public Health Spatial Telemetry</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>ML Pipeline:</span>
                <span className="text-emerald-400">XGBoost &bull; PostGIS Polygons</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Status:</span>
                <span className="text-amber-300 font-semibold">Granted / Registered 2026</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/8 flex items-center justify-between">
            <a
              href="https://github.com/ranjitpatil7/Epi-Guard"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-amber-300 hover:text-amber-200 inline-flex items-center gap-1 group"
            >
              <span>View EpiGuard AI Source</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-[11px] font-mono text-neutral-500">2026</span>
          </div>
        </TiltCard>

        {/* CARD 3: Dual-Direction Infinite Tech Marquee (Span 7) */}
        <div className="md:col-span-7 p-6 rounded-2xl bg-[#0d0e17] border border-white/8 overflow-hidden pause-on-hover relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                Dual-Direction Tech Stack Marquee
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">
              Hover to pause
            </span>
          </div>

          <div className="space-y-3.5 my-2">
            {/* Row 1: Forward Marquee */}
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-2.5 shrink-0 animate-marquee marquee-track">
                {[...MARQUEE_SKILLS_ROW1, ...MARQUEE_SKILLS_ROW1].map((skill, i) => (
                  <div
                    key={`r1-${i}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-xs font-medium text-neutral-200 whitespace-nowrap hover:border-emerald-500/40 hover:bg-white/10 transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span>{skill.name}</span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {skill.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Reverse Marquee */}
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-2.5 shrink-0 animate-marquee-reverse marquee-track">
                {[...MARQUEE_SKILLS_ROW2, ...MARQUEE_SKILLS_ROW2].map((skill, i) => (
                  <div
                    key={`r2-${i}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-xs font-medium text-neutral-200 whitespace-nowrap hover:border-cyan-500/40 hover:bg-white/10 transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span>{skill.name}</span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {skill.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 font-mono mt-3 pt-3 border-t border-white/5">
            Full-stack production toolchain spanning modern frontend, reactive backends &amp; distributed storage.
          </p>
        </div>

        {/* CARD 4: Academic Track Record (Span 5) */}
        <TiltCard className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-[#0c0d16] to-[#080910]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                Academics
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-4">
              Academic Track Record
            </h3>

            <div className="space-y-3.5">
              {/* Item 1: BE */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/8">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">
                    B.E. – CSE (Honors - AI &amp; ML)
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    CGPA: 7.52
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  SKN Sinhgad College of Engineering, Pandharpur
                </div>
                <div className="text-[10px] font-mono text-neutral-500 mt-1">
                  2023–2027
                </div>
              </div>

              {/* Item 2: HSC */}
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-200">
                    HSC (12th Grade)
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Ligade Patil Junior College of Science, Karad
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-cyan-400">
                  75.67%
                </span>
              </div>

              {/* Item 3: SSC */}
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-200">
                    SSC (10th Grade)
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Shivanjali English Medium School, Navarasta
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-indigo-400">
                  81.40%
                </span>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
