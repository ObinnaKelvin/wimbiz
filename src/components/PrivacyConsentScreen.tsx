import React from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../types';
import { ShieldCheck, Lock, EyeOff, FileText, ArrowRight, HeartHandshake } from 'lucide-react';

interface PrivacyConsentScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onProceedToCheck: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
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

export const PrivacyConsentScreen: React.FC<PrivacyConsentScreenProps> = ({
  onNavigate,
  onProceedToCheck,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5 pb-24 pt-2 text-left"
    >
      {/* Category header */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-sky-800">
        <ShieldCheck className="w-4 h-4" />
        <span>Privacy & Expectations</span>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          Your health. Your device. <br />
          <span className="text-emerald-700">100% Private.</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Wellness Passport was created by WIMBIZ and Iwosan Lagoon Hospitals to provide fast, reliable health guidance with complete peace of mind.
        </p>
      </motion.div>

      {/* 4 Pillars of Privacy */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <motion.div
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">No Account or Login Required</h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              You never have to enter your name, email, phone number, or date of birth to complete the check and view your insights.
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center shrink-0 mt-0.5">
            <EyeOff className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">Answers Stay on Your Device</h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Your responses and numbers are evaluated purely in your phone’s browser memory. Zero personal health records are sent to cloud servers.
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">Consent-Led Follow-Up Only</h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Only if you explicitly decide to book a consultation or request a callback from Iwosan will you choose to provide your contact info.
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">Educate & Guide — Never Diagnose</h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              This tool provides evidence-based preventive awareness. A qualified clinician at Iwosan gives real clinical assessments.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="pt-3 space-y-2.5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onProceedToCheck}
          className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>I Understand — Start Awareness Check</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <button
          onClick={() => onNavigate('welcome')}
          className="w-full py-3 px-6 rounded-full bg-transparent text-slate-600 hover:text-slate-900 font-semibold text-xs transition cursor-pointer"
        >
          Back to Welcome Screen
        </button>
      </motion.div>
    </motion.div>
  );
};
