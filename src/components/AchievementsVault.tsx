import { motion } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  BookOpen,
  Calendar
} from 'lucide-react';
import { ACHIEVEMENTS_LIST } from '../data/portfolioData';

const getBadgeStyle = (category: string) => {
  switch (category) {
    case 'Patent & Publication':
      return {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-300',
        icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      };
    case 'Certification':
      return {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: 'text-cyan-300',
        icon: <Award className="w-5 h-5 text-cyan-400" />,
      };
    default:
      return {
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/30',
        text: 'text-indigo-300',
        icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      };
  }
};

export const AchievementsVault: React.FC = () => {
  return (
    <section id="achievements" className="py-24 px-4 relative max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>RECOGNITION &amp; CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Certifications, Publications &amp; Achievements
        </h2>
        <p className="text-sm text-neutral-400 max-w-xl mt-2">
          Registered intellectual property, certified database proficiencies, AI foundation credentials, and practical corporate simulations.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS_LIST.map((item, index) => {
          const style = getBadgeStyle(item.category);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="spotlight-card p-6 bg-[#0d0e17] border border-white/8 hover:border-amber-500/30 rounded-2xl flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`p-2.5 rounded-xl border ${style.bg} ${style.border}`}>
                    {style.icon}
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${style.bg} ${style.border} ${style.text} font-semibold`}>
                    {item.credentialBadge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {item.title}
                </h3>

                {/* EXACT Human-written description from Section 3 */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/8 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="truncate">{item.issuer}</span>
                <span className="flex items-center gap-1 text-neutral-500 shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
