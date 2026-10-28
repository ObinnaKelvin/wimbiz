import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId } from '../types';
import {
  Heart,
  HeartPulse,
  ShieldCheck,
  Leaf,
  MoonStar,
  Stethoscope,
  FlaskConical,
  FileText,
  Lock,
  Info,
  QrCode,
  X,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  hasCompletedCheck: boolean;
  onOpenQR: () => void;
  onRetakeCheck?: () => void;
}

// 7 Planetary Icons orbiting like celestial bodies
const ORBIT_PLANETS = [
  { id: 'heart', icon: Heart, label: 'Heart & Breast Health' },
  { id: 'pulse', icon: HeartPulse, label: 'Vitals & Blood Pressure' },
  { id: 'shield', icon: ShieldCheck, label: 'Preventive Screenings' },
  { id: 'leaf', icon: Leaf, label: 'Nutrition & Lifestyle' },
  { id: 'moon', icon: MoonStar, label: 'Sleep & Recovery' },
  { id: 'stethoscope', icon: Stethoscope, label: 'Doctor Review' },
  { id: 'lab', icon: FlaskConical, label: 'Laboratory Diagnostics' },
];

// Exact orbital radius and equal angular spacing (360 / 7 ≈ 51.42857° each)
const ORBIT_RADIUS = 114;
const TOTAL_PLANETS = ORBIT_PLANETS.length;
const ANGLE_STEP = 360 / TOTAL_PLANETS;
// Heart icon is the anchor at 325°
const HEART_ANCHOR_ANGLE = 325;

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigate,
  hasCompletedCheck,
  onOpenQR,
  onRetakeCheck,
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleStartCheck = () => {
    if (hasCompletedCheck && onRetakeCheck) {
      onRetakeCheck();
    } else {
      onNavigate('check');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b18] via-[#091326] to-[#040813] text-white flex flex-col justify-between px-5 pt-5 pb-8 select-none relative overflow-hidden">
      {/* Background Ambient Radial Glow behind the Orbit */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP SECTION: Brand Header */}
      <div className="w-full relative z-20">
        {/* Top Header: Brand Logo + Info Button */}
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg">
              <img src="/icon.svg" alt="Wellness Passport Logo" className="w-full h-full rounded-lg object-contain" />
            </div>
            {/* Cyan Square Pulse Icon */}
            {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-teal-400 p-1 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.35)]">
              <svg className="w-5 h-5 text-white" viewBox="0 0 40 40" fill="none">
                <path
                  d="M4 20 H12 L16 10 L22 30 L26 15 L29 23 L32 20 H36"
                  stroke="#ffffff"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div> */}
            <div>
              <div className="text-sm font-extrabold tracking-wide text-white leading-tight">
                <span className="text-cyan-400">Wellness</span> Passport
              </div>
              <div className="text-[8px] font-bold tracking-[0.18em] text-slate-400 uppercase leading-none">
                IWOSAN X WIMBIZ
              </div>
            </div>
          </div>

          {/* Info Circle Button */}
          <button
            onClick={() => setShowInfoModal(true)}
            aria-label="Information and About"
            className="w-8 h-8 rounded-full border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CENTER SECTION: Planetary Orbit Graphic with Circular Animation */}
      <div className="relative my-auto flex flex-col items-center justify-center py-2 z-10">
        <div className="relative w-[280px] h-[280px] flex items-center justify-center">
          {/* Concentric Stationary Ring Tracks */}
          {/* Outer subtle guide ring */}
          <div className="absolute w-[276px] h-[276px] rounded-full border border-slate-700/25 pointer-events-none" />

          {/* MAIN CELESTIAL ORBIT TRACK: The exact circular line shared by the Heart icon and all 6 planetary icons */}
          <div
            style={{ width: `${ORBIT_RADIUS * 2}px`, height: `${ORBIT_RADIUS * 2}px` }}
            className="absolute rounded-full border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.18)] pointer-events-none"
          />

          {/* Inner subtle guide ring */}
          <div className="absolute w-[160px] h-[160px] rounded-full border border-slate-800/60 pointer-events-none" />

          {/* STATIONARY CENTRAL CORE */}
          <div className="relative z-10 flex items-center justify-center pointer-events-none">
            {/* Outer Soft Glow */}
            <div className="absolute w-32 h-32 rounded-full bg-cyan-500/15 blur-xl animate-pulse" />

            {/* Thick White Contrast Ring */}
            <div className="w-24 h-24 rounded-full border-[6px] border-white bg-[#060c18] flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.2)]">
              {/* Dark Inner Inset */}
              <div className="w-16 h-16 rounded-full bg-[#050b18] flex items-center justify-center p-1 border border-slate-800">
                {/* Cyan Center Ball with ECG Heartbeat */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center shadow-[0_0_16px_rgba(6,182,212,0.6)]">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M5 20 H12 L16 11 L22 29 L26 15 L29 23 L32 20 H35"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ROTATING PLANETARY ORBIT SYSTEM */}
          {/* The parent container rotates 360° continuously like planets around the sun */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 34,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 w-full h-full pointer-events-auto"
          >
            {ORBIT_PLANETS.map((planet, index) => {
              // 7 Planetary icons with exact equal spacing (360 / 7 ≈ 51.42857° each)
              // All situated on the EXACT same orbital line/track as the 'heart' icon (ORBIT_RADIUS = 114px)
              const angle = (HEART_ANCHOR_ANGLE + index * ANGLE_STEP) % 360;
              const rad = (angle * Math.PI) / 180;
              const x = ORBIT_RADIUS * Math.cos(rad);
              const y = ORBIT_RADIUS * Math.sin(rad);

              return (
                <div
                  key={planet.id}
                  style={{
                    left: `calc(50% + ${x}px - 18px)`,
                    top: `calc(50% + ${y}px - 18px)`,
                  }}
                  className="absolute w-9 h-9"
                  title={planet.label}
                >
                  {/* Counter-rotation keeps each icon perfectly upright while orbiting */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 34,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    whileHover={{ scale: 1.15 }}
                    className="w-9 h-9 rounded-full bg-[#0d172a] border border-slate-600/80 shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center justify-center text-slate-200 hover:text-emerald-300 hover:border-emerald-400/80 transition-colors cursor-pointer"
                  >
                    <planet.icon className="w-4 h-4 stroke-[1.8]" />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* TYPOGRAPHY SECTION */}
        <div className="text-center space-y-3 mt-4 max-w-sm px-2">
          {/* Conference Kicker */}
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-slate-400 uppercase">
            W I M B I Z &nbsp; C o n f e r e n c e &nbsp; · &nbsp; 2 0 2 6
          </p>

          {/* Main Headline */}
          <h1 className="text-[32px] sm:text-[38px] font-extrabold text-white tracking-tight leading-[1.12]">
            A healthier woman<br />
            starts with{' '}
            <span className="text-[#34d399] italic font-bold">awareness.</span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed max-w-[310px] mx-auto pt-0.5">
            A 3–5 minute health-awareness check, women's health you can trust, and an easy path to Iwosan if you'd like one.
          </p>
        </div>
      </div>

      {/* BOTTOM SECTION: Primary Action Buttons & Privacy Footnote */}
      <div className="w-full space-y-3 pt-3 relative z-20 max-w-sm mx-auto">
        {/* Primary CTA: Start my health check */}
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          id="btn-start-health-check"
          onClick={handleStartCheck}
          className="w-full py-4 px-6 rounded-full bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-950 font-bold text-sm sm:text-base shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <FileText className="w-4 h-4 text-slate-950" />
          <span>{hasCompletedCheck ? 'Retake my health check' : 'Start my health check'}</span>
        </motion.button>

        {/* Secondary CTA: Explore health topics */}
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          id="btn-explore-topics"
          onClick={() => onNavigate('womens-health')}
          className="w-full py-4 px-6 rounded-full bg-[#0d1629]/90 hover:bg-[#13203b] text-white font-semibold text-sm sm:text-base border border-slate-700/80 shadow-md transition-all text-center cursor-pointer"
        >
          <span>Explore health topics</span>
        </motion.button>

        {/* Previous Summary / Dashboard Quick Link (if user took test previously) */}
        {hasCompletedCheck && (
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full py-1 text-center text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Go to your health dashboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Privacy Footnote */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-400 font-normal pt-0.5">
          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>No account needed · answers stay on your device</span>
        </div>
      </div>

      {/* QUICK INFO MODAL (Triggered by the top-right (i) button) */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="bg-[#0b1426] border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-white space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm tracking-tight text-white">
                    Wellness Passport
                  </h3>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-300 space-y-2.5 leading-relaxed">
                <p>
                  <strong className="text-white">WIMBIZ × Iwosan Lagoon Hospitals:</strong> A health-awareness initiative designed for women leaders and professionals at the WIMBIZ Annual Conference 2026.
                </p>
                <p>
                  <strong className="text-white">Our Clinical Promise:</strong> Educate and guide — never diagnose. All insights are reviewed by licensed medical specialists.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    onOpenQR();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                    Share Conference App QR Code
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    onNavigate('about');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-between transition cursor-pointer"
                >
                  <span>Safety, Disclaimer & Reset Data</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    onNavigate('contact');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-between transition cursor-pointer"
                >
                  <span>Hospitals & Specialist Directory</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    onNavigate('admin');
                  }}
                  className="w-full py-2 px-3 text-[11px] font-semibold text-slate-400 hover:text-slate-200 text-center transition cursor-pointer"
                >
                  Staff Administrator Portal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
