import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Send } from 'lucide-react';
import { PERSONAL_DETAILS, PROJECTS, TECHNICAL_SKILLS } from '../data/portfolioData';

interface TerminalDrawerProps {
  onOpenResumeModal: (type: 'fullstack' | 'java') => void;
  triggerToast?: (msg: string) => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  onOpenResumeModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-emerald-400 space-y-1">
          <p className="font-bold">⚡ Ranjit Patil Interactive Engineering Shell v2.4</p>
          <p className="text-neutral-400 text-xs">
            Type <span className="text-emerald-300 font-bold">help</span> to view available system commands.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-neutral-300 font-semibold mb-1">Available System Commands:</p>
            <p><span className="text-emerald-400 font-mono">whoami</span> — Display candidate background &amp; role</p>
            <p><span className="text-emerald-400 font-mono">skills</span> — List core engineering proficiencies</p>
            <p><span className="text-emerald-400 font-mono">projects</span> — List 6 production-grade repositories</p>
            <p><span className="text-emerald-400 font-mono">resume fullstack</span> — Preview Full-Stack Developer Resume</p>
            <p><span className="text-emerald-400 font-mono">resume java</span> — Preview Java Backend Developer Resume</p>
            <p><span className="text-emerald-400 font-mono">contact</span> — Show phone, email, and social profiles</p>
            <p><span className="text-emerald-400 font-mono">clear</span> — Clear terminal output buffer</p>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-xs space-y-1 text-neutral-300">
            <p className="text-white font-bold">{PERSONAL_DETAILS.name}</p>
            <p className="text-emerald-400 font-mono">{PERSONAL_DETAILS.headlineRoles}</p>
            <p className="text-neutral-400">Final-year B.E. CSE (Honors AI &amp; ML) &bull; CGPA: 7.52</p>
            <p className="text-neutral-400">Current Full Stack Development Intern @ Cognifyz IT Solutions Pvt. Ltd.</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-xs space-y-1">
            <p className="text-emerald-300 font-semibold">Core Technical Stack:</p>
            <p className="text-neutral-300"><span className="text-neutral-500">Backend:</span> {TECHNICAL_SKILLS.Backend.slice(0, 6).join(', ')}</p>
            <p className="text-neutral-300"><span className="text-neutral-500">Frontend:</span> {TECHNICAL_SKILLS.Frontend.slice(0, 6).join(', ')}</p>
            <p className="text-neutral-300"><span className="text-neutral-500">Databases:</span> {TECHNICAL_SKILLS["Databases & Messaging"].join(', ')}</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="text-xs space-y-1.5">
            <p className="text-emerald-300 font-semibold">Featured Architectures:</p>
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="text-neutral-300">
                <span className="text-emerald-400 font-mono">{idx + 1}. {p.title}</span> — {p.subtitle}
              </div>
            ))}
          </div>
        );
        break;

      case 'resume fullstack':
      case 'resume fs':
        onOpenResumeModal('fullstack');
        output = <p className="text-emerald-300 text-xs">Opening Full-Stack Developer Resume in modal...</p>;
        break;

      case 'resume java':
      case 'resume backend':
        onOpenResumeModal('java');
        output = <p className="text-amber-300 text-xs">Opening Full Stack Java Developer Resume in modal...</p>;
        break;

      case 'resume':
      case 'resumes':
        onOpenResumeModal('fullstack');
        output = <p className="text-emerald-300 text-xs">Opening Resume Modal viewer...</p>;
        break;

      case 'contact':
        output = (
          <div className="text-xs space-y-1 text-neutral-300">
            <p><span className="text-neutral-500">Email:</span> {PERSONAL_DETAILS.email}</p>
            <p><span className="text-neutral-500">Phone:</span> {PERSONAL_DETAILS.phone}</p>
            <p><span className="text-neutral-500">GitHub:</span> {PERSONAL_DETAILS.github}</p>
            <p><span className="text-neutral-500">LinkedIn:</span> {PERSONAL_DETAILS.linkedin}</p>
          </div>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs">
            command not found: {cmd}. Type <span className="text-white font-bold">help</span> for commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, output }]);
    setInputVal('');
  };

  return (
    <>
      {/* Floating Trigger Pill at bottom left */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0d0e17]/90 hover:bg-[#141624] border border-emerald-500/30 hover:border-emerald-500/60 text-neutral-200 text-xs font-mono shadow-2xl backdrop-blur-xl transition-all group hover:scale-105"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <TerminalIcon className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-white">dev_cli</span>
          <span className="text-[10px] text-neutral-500 hidden sm:inline">~</span>
        </button>
      </div>

      {/* Terminal Window Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-4 sm:left-6 z-50 w-[92vw] sm:w-[480px] h-[380px] bg-[#07080f]/95 border border-emerald-500/30 rounded-2xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Terminal Top Window Bar */}
            <div className="px-4 py-2.5 bg-[#0b0d18] border-b border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={() => setIsOpen(false)} />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-neutral-400 ml-2">
                  ranjit@portfolio: ~/shell
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
              {history.map((h, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-cyan-400">~</span>
                    <span className="text-white font-medium">{h.command}</span>
                  </div>
                  <div className="pl-4">{h.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Bar */}
            <form
              onSubmit={handleCommand}
              className="p-2.5 border-t border-white/8 bg-[#090b14] flex items-center gap-2 font-mono text-xs"
            >
              <span className="text-emerald-400 pl-2">➜</span>
              <span className="text-cyan-400">~</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'skills', 'projects'..."
                className="flex-1 bg-transparent text-white placeholder-neutral-600 focus:outline-none text-xs"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
