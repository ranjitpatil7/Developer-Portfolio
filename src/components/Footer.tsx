import React from 'react';
import {
  ArrowUp,
  FileDown
} from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/8 bg-[#040508] py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Status */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">
              {PERSONAL_DETAILS.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Available for Full-Time Roles
            </span>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm text-center md:text-left">
            B.E. Computer Science and Engineering (Honors AI &amp; ML) &bull; SKN Sinhgad College of Engineering
          </p>
        </div>

        {/* Resumes and Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-400">
          <a
            href={PERSONAL_DETAILS.fullStackResumeUrl}
            download="Ranjit_Patil_Full_Stack_Resume.pdf"
            className="hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            <FileDown className="w-3 h-3 text-emerald-400" />
            <span>Full-Stack Resume</span>
          </a>

          <span>&bull;</span>

          <a
            href={PERSONAL_DETAILS.javaResumeUrl}
            download="Ranjit_Patil_Java_Developer_Resume.pdf"
            className="hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <FileDown className="w-3 h-3 text-amber-400" />
            <span>Java Backend Resume</span>
          </a>

          <span>&bull;</span>

          <a
            href={PERSONAL_DETAILS.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <span>&bull;</span>

          <a
            href={PERSONAL_DETAILS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono group"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-2">
        <div>
          &copy; {new Date().getFullYear()} Ranjit Patil. Exact human-written credentials &amp; production architectures.
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Full-Stack &amp; Java Distributed Systems</span>
        </div>
      </div>
    </footer>
  );
};
