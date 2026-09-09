import React from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { Sparkles, ShieldCheck, Heart, ArrowRight, BookOpen, Stethoscope, ChevronRight, Lock, Award } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  hasCompletedCheck: boolean;
  onOpenQR: () => void;
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
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigate,
  hasCompletedCheck,
  onOpenQR,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-24 pt-2"
    >
      {/* Top Pill Badge */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/90 shadow-2xs cursor-default"
        >
          <span className="bg-slate-900 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            WIMBIZ
          </span>
          <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wide">
            × IWOSAN · HER HEALTH
          </span>
        </motion.div>
      </motion.div>

      {/* Main Headline */}
      <motion.div variants={itemVariants} className="space-y-3 pt-2 text-left">
        <h1 className="text-4xl sm:text-[42px] font-black tracking-tight text-slate-900 leading-[1.08]">
          A healthier <br />
          woman starts <br />
          with <span className="text-emerald-700">awareness.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg font-bold text-sky-700 tracking-tight">
          Check. Learn. Screen. Thrive.
        </p>

        {/* Description */}
        <p className="text-sm font-normal text-slate-600 leading-relaxed max-w-sm">
          A 3–5 minute health-awareness check, women’s health you can trust, and an easy path to Iwosan if you’d like one.
        </p>
      </motion.div>

      {/* Primary Action Buttons */}
      <motion.div variants={itemVariants} className="space-y-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          id="btn-start-health-check"
          onClick={() => onNavigate('check')}
          className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>{hasCompletedCheck ? 'Retake my health check' : 'Start my health check'}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          id="btn-explore-topics"
          onClick={() => onNavigate('womens-health')}
          className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm shadow-2xs hover:border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-emerald-800" />
          <span>Explore health topics</span>
        </motion.button>

        {hasCompletedCheck && (
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            id="btn-view-summary"
            onClick={() => onNavigate('summary')}
            className="w-full py-3 px-6 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>View your previous health summary</span>
          </motion.button>
        )}
      </motion.div>

      {/* Privacy Guarantee */}
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-800 text-center pt-1">
        <span>✓ No account needed · answers stay on your device</span>
      </motion.div>

      {/* Golden Clinical Rule Callout Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2"
      >
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>Our Clinical Promise</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          <strong className="text-slate-900">Educate and guide — never diagnose.</strong> We help you understand your health, do a few simple checks, see what’s worth discussing with a doctor, and connect with Iwosan Lagoon Hospitals if you choose.
        </p>
      </motion.div>

      {/* Quick Access Modules Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 pt-2">
        {/* Module 1: Add Numbers */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          onClick={() => onNavigate('numbers')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-colors cursor-pointer flex flex-col justify-between group"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-3">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              Add Your Numbers
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">BP, Blood Sugar & BMI</p>
          </div>
          <div className="mt-3 flex items-center text-[11px] font-bold text-emerald-700 gap-1">
            <span>Calculate</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </motion.div>

        {/* Module 2: Screening Guide */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          onClick={() => onNavigate('screening-guide')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-colors cursor-pointer flex flex-col justify-between group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              Screening Guide
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Age-specific checks</p>
          </div>
          <div className="mt-3 flex items-center text-[11px] font-bold text-emerald-700 gap-1">
            <span>View matrix</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </motion.div>
      </motion.div>

      {/* Conference QR Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-slate-900 text-white rounded-2xl p-4 shadow-md flex items-center justify-between gap-3"
      >
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md">
            WIMBIZ Conference
          </span>
          <p className="text-sm font-bold mt-1 text-white">Share with a Colleague</p>
          <p className="text-xs text-slate-300">Show QR code for instant camera scan.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenQR}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shrink-0 cursor-pointer shadow-xs"
        >
          Show QR
        </motion.button>
      </motion.div>

      {/* PWA Install Banner */}
      <motion.div variants={itemVariants}>
        <PWAInstallButton variant="banner" />
      </motion.div>

      {/* Privacy & Safety Note */}
      <motion.div variants={itemVariants} className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
        <button
          onClick={() => onNavigate('privacy')}
          className="flex items-center gap-1 hover:text-slate-800 transition underline cursor-pointer"
        >
          <Lock className="w-3 h-3" />
          <span>Privacy & Zero Tracking</span>
        </button>
        <button
          onClick={() => onNavigate('about')}
          className="hover:text-slate-800 transition underline cursor-pointer"
        >
          Clinical Editorial Team
        </button>
      </motion.div>
    </motion.div>
  );
};
