import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Article, ScreenId } from '../types';
import { X, ShieldCheck, Clock, CheckCircle2, ArrowRight, Share2, CalendarCheck, BookOpen, ArrowLeft } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  hasCompletedCheck?: boolean;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onNavigate,
  hasCompletedCheck,
}) => {
  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: `${article.title} — Clinician-reviewed by Wellness Passport`,
        url: window.location.origin,
      }).catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 pb-20 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg rounded-3xl bg-slate-50 p-5 sm:p-7 shadow-2xl border border-slate-200 text-slate-900 max-h-[85vh] overflow-y-auto relative text-left my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {article.category}
              </span>
              <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition cursor-pointer"
                title="Share guide"
              >
                <Share2 className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-200/80 text-slate-700 flex items-center justify-center hover:bg-slate-300 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-4 leading-snug">
            {article.title}
          </h2>

          {/* Clinical Reviewer Banner */}
          <div className="my-4 p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Clinician Reviewed</span>
            </div>
            <p className="text-xs font-bold text-slate-900">
              {article.reviewerName}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {article.reviewerRole} · {article.reviewerHospital}
            </p>
            <p className="text-[10px] text-slate-400 font-semibold pt-0.5">
              {article.reviewDate} · Content updates dynamically
            </p>
          </div>

          {/* Article Body */}
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Key Takeaways Box */}
          <div className="my-5 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900 uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Key Takeaways</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-800">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Educational Disclaimer */}
          <p className="text-[11px] text-slate-500 italic text-center mb-5">
            Educational information, not a diagnosis. For personalized advice, consult with an Iwosan doctor.
          </p>

          {/* Actions Footer */}
          <div className="space-y-2 pt-1 border-t border-slate-200">
            {article.screenIdTarget && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  onNavigate(article.screenIdTarget!);
                }}
                className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{article.screenIdTarget === 'screening-guide' ? 'View Recommended Screenings' : 'Book a Consultation with Iwosan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            )}

            {hasCompletedCheck && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  onNavigate('summary');
                }}
                className="w-full py-2.5 px-4 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Health Awareness Summary</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-full bg-slate-200/70 text-slate-800 font-bold text-xs hover:bg-slate-300 transition cursor-pointer"
            >
              Close Guide
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
