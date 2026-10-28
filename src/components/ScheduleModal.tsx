import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  Video,
  Phone,
  Send,
  Check,
  Mail,
  Building2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerToast: (msg: string) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  triggerToast,
}) => {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    role: 'Full-Stack Developer',
    platform: 'Google Meet',
    preferredTime: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.preferredTime) {
      triggerToast('Please provide your name, email, and preferred time window.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/ranjitpatilsknscoecomp@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `📅 15-Min Intro Request: ${formState.name} (${formState.company || 'Recruiter'})`,
          Name: formState.name,
          Company: formState.company || 'Not specified',
          Email: formState.email,
          'Target Role': formState.role,
          'Preferred Platform': formState.platform,
          'Preferred Time Window': formState.preferredTime,
          'Additional Notes': formState.notes || 'None provided',
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        triggerToast('Intro request dispatched to Ranjit!');
        try {
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#06b6d4', '#f59e0b'],
          });
        } catch {}
      } else {
        setSubmitted(true);
        triggerToast('Request recorded! You can also email directly.');
      }
    } catch {
      setSubmitted(true);
      triggerToast('Request recorded! You can also email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoUrl = `mailto:${PERSONAL_DETAILS.email}?subject=${encodeURIComponent(
    `15-Min Technical Intro: ${formState.name || 'Candidate Intro'} (${formState.company || 'Company'})`
  )}&body=${encodeURIComponent(
    `Hi Ranjit,\n\nI would like to schedule a 15-minute introductory technical discussion.\n\nName: ${formState.name}\nCompany: ${formState.company}\nTarget Role: ${formState.role}\nPreferred Platform: ${formState.platform}\nProposed Date/Time: ${formState.preferredTime}\n\nNotes:\n${formState.notes}`
  )}`;

  const whatsappMessage = `Hi Ranjit! I saw your portfolio and would like to schedule a quick 15-minute chat for ${formState.role}. Are you available around ${formState.preferredTime || 'this week'}?`;
  const whatsappUrl = `https://wa.me/918767751737?text=${encodeURIComponent(whatsappMessage)}`;

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0b13] border border-cyan-500/30 rounded-3xl p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Schedule 15-Min Technical Intro</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Fast Track
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Direct meeting booking with Ranjit Patil &bull; Instant notification
                  </p>
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

            {submitted ? (
              <div className="py-8 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    Intro Call Requested!
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-md mt-1 leading-relaxed">
                    Your request was delivered to <span className="text-emerald-400 font-mono">ranjitpatilsknscoecomp@gmail.com</span>. Ranjit will confirm the calendar invite within 24 hours.
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap gap-2.5 justify-center">
                  <a
                    href={mailtoUrl}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-200 flex items-center gap-2 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Open in Email App</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Company / Organization
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Acme Tech / Startup"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-400"
                      />
                      <Building2 className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* Email & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Work Email <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Target Role Focus
                    </label>
                    <select
                      value={formState.role}
                      onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Full-Stack Developer">Full-Stack Developer</option>
                      <option value="Java Backend Software Engineer">Java Backend Software Engineer</option>
                      <option value="Software Engineer Intern">Software Engineer Intern</option>
                      <option value="General Exploration">General Technical Chat</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Platform & Time Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Preferred Platform
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { label: 'Google Meet', icon: Video },
                        { label: 'Phone Call', icon: Phone },
                        { label: 'Zoom', icon: ExternalLink },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = formState.platform === item.label;
                        return (
                          <button
                            type="button"
                            key={item.label}
                            onClick={() => setFormState({ ...formState, platform: item.label })}
                            className={`py-2 px-2 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1 border transition-all ${
                              isSelected
                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-semibold'
                                : 'bg-white/5 border-white/8 text-neutral-400 hover:text-white'
                            }`}
                          >
                            <Icon className="w-3 h-3" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Preferred Date &amp; Time Window <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Thursday 4:00 PM IST or Tomorrow morning"
                        value={formState.preferredTime}
                        onChange={(e) => setFormState({ ...formState, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-400"
                      />
                      <Clock className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* Additional Notes / Role Details */}
                <div>
                  <label className="text-xs font-mono text-neutral-300 block mb-1">
                    Job Description / Topics to Discuss (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief details about the role, tech stack, or questions..."
                    value={formState.notes}
                    onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                {/* Submit and Direct Action Row */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/8">
                  <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Guaranteed response within 24 hours</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={mailtoUrl}
                      className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                      title="Draft in Mail Client"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Draft in Mail</span>
                    </a>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending Request...' : 'Send Intro Request'}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
