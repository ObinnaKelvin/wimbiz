import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HealthNumbers, ScreenId, SummaryResults } from '../types';
import { generateSummary } from '../utils/healthLogic';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Share2,
  Printer,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Check,
  Stethoscope,
} from 'lucide-react';

interface SummaryScreenProps {
  answers: Record<string, string>;
  numbers: HealthNumbers;
  onNavigate: (screen: ScreenId) => void;
  onOpenArticle: (articleId: string) => void;
  onRetakeCheck: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  answers,
  numbers,
  onNavigate,
  onOpenArticle,
  onRetakeCheck,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const summary: SummaryResults = generateSummary(answers, numbers);

  const handlePrintSummary = () => {
    window.print();
  };

  const handleShareSummary = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Iwosan HerHealth Summary',
        text: 'I just completed my 3-minute Health Awareness Check on Iwosan HerHealth by WIMBIZ & Iwosan.',
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-28 pt-2 text-left max-w-md mx-auto print:max-w-none print:p-8"
    >
      {/* Top Badge */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Your Health Awareness Summary</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          {summary.completionDate}
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          What you’re doing well & what’s worth exploring.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Here is your personalized, clinician-reviewed awareness synthesis based on your responses.
        </p>
      </motion.div>

      {/* Prominent Disclaimer Badge */}
      <motion.div
        variants={itemVariants}
        className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-3.5 space-y-1 text-left"
      >
        <div className="flex items-center gap-1.5 text-xs font-black text-rose-900">
          <ShieldCheck className="w-4 h-4 text-rose-800" />
          <span>Educational information, not a diagnosis</span>
        </div>
        <p className="text-[11px] text-rose-900/90 leading-relaxed font-medium">
          This summary provides supportive health literacy and preventive milestones. A licensed clinician provides clinical diagnoses and individualized medical treatment.
        </p>
      </motion.div>

      {/* SECTION 1: "KEEP DOING" (What she's already doing well) */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
              Keep doing
            </h2>
            <p className="text-[11px] text-slate-500">What you’re already doing well</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {summary.keepDoing.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="bg-white rounded-2xl p-4 border border-emerald-100/90 shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {item.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                  Strength
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>

              {item.articleId && (
                <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[10px] text-slate-500 font-medium italic">
                    Educational guidance
                  </span>
                  <button
                    onClick={() => onOpenArticle(item.articleId!)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Article</span>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* SECTION 2: "WORTH CHECKING" (Small, easy next steps) */}
      <motion.div variants={itemVariants} className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
              Worth checking
            </h2>
            <p className="text-[11px] text-slate-500">Small, easy next steps</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {summary.worthChecking.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="bg-white rounded-2xl p-4 border border-amber-100/90 shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {item.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                  Next Step
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>

              <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                <span className="text-[10px] text-slate-500 font-medium italic">
                  Not a diagnosis
                </span>
                <div className="flex items-center gap-3">
                  {item.articleId && (
                    <button
                      onClick={() => onOpenArticle(item.articleId!)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 transition cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Learn More</span>
                    </button>
                  )}
                  {item.actionScreen && (
                    <button
                      onClick={() => onNavigate(item.actionScreen!)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition cursor-pointer"
                    >
                      <span>{item.actionText || 'Explore'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* SECTION 3: "DISCUSS WITH A PROFESSIONAL" */}
      {summary.discussWithDoctor.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-sky-700" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                Discuss with a professional
              </h2>
              <p className="text-[11px] text-slate-500">Things a clinician should weigh in on</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {summary.discussWithDoctor.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="bg-white rounded-2xl p-4 border border-sky-100/90 shadow-2xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 shrink-0">
                    Clinical Topic
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>

                <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[10px] text-slate-500 font-medium italic">
                    Educational information
                  </span>
                  <div className="flex items-center gap-2">
                    {item.articleId && (
                      <button
                        onClick={() => onOpenArticle(item.articleId!)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 transition cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Guide</span>
                      </button>
                    )}
                    <button
                      onClick={() => onNavigate('contact')}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition cursor-pointer"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Ask Iwosan</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Callout: Optional Next Step to Reach Iwosan */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="bg-slate-900 text-white rounded-3xl p-5 shadow-md space-y-3"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <CalendarCheck className="w-4 h-4" />
          <span>Optional Follow-Up</span>
        </div>
        <h3 className="text-base font-extrabold leading-snug">
          Want a trusted doctor to review these with you?
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Iwosan Lagoon Hospitals offers dedicated Women’s Health Consultations across Victoria Island, Ikoyi, Ikeja, and Lekki. Only if you choose.
        </p>

        <div className="pt-1 flex flex-col sm:flex-row gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('contact')}
            className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Book / Contact Iwosan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('screening-guide')}
            className="w-full py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>See Age Screening Matrix</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Share / Print / Retake Utilities */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 pt-1 print:hidden">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePrintSummary}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 hover:bg-slate-50 transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-slate-600" />
          <span>Save PDF / Print</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShareSummary}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 hover:bg-slate-50 transition cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Share App</span>
            </>
          )}
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center pt-2 print:hidden">
        <button
          onClick={onRetakeCheck}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake check from beginning</span>
        </button>
      </motion.div>
    </motion.div>
  );
};
