import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, HealthNumbers } from '../types';
import { calculateBMI } from '../utils/healthLogic';
import { getHealthQuestions } from '../data/questions';
import {
  Heart,
  HeartPulse,
  Droplet,
  Scale,
  ShieldCheck,
  Check,
  ChevronRight,
  ArrowRight,
  FileText,
  Lock,
  Sun,
  Calendar,
  BookOpen,
  Info,
  Footprints,
  Sparkles,
  X,
  ExternalLink,
} from 'lucide-react';

interface DashboardScreenProps {
  answers: Record<string, string>;
  numbers: HealthNumbers;
  onNavigate: (screen: ScreenId) => void;
  onOpenArticle: (articleId: string) => void;
  onRetakeCheck?: () => void;
  onOpenQR?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  answers,
  numbers,
  onNavigate,
  onOpenArticle,
  onRetakeCheck,
  onOpenQR,
}) => {
  const [stepCompleted, setStepCompleted] = useState<boolean>(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      return localStorage.getItem(`wp_step_done_${today}`) === 'true';
    } catch {
      return false;
    }
  });

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Dynamic time-based greeting
  const [greeting, setGreeting] = useState('Good morning');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleToggleStep = () => {
    const next = !stepCompleted;
    setStepCompleted(next);
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`wp_step_done_${today}`, String(next));
    } catch {
      // ignore
    }
  };

  // Metrics calculations
  const questions = getHealthQuestions(answers);
  const totalQuestions = questions.length;
  const answeredCount = questions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] !== ''
  ).length;

  const bmiData =
    numbers.height && numbers.weight
      ? calculateBMI(numbers.weight, numbers.height, numbers.unitSystem || 'metric')
      : null;

  let readingsCount = 0;
  if (numbers.systolic || numbers.diastolic) readingsCount++;
  if (numbers.bloodSugar) readingsCount++;
  if (numbers.height) readingsCount++;
  if (numbers.weight) readingsCount++;
  if (numbers.cholesterol) readingsCount++;

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="w-full min-h-screen bg-[#070e1b] text-white flex flex-col justify-start select-none relative pb-16">
      {/* ============================================================ */}
      {/* 1. TOP DARK HERO SECTION                                    */}
      {/* ============================================================ */}
      <div className="w-full bg-gradient-to-b from-[#060c18] via-[#091428] to-[#0a1526] px-5 pt-5 pb-8 relative">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Bar */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            {/* Cyan circular pulse icon */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 p-1 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <svg className="w-4 h-4 text-white" viewBox="0 0 40 40" fill="none">
                <path
                  d="M4 20 H12 L16 10 L22 30 L26 15 L29 23 L32 20 H36"
                  stroke="#ffffff"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-wide text-white leading-tight">
                Wellness Passport
              </div>
              <div className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                <span>Private · saved on this device</span>
              </div>
            </div>
          </div>

          {/* Privacy & Lock Button */}
          <button
            onClick={() => setShowPrivacyModal(true)}
            title="Privacy & Data Control"
            aria-label="Privacy & Security"
            className="w-8 h-8 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
          >
            <Lock className="w-3.5 h-3.5 text-slate-300" />
          </button>
        </div>

        {/* Greeting & Headline */}
        <div className="mt-7 mb-5 relative z-10">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium tracking-wide">
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span>{greeting}</span>
          </div>
          <h1 className="text-[32px] sm:text-[36px] font-extrabold text-white tracking-tight leading-[1.12] mt-2">
            Your health,<br />
            in one <span className="font-serif italic font-normal text-slate-100">calm</span> place.
          </h1>
        </div>

        {/* Check Complete Card Banner */}
        <button
          onClick={() => onNavigate('summary')}
          className="w-full bg-[#111e36]/90 hover:bg-[#162746] border border-slate-700/70 rounded-2xl p-3.5 flex items-center justify-between text-left transition shadow-md active:scale-[0.99] cursor-pointer relative z-10 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 stroke-[2.8]" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                Check complete · {formattedDate}
              </div>
              <div className="text-[11px] text-slate-400 leading-none mt-0.5">
                Tap to revisit your summary
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition" />
        </button>

        {/* 3 Metrics Row */}
        <div className="grid grid-cols-3 gap-2.5 mt-3 relative z-10">
          {/* Card 1: Answered */}
          <button
            onClick={() => onNavigate('check')}
            className="bg-[#101b30]/80 hover:bg-[#14223d] border border-slate-700/60 rounded-2xl p-3 flex flex-col justify-between text-left transition cursor-pointer min-h-[72px]"
          >
            <div className="text-xl font-extrabold text-white tracking-tight leading-none">
              {answeredCount}/{totalQuestions}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Answered</div>
          </button>

          {/* Card 2: BMI */}
          <button
            onClick={() => onNavigate('numbers')}
            className="bg-[#101b30]/80 hover:bg-[#14223d] border border-slate-700/60 rounded-2xl p-3 flex flex-col justify-between text-left transition cursor-pointer min-h-[72px]"
          >
            <div className="text-xl font-extrabold text-white tracking-tight leading-none">
              {bmiData ? bmiData.bmi : '—'}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">BMI</div>
          </button>

          {/* Card 3: Readings */}
          <button
            onClick={() => onNavigate('numbers')}
            className="bg-[#101b30]/80 hover:bg-[#14223d] border border-slate-700/60 rounded-2xl p-3 flex flex-col justify-between text-left transition cursor-pointer min-h-[72px]"
          >
            <div className="text-xl font-extrabold text-white tracking-tight leading-none">
              {readingsCount}/5
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Readings</div>
          </button>
        </div>

        {/* Floating "Your summary is waiting" Card */}
        <div className="mt-4 bg-gradient-to-b from-[#0d182e] to-[#070e1b] rounded-3xl p-5 border border-slate-700/80 shadow-2xl space-y-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-800/90 border border-slate-700/70 flex items-center justify-center flex-shrink-0 text-slate-200 shadow-inner">
              <FileText className="w-5 h-5 text-slate-200" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Your summary is waiting
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                Keep doing, worth checking, and what to discuss — in plain language.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('summary')}
            className="w-full py-3 px-5 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-950 font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
          >
            <span>Open my summary</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. LIGHT CONTENT BODY SECTION                                */}
      {/* ============================================================ */}
      <div className="w-full bg-[#f8fafc] text-slate-900 rounded-t-[28px] -mt-3 px-4 sm:px-5 pt-6 pb-24 space-y-7 shadow-lg">
        {/* Section: Your numbers */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Your numbers
              </h2>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Only what you chose to add
              </p>
            </div>
            <button
              onClick={() => onNavigate('numbers')}
              className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-0.5 transition cursor-pointer"
            >
              <span>Update</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Card 1: BMI */}
            <button
              onClick={() => onNavigate('numbers')}
              className="bg-[#edf6ff] border border-sky-100 hover:border-sky-300 rounded-2xl p-3 flex flex-col justify-between text-left min-h-[128px] transition shadow-2xs group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-xs">
                <Scale className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-lg font-extrabold text-slate-800 leading-tight">
                  {bmiData ? bmiData.bmi : '—'}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">BMI</div>
                <div className="text-[9px] text-slate-400 leading-tight mt-0.5">
                  {bmiData ? bmiData.category : 'Add height & weight'}
                </div>
              </div>
            </button>

            {/* Card 2: Blood Pressure */}
            <button
              onClick={() => onNavigate('numbers')}
              className="bg-[#f5f3ff] border border-indigo-100 hover:border-indigo-300 rounded-2xl p-3 flex flex-col justify-between text-left min-h-[128px] transition shadow-2xs group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#2e1065] text-white flex items-center justify-center shadow-xs">
                <HeartPulse className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-lg font-extrabold text-slate-800 leading-tight">
                  {numbers.systolic && numbers.diastolic
                    ? `${numbers.systolic}/${numbers.diastolic}`
                    : '—'}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">Blood pressure</div>
                <div className="text-[9px] text-slate-400 leading-tight mt-0.5">
                  {numbers.systolic ? 'Logged reading' : 'Add a reading'}
                </div>
              </div>
            </button>

            {/* Card 3: Blood Sugar */}
            <button
              onClick={() => onNavigate('numbers')}
              className="bg-[#f0fdf4] border border-emerald-100 hover:border-emerald-300 rounded-2xl p-3 flex flex-col justify-between text-left min-h-[128px] transition shadow-2xs group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#15803d] text-white flex items-center justify-center shadow-xs">
                <Droplet className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-lg font-extrabold text-slate-800 leading-tight">
                  {numbers.bloodSugar ? numbers.bloodSugar : '—'}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">Blood sugar</div>
                <div className="text-[9px] text-slate-400 leading-tight mt-0.5">
                  {numbers.bloodSugar ? numbers.sugarUnit : 'Add a reading'}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Section: Because of your answers */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Because of your answers
              </h2>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Three things worth a few minutes
              </p>
            </div>
            <button
              onClick={() => onNavigate('womens-health')}
              className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-0.5 transition cursor-pointer"
            >
              <span>Library</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Recommendation 1: Heart Health */}
            <button
              onClick={() => onOpenArticle('heart-health-women')}
              className="w-full bg-white hover:bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs transition group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                  <img
                    src="/assets/aistudio/image_572b6d90.png"
                    alt="Heart health"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-rose-500">
                    <Heart className="w-3 h-3 fill-rose-500" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="text-slate-400 font-semibold">01</span>
                    <span>Heart health</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mt-0.5">
                    A two-minute blood pressure check is the simplest heart-health habit there is.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0 transition" />
            </button>

            {/* Recommendation 2: Diabetes */}
            <button
              onClick={() => onOpenArticle('diabetes-prevention')}
              className="w-full bg-white hover:bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs transition group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=240&q=80"
                    alt="Diabetes prevention"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-emerald-600">
                    <Droplet className="w-3 h-3 fill-emerald-600" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="text-slate-400 font-semibold">02</span>
                    <span>Diabetes</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mt-0.5">
                    A simple sugar test tells you where you stand — no guessing needed.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0 transition" />
            </button>

            {/* Recommendation 3: Nutrition */}
            <button
              onClick={() => onOpenArticle('nutrition-habits')}
              className="w-full bg-white hover:bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs transition group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=240&q=80"
                    alt="Nutrition"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-teal-600">
                    <Sparkles className="w-3 h-3 text-teal-600" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="text-slate-400 font-semibold">03</span>
                    <span>Nutrition</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mt-0.5">
                    One extra serving of vegetables a day is the easiest upgrade you can make.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0 transition" />
            </button>
          </div>
        </div>

        {/* Section: Next check banner */}
        <button
          onClick={() => onNavigate('screening-guide')}
          className="w-full bg-white hover:bg-slate-50/90 border border-slate-200/90 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xs transition text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0b172a] text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                Next check · Screening guide
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                Cervical screening (smear / HPV test)
              </div>
              <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Usually every 3–5 years from around age 25 to 64
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0 transition" />
        </button>

        {/* Section: Today's small step */}
        <div className="bg-[#ecfdf5] border border-emerald-200/80 rounded-2xl p-4 space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="bg-emerald-100/90 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span>🌱</span>
              <span>Today's small step</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-800">1 minute</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5">
              <Footprints className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Ten minutes after a meal
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                A short walk after eating helps your body handle blood sugar — and it counts as movement.
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleStep}
            className={`w-full py-2.5 px-4 font-bold text-xs rounded-full flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer ${
              stepCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-white hover:bg-emerald-50/60 border border-emerald-200 text-emerald-800'
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[2.8]" />
            <span>{stepCompleted ? 'Done today! Great job!' : 'Mark as done'}</span>
          </button>
        </div>

        {/* Section: Worth reading */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Worth reading
              </h2>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Reviewed by the Iwosan team
              </p>
            </div>
            <button
              onClick={() => onNavigate('womens-health')}
              className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-0.5 transition cursor-pointer"
            >
              <span>See all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Featured Article Card */}
          <div
            onClick={() => onOpenArticle('breast-health')}
            className="w-full bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition duration-200 cursor-pointer group"
          >
            {/* Image Header with 4 min read pill */}
            <div className="relative h-44 sm:h-48 w-full bg-slate-200 overflow-hidden">
              <img
                src="/assets/aistudio/image_a986066b.png"
                alt="Knowing what's normal for you"
                className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                4 min read
              </div>
            </div>

            {/* Article Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                Knowing what's normal for you
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                Breast awareness is not about checking for cancer every morning. It's about knowing how your breasts normally look and feel.
              </p>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Clinician reviewed</span>
                </div>
                <span>14 August 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Action Buttons */}
        <div className="space-y-2.5 pt-1">
          {/* Button 1: Talk to Iwosan */}
          <button
            onClick={() => onNavigate('contact')}
            className="w-full py-3.5 px-5 bg-[#0b172a] hover:bg-[#132238] active:bg-[#1a2d4b] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Talk to Iwosan</span>
          </button>

          {/* Button 2: Explore the health library */}
          <button
            onClick={() => onNavigate('womens-health')}
            className="w-full py-3.5 px-5 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 text-slate-900 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-2xs transition active:scale-[0.99] cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-700" />
            <span>Explore the health library</span>
          </button>
        </div>

        {/* Section: Educational Information Disclaimer Box */}
        <div className="bg-[#f0f9ff] border border-sky-100/90 rounded-2xl p-4 flex gap-3 text-left">
          <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-slate-900">
              Educational information, not a diagnosis.
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
              Nothing here labels you as high or low risk. If something worries you, speak to a clinician.
            </p>
          </div>
        </div>

        {/* Journey Footnote Link */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('about')}
            className="text-[11px] text-slate-400 hover:text-slate-600 font-medium transition cursor-pointer"
          >
            How Wellness Passport works · The 6-step journey
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. PRIVACY & SECURITY MODAL                                  */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Your Health Data is Private
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                All assessment answers and health readings are saved only inside your browser’s local storage on this phone. We never transmit your personal identifying info.
              </p>

              <div className="mt-5 space-y-2">
                <button
                  onClick={() => {
                    setShowPrivacyModal(false);
                    onNavigate('about');
                  }}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  View Safety & Data Controls
                </button>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="w-full py-2.5 px-4 bg-[#0b172a] hover:bg-[#132238] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
