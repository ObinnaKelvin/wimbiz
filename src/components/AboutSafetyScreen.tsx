import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../types';
import { clearAllHealthData } from '../utils/healthLogic';
import {
  ShieldAlert,
  Lock,
  Heart,
  Phone,
  Trash2,
  Check,
  AlertTriangle,
  Award,
  ExternalLink,
} from 'lucide-react';

interface AboutSafetyScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onDataReset: () => void;
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

export const AboutSafetyScreen: React.FC<AboutSafetyScreenProps> = ({ onNavigate, onDataReset }) => {
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    clearAllHealthData();
    onDataReset();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2500);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-28 pt-2 text-left max-w-md mx-auto"
    >
      {/* Category header */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800">
        <Award className="w-4 h-4 text-emerald-700" />
        <span>Clinical Governance & Safety</span>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          About, Safety & Privacy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Wellness Passport is a joint initiative by WIMBIZ and Iwosan Lagoon Hospitals to champion female health awareness.
        </p>
      </motion.div>

      {/* Medical Safety Disclaimer Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="bg-rose-50/70 border border-rose-200/70 rounded-3xl p-5 space-y-2 text-left"
      >
        <div className="flex items-center gap-2 text-xs font-black text-rose-900">
          <ShieldAlert className="w-4 h-4 text-rose-800" />
          <span>Full Clinical Safety Disclaimer</span>
        </div>
        <p className="text-xs text-rose-900 leading-relaxed font-medium">
          Wellness Passport is strictly an educational self-awareness application. It is <strong>never a substitute for professional clinical judgment, diagnosis, or treatment</strong>.
        </p>
        <p className="text-xs text-rose-900/90 leading-relaxed">
          Always consult a licensed medical professional at Iwosan Lagoon Hospitals or your personal physician if you experience concerning symptoms, persistent pain, unexpected bleeding, or high blood pressure readings.
        </p>
      </motion.div>

      {/* Emergency Resources Box */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="bg-rose-950 text-white rounded-3xl p-5 space-y-3 shadow-md"
      >
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-300">
          <AlertTriangle className="w-4 h-4 text-rose-300" />
          <span>Emergency Assistance</span>
        </div>
        <p className="text-xs text-rose-100 leading-relaxed">
          If you or someone you know is experiencing acute severe chest pain, sudden difficulty breathing, sudden severe weakness or numbness, please seek immediate emergency care:
        </p>
        <div className="space-y-2 pt-1">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="tel:+23418888888"
            className="w-full py-2.5 px-4 rounded-xl bg-white text-rose-950 font-bold text-xs flex items-center justify-between hover:bg-rose-50 transition"
          >
            <span>Iwosan Lagoon 24/7 Ambulance Hotline</span>
            <span className="font-extrabold">0700-LAGOON</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="tel:112"
            className="w-full py-2.5 px-4 rounded-xl bg-rose-900 text-white font-bold text-xs flex items-center justify-between hover:bg-rose-800 transition"
          >
            <span>Lagos State Emergency Response</span>
            <span className="font-extrabold">112 / 767</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Privacy Commitment */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
          <Lock className="w-4 h-4" />
          <span>Our Privacy Standard</span>
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          Zero Tracker Cookies. Zero Health Data Storage.
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          We believe personal health inquiry must be completely confidential. You can explore, calculate your BMI, and view summaries with total freedom.
        </p>
      </motion.div>

      {/* Wipe / Clear Local Data Button */}
      <motion.div variants={itemVariants} className="bg-slate-100/90 rounded-2xl p-4 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-800">Clear Device Cache</h4>
            <p className="text-[11px] text-slate-500">
              Reset all answered questions and saved numbers on this phone.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            {resetDone ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Cleared</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Data</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Collaboration Note */}
      <motion.div variants={itemVariants} className="text-center pt-2 space-y-1">
        <p className="text-xs font-bold text-slate-700">
          Wellness Passport · WIMBIZ × IWOSAN
        </p>
        <p className="text-[11px] text-slate-500">
          Version 1.0.0 (Progressive Web Application)
        </p>
      </motion.div>
    </motion.div>
  );
};
