import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, ScreeningItem } from '../types';
import { SCREENING_GUIDELINES } from '../data/screenings';
import { ShieldCheck, Calendar, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ScreeningGuideScreenProps {
  onNavigate: (screen: ScreenId) => void;
  userAgeBand?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ScreeningGuideScreen: React.FC<ScreeningGuideScreenProps> = ({ onNavigate, userAgeBand }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filters = ['All', '20s & 30s', '40s & 50s', '60+', 'Essential Checks'];

  const filteredScreenings = SCREENING_GUIDELINES.filter((item) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === '20s & 30s') return item.targetAge.includes('20') || item.targetAge.includes('21') || item.targetAge.includes('35') || item.targetAge.includes('All');
    if (selectedFilter === '40s & 50s') return item.targetAge.includes('40') || item.targetAge.includes('45') || item.targetAge.includes('50') || item.targetAge.includes('All');
    if (selectedFilter === '60+') return item.targetAge.includes('50') || item.targetAge.includes('60') || item.targetAge.includes('All');
    if (selectedFilter === 'Essential Checks') return item.id === 'cervical-screen' || item.id === 'breast-mammogram' || item.id === 'blood-pressure' || item.id === 'blood-sugar-hba1c';
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5 pb-28 pt-2 text-left max-w-md mx-auto"
    >
      {/* Category header */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800">
        <ShieldCheck className="w-4 h-4 text-emerald-700" />
        <span>Preventive Timeline</span>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Women’s Screening Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Why routine checks matter, what to expect, and key questions to ask your doctor across each life stage.
        </p>
      </motion.div>

      {/* Age context alert if user answered Age question */}
      {userAgeBand && (
        <motion.div variants={itemVariants} className="bg-sky-50 border border-sky-200 rounded-2xl p-3 flex items-center gap-2 text-xs text-sky-900 font-semibold">
          <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
          <span>Showing screening guidance tailored for your life stage ({userAgeBand})</span>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <motion.div variants={itemVariants} className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
        {filters.map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedFilter(f)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition cursor-pointer ${
              selectedFilter === f
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f}
          </motion.button>
        ))}
      </motion.div>

      {/* Screening Cards */}
      <div className="space-y-3.5 pt-1">
        {filteredScreenings.map((screening) => {
          const isExpanded = expandedId === screening.id;

          return (
            <motion.div
              key={screening.id}
              layout
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3"
            >
              {/* Top Meta */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {screening.targetAge}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1.5 leading-snug">
                    {screening.name}
                  </h3>
                </div>
              </div>

              {/* Frequency Badge */}
              <div className="flex items-center gap-1.5 text-xs text-sky-800 font-bold bg-sky-50/70 p-2 rounded-xl border border-sky-100">
                <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Recommended: {screening.frequency}</span>
              </div>

              {/* Why it matters */}
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Why Routine Screening Matters
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {screening.whyItMatters}
                </p>
              </div>

              {/* Collapsible details: What to expect & Questions */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pt-2 border-t border-slate-100 space-y-3"
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        What to Expect During the Test
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                        {screening.whatToExpect}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Questions to Ask Your Doctor
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-800">
                        {screening.doctorQuestions.map((q, qIdx) => (
                          <li key={qIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                            <span className="leading-snug">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand Toggle Button */}
              <button
                onClick={() => toggleExpand(screening.id)}
                className="w-full pt-1 flex items-center justify-between text-xs font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer border-t border-slate-100"
              >
                <span>{isExpanded ? 'Hide details' : 'What to expect & doctor questions'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Book Screening CTA Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="bg-slate-900 text-white rounded-3xl p-5 shadow-md space-y-3"
      >
        <h3 className="text-base font-extrabold">
          Ready to schedule your routine screening?
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Iwosan Lagoon Hospitals offers digital mammograms, Pap smears/HPV testing, ultrasound, and cardiology wellness checks with female clinicians.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('contact')}
          className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Book with Iwosan Lagoon Hospitals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
