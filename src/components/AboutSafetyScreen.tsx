import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId } from '../types';
import { clearAllHealthData } from '../utils/healthLogic';
import {
  Heart,
  UserX,
  Smartphone,
  HeartHandshake,
  ShieldAlert,
  ToggleLeft,
  FileCheck,
  Bell,
  Phone,
  PhoneCall,
  GitFork,
  ChevronRight,
  Trash2,
  Check,
  X,
  Stethoscope,
  Building2,
  Sparkles,
} from 'lucide-react';

interface AboutSafetyScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onDataReset: () => void;
}

export const AboutSafetyScreen: React.FC<AboutSafetyScreenProps> = ({
  onNavigate,
  onDataReset,
}) => {
  const [resetDone, setResetDone] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);

  const handleReset = () => {
    clearAllHealthData();
    onDataReset();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2500);
  };

  const howItWorksSteps = [
    {
      step: '1. Scan',
      desc: 'Scan the conference QR code or open the link on any browser. No app store installation required.',
    },
    {
      step: '2. Continue',
      desc: 'Review the privacy promises. Everything remains entirely confidential and anonymous on your device.',
    },
    {
      step: '3. Answer',
      desc: 'Take 3–5 minutes to answer straightforward lifestyle, family history, and routine screening questions.',
    },
    {
      step: '4. Numbers',
      desc: 'Optionally record your blood pressure, blood glucose, or BMI from our health booth checks.',
    },
    {
      step: '5. Summary',
      desc: 'Receive personalized clinician-reviewed insights: What you’re doing well, Worth checking, and Topics to discuss.',
    },
    {
      step: '6. Next step',
      desc: 'Save or print your personalized summary card, or connect directly with an Iwosan doctor if you choose.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfe] text-slate-900 px-4 sm:px-5 pt-3 pb-24 max-w-md mx-auto text-left space-y-4">
      {/* Top Header Row */}
      <div className="flex items-center gap-3 pt-1 pb-1">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          aria-label="Return to Dashboard"
          className="w-10 h-10 rounded-full bg-[#f1f3f6] hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-900 transition cursor-pointer"
        >
          <Heart className="w-5 h-5 fill-slate-900 text-slate-900" />
        </button>

        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          About & safety
        </h1>
      </div>

      {/* Hero Green Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#38a946] rounded-[32px] p-6 text-slate-950 shadow-xs relative overflow-hidden"
      >
        {/* Brand Mini Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0a1820] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Heart className="w-4 h-4 fill-white text-white" />
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-wide text-slate-900/90 leading-tight block">
              Iwosan
            </span>
            <span className="text-sm font-bold text-slate-950 leading-tight block">
              HerHealth
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-[28px] sm:text-[31px] font-bold text-slate-950 tracking-tight leading-[1.15] mt-4">
          Privacy & safety, kept <br />
          <span className="italic font-normal">simple.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs text-slate-950/80 leading-relaxed font-medium mt-2 max-w-[340px]">
          Small, clear promises about how this works — written the way we&apos;d explain it to a friend.
        </p>

        {/* Feature Pills */}
        <div className="flex items-center gap-2 mt-5">
          <span className="bg-white/40 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full">
            3–5 min
          </span>
          <span className="bg-white/40 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full">
            No account
          </span>
          <span className="bg-white/40 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full">
            On-device
          </span>
        </div>
      </motion.div>

      {/* 6 Privacy & Safety Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Anonymous by default */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#eef3fb] flex items-center justify-center text-[#3b72c4]">
            <UserX className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Anonymous by default
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              No name, email or phone needed to use any part of HerHealth.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Stays on her device */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#e8f6ed] flex items-center justify-center text-[#22a053]">
            <Smartphone className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Stays on her device
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Answers aren&apos;t sent anywhere by default. Clearing browser data removes everything.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Details only if she chooses */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#e5f4fa] flex items-center justify-center text-[#0ea5e9]">
            <HeartHandshake className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Details only if she chooses
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Personal details are collected solely to request a follow-up — never automated marketing.
            </p>
          </div>
        </motion.div>

        {/* Card 4: Educate, never diagnose */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#edf0f9] flex items-center justify-center text-[#4b6cb7]">
            <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Educate, never diagnose
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              We never produce a risk score, a label or a diagnosis. We guide, gently.
            </p>
          </div>
        </motion.div>

        {/* Card 5: Marketing consent is separate */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#eaf7ee] flex items-center justify-center text-[#16a34a]">
            <ToggleLeft className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Marketing consent is separate
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Saying no to contact never blocks access to any part of the app.
            </p>
          </div>
        </motion.div>

        {/* Card 6: Clinical & legal sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-start"
        >
          <div className="w-9 h-9 rounded-xl bg-[#e0f3fa] flex items-center justify-center text-[#0284c7]">
            <FileCheck className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Clinical & legal sign-off
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
              Content is approved by Iwosan clinicians, in line with NDPA 2023 and a DPIA.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Emergency Guidance Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-[#f0f8ff] border border-[#d2eaf8] rounded-[24px] p-4 sm:p-5 space-y-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#d7edf9] flex items-center justify-center text-[#0284c7]">
            <Bell className="w-4 h-4 fill-[#0284c7]/20" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            This is not for emergencies
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          If you have chest pain, severe bleeding, difficulty breathing, thoughts of harming yourself, or another urgent symptom, do not use this app. Contact your local emergency services or go to the nearest emergency department immediately.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href="tel:112"
            className="w-full bg-[#0c1626] hover:bg-slate-900 active:scale-95 text-white py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer text-center"
          >
            <Phone className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Call 112</span>
          </a>

          <a
            href="tel:+234700496726"
            className="w-full bg-white hover:bg-slate-50 active:scale-95 border border-[#b8ddf4] text-[#006097] py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition cursor-pointer text-center"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Call 199 / Clinic</span>
          </a>
        </div>
      </motion.div>

      {/* "How it works" Row Card */}
      <motion.button
        type="button"
        onClick={() => setShowHowItWorksModal(true)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between cursor-pointer hover:bg-slate-50 transition active:scale-[0.99] text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#eef3fb] flex items-center justify-center text-slate-700 shrink-0">
            <GitFork className="w-4 h-4 text-slate-700" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              How it works
            </h3>
            <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
              Scan → Continue → Answer → Numbers → Summary → Next step
            </p>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
      </motion.button>

      {/* "Your data on this device" Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2.5"
      >
        <h3 className="text-xs font-bold text-slate-500 tracking-wide uppercase">
          Your data on this device
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          You have a saved check on this device. You can clear it at any time — it cannot be recovered.
        </p>

        <button
          type="button"
          onClick={handleReset}
          className="w-full py-3 px-4 rounded-full border border-slate-200/90 hover:bg-slate-50 active:scale-[0.98] text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
        >
          {resetDone ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Cleared from this device</span>
            </>
          ) : (
            <>
              <Trash2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Clear my check from this device</span>
            </>
          )}
        </button>
      </motion.div>

      {/* "About this app" Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5"
      >
        <h3 className="text-xs font-bold text-slate-500 tracking-wide uppercase">
          About this app
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Iwosan HerHealth is a conference companion app that stays useful afterwards. It runs as a web app — no app store, works on iPhone and Android, and can be added to your home screen from your browser menu.
        </p>

        <div className="space-y-2 pt-1 border-t border-slate-100 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Version</span>
            <span className="font-semibold text-slate-800">0.2 · Conference build</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-50">
            <span className="text-slate-400">Content</span>
            <span className="font-semibold text-slate-800">Reviewed by Iwosan clinicians</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-50">
            <span className="text-slate-400">Data handling</span>
            <span className="font-semibold text-slate-800">NDPA 2023 · DPIA completed</span>
          </div>
        </div>
      </motion.div>

      {/* "Talk to Iwosan (optional)" Primary Button */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        onClick={() => onNavigate('contact')}
        className="w-full py-4 px-5 rounded-full bg-[#0c1626] hover:bg-slate-900 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
      >
        <PhoneCall className="w-4 h-4 text-white" />
        <span>Talk to Iwosan (optional)</span>
      </motion.button>

      {/* Educational Footer Note */}
      <p className="text-[10px] text-slate-400 text-center font-normal pt-1 pb-4">
        Educational information, not a diagnosis. Iwosan Healthcare Systems.
      </p>

      {/* "How it works" Detailed Modal */}
      <AnimatePresence>
        {showHowItWorksModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-5 pb-8 sm:pb-6 shadow-2xl border border-slate-200 text-left space-y-4 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#eef3fb] flex items-center justify-center text-slate-700">
                    <Sparkles className="w-4 h-4 text-[#3b72c4]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">How HerHealth Works</h3>
                    <p className="text-[11px] text-slate-500">Six simple steps to proactive wellness</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHowItWorksModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-3 flex-1 pr-1">
                {howItWorksSteps.map((item) => (
                  <div key={item.step} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">{item.step}</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowHowItWorksModal(false)}
                className="w-full py-3 rounded-full bg-[#0c1626] text-white font-bold text-xs hover:bg-slate-900 transition cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
