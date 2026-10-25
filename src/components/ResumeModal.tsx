import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Code2,
  Server,
  Eye,
  CheckCircle2,
  Download
} from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'fullstack' | 'java';
  triggerToast: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  initialType = 'fullstack',
  triggerToast,
}) => {
  const [selectedResume, setSelectedResume] = useState<'fullstack' | 'java'>(initialType);

  const isFullStack = selectedResume === 'fullstack';
  const resumeUrl = isFullStack
    ? PERSONAL_DETAILS.fullStackResumeUrl
    : PERSONAL_DETAILS.javaResumeUrl;
  const resumeTitle = isFullStack
    ? 'Full-Stack Developer Resume'
    : 'Full Stack Java Developer Resume';
  const resumeSubtitle = isFullStack
    ? 'React, TypeScript, Node.js, Python FastAPI, PostgreSQL & Redis'
    : 'Java 17, Spring Boot, Concurrency Control, Redis & Distributed Systems';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[88vh] bg-[#0c0d16] border border-white/12 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Modal Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-[#0e101a]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{resumeTitle}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                      Verified PDF
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 truncate max-w-md">
                    {resumeSubtitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Switcher Pills */}
                <div className="p-1 rounded-xl bg-black/50 border border-white/10 flex items-center gap-1">
                  <button
                    onClick={() => setSelectedResume('fullstack')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isFullStack
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Full-Stack</span>
                  </button>

                  <button
                    onClick={() => setSelectedResume('java')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      !isFullStack
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Server className="w-3.5 h-3.5" />
                    <span>Java Backend</span>
                  </button>
                </div>

                {/* Direct Download */}
                <a
                  href={resumeUrl}
                  download={isFullStack ? "Ranjit_Patil_Full_Stack_Resume.pdf" : "Ranjit_Patil_Java_Developer_Resume.pdf"}
                  onClick={() => triggerToast(`Downloading ${resumeTitle}`)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                {/* Open in new tab */}
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                  title="Open in Full Browser Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="flex-1 w-full bg-[#151722] relative">
              <iframe
                key={resumeUrl}
                src={`${resumeUrl}#toolbar=1&navpanes=0&view=FitH`}
                className="w-full h-full border-0"
                title={resumeTitle}
              />
            </div>

            {/* Modal Bottom Status Bar */}
            <div className="px-5 py-2.5 border-t border-white/10 bg-[#090a10] flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ranjit Patil &bull; Official Resume Documents</span>
              </span>
              <span className="text-[11px] text-neutral-500">
                Press ESC to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
