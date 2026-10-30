import React, { useState } from 'react';
import { HealthNumbers, ScreenId, SummaryResults } from '../types';
import { generateSummary, calculateBMI } from '../utils/healthLogic';
import { getHealthQuestions } from '../data/questions';
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Printer,
  Sparkles,
  Check,
  Compass,
  Stethoscope,
  Info,
  Footprints,
  Moon,
  Heart,
  Leaf,
  Calendar,
  Droplet,
  Users,
  ShieldCheck,
  ClipboardList,
  RotateCcw,
  ChevronRight,
  PhoneCall,
  HeartHandshake,
  QrCode,
  BookOpen,
} from 'lucide-react';

interface SummaryScreenProps {
  answers: Record<string, string>;
  numbers: HealthNumbers;
  onNavigate: (screen: ScreenId) => void;
  onOpenArticle: (articleId: string) => void;
  onRetakeCheck: () => void;
  onReviewSelections?: () => void;
  onOpenQR?: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  answers,
  numbers,
  onNavigate,
  onOpenArticle,
  onRetakeCheck,
  onReviewSelections,
  onOpenQR,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const summary: SummaryResults = generateSummary(answers, numbers);

  const questions = getHealthQuestions(answers);
  const totalQuestions = questions.length;
  const answeredCount = questions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] !== ''
  ).length;

  const bmiData =
    numbers.height && numbers.weight
      ? calculateBMI(numbers.weight, numbers.height, numbers.unitSystem || 'metric')
      : null;

  // High-fidelity print snapshot trigger
  const handlePrintSummary = () => {
    const originalTitle = document.title;
    document.title = `Wellness_Passport_Health_Summary_${new Date().toISOString().split('T')[0]}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleShareSummary = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Wellness Passport Health Summary',
        text: 'I just completed my Health Awareness Check on Wellness Passport.',
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Helper to pick an intuitive category icon matching the screenshot
  const getInsightIcon = (title: string, defaultType: 'keep' | 'check' | 'discuss') => {
    const lower = title.toLowerCase();
    if (lower.includes('movement') || lower.includes('walk') || lower.includes('exercise') || lower.includes('activity')) {
      return <Footprints className="w-4 h-4 text-slate-700" />;
    }
    if (lower.includes('sleep') || lower.includes('rest') || lower.includes('bed')) {
      return <Moon className="w-4 h-4 text-slate-700" />;
    }
    if (lower.includes('pressure') || lower.includes('bp') || lower.includes('heart') || lower.includes('cardio')) {
      return <Heart className="w-4 h-4 text-rose-600" />;
    }
    if (lower.includes('nutrition') || lower.includes('diet') || lower.includes('serving') || lower.includes('food')) {
      return <Leaf className="w-4 h-4 text-teal-600" />;
    }
    if (lower.includes('routine') || lower.includes('check-up') || lower.includes('appointment')) {
      return <Calendar className="w-4 h-4 text-sky-600" />;
    }
    if (lower.includes('sugar') || lower.includes('glucose') || lower.includes('diabetes')) {
      return <Droplet className="w-4 h-4 text-blue-600" />;
    }
    if (lower.includes('family') || lower.includes('history') || lower.includes('relative')) {
      return <Users className="w-4 h-4 text-emerald-700" />;
    }
    if (lower.includes('screening') || lower.includes('smear') || lower.includes('hpv') || lower.includes('mammogram')) {
      return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
    }

    if (defaultType === 'keep') return <Check className="w-4 h-4 text-slate-700" />;
    if (defaultType === 'check') return <Compass className="w-4 h-4 text-sky-600" />;
    return <Stethoscope className="w-4 h-4 text-emerald-700" />;
  };

  // Curated fallback items that mirror the exact screenshot if answers are empty
  const displayKeepDoing = summary.keepDoing.length > 0 ? summary.keepDoing : [
    {
      id: 'default_movement',
      title: 'Movement is part of your week',
      description: 'Consistency beats intensity. Whatever you are doing, it counts.',
      articleId: 'healthy-micro-habits',
    },
    {
      id: 'default_sleep',
      title: 'Your sleep is mostly restorative',
      description: 'Rest is doing real work for your hormones, mood and appetite. Protect it.',
      articleId: 'sleep-stress',
    },
  ];

  const displayWorthChecking = summary.worthChecking.length > 0 ? summary.worthChecking : [
    {
      id: 'default_bp',
      title: 'A blood pressure check is worth booking',
      description: 'It takes two minutes and often has no symptoms to warn you. A good next step.',
      articleId: 'heart-health-women',
    },
    {
      id: 'default_nutrition',
      title: 'One extra serving a day',
      description: 'It is the easiest nutrition upgrade there is. Add it to a meal you already eat.',
      articleId: 'heart-health-women',
    },
    {
      id: 'default_routine',
      title: 'A routine check-up is due',
      description: 'Bring your last readings and two questions. That turns a quick visit into a useful one.',
      articleId: 'preventive-care-matrix',
    },
    {
      id: 'default_sugar',
      title: 'Blood sugar is worth checking',
      description: 'A simple fasting or HbA1c test tells you where you stand — no guessing needed.',
      articleId: 'diabetes-prevention',
    },
  ];

  const displayDiscussWithDoctor = summary.discussWithDoctor.length > 0 ? summary.discussWithDoctor : [
    {
      id: 'default_family',
      title: 'Your family history is useful context',
      description: 'Mention it at your next appointment — it helps a clinician ask the right questions.',
      articleId: 'preventive-care-matrix',
    },
    {
      id: 'default_screening',
      title: 'Worth talking about screening',
      description: 'The screening guide shows which checks usually apply at your stage of life.',
      articleId: 'breast-health',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#070e1b] text-white flex flex-col justify-start select-none relative pb-28 print:pb-0 print:bg-white print:text-slate-900 print:w-full print:max-w-[430px] print:mx-auto">
      {/* ============================================================ */}
      {/* 1. TOP WHITE STATUS & BRAND BAR                             */}
      {/* ============================================================ */}
      <div className="bg-white text-slate-900 px-5 pt-3.5 pb-3 flex items-center justify-between border-b border-slate-100 shadow-2xs relative z-20 print:border-b-0 print:shadow-none print:px-2 print:pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            aria-label="Go to dashboard"
            className="w-10 h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-800 transition cursor-pointer print:bg-slate-100 print:border print:border-slate-200"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Your summary
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {onOpenQR && (
            <button
              type="button"
              onClick={onOpenQR}
              aria-label="Share Conference QR Code"
              title="Share QR Code"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-700 shadow-2xs transition cursor-pointer print:hidden"
            >
              <QrCode className="w-4 h-4 stroke-[2.2]" />
            </button>
          )}
          <div className="text-sm font-medium text-slate-400 tracking-normal hidden sm:inline">
            Iwosan
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. HERO DARK BLUE GRADIENT SECTION                           */}
      {/* ============================================================ */}
      <div className="w-full bg-gradient-to-b from-[#060c18] via-[#091428] to-[#0a1526] px-5 pt-5 pb-8 relative print:rounded-2xl print:mb-2 print:p-6 print:break-inside-avoid">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none print:hidden" />

        {/* Top Badges Row */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-slate-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-slate-300" />
            <span>Your Wellness Passport snapshot</span>
          </div>

          <button
            onClick={handleShareSummary}
            title="Share summary"
            aria-label="Share summary"
            className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Main Headline */}
        <div className="mb-5 relative z-10">
          <h2 className="text-2xl sm:text-[32px] font-extrabold text-white tracking-tight leading-[1.18]">
            Good work — you've<br />
            taken the <span className="font-serif italic font-normal text-emerald-300">first step.</span>
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mt-2 max-w-sm">
            You answered {answeredCount} of {totalQuestions} questions. Here is what stands out, gently.
          </p>
        </div>

        {/* 3 Stat Cards Row */}
        <div className="grid grid-cols-3 gap-2.5 relative z-10">
          {/* Card 1: Answered */}
          <button
            onClick={onReviewSelections || (() => onNavigate('check'))}
            className="bg-[#121c32]/80 hover:bg-[#16233d] border border-slate-700/60 rounded-2xl p-3 flex flex-col justify-between text-left transition cursor-pointer min-h-[72px]"
          >
            <div className="text-xl font-extrabold text-white tracking-tight leading-none">
              {answeredCount}/{totalQuestions}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Answered</div>
          </button>

          {/* Card 2: BMI */}
          <button
            onClick={() => onNavigate('numbers')}
            className="bg-[#121c32]/80 hover:bg-[#16233d] border border-slate-700/60 rounded-2xl p-3 flex flex-col justify-between text-left transition cursor-pointer min-h-[72px]"
          >
            <div className="text-xl font-extrabold text-white tracking-tight leading-none">
              {bmiData ? bmiData.bmi : '—'}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">BMI</div>
          </button>

          {/* Card 3: Reading */}
          <div className="bg-[#121c32]/80 border border-slate-700/60 rounded-2xl p-3 flex flex-col justify-between min-h-[72px]">
            <div className="text-xl font-extrabold text-white tracking-tight leading-none">
              8 min
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Reading</div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. LIGHT CONTENT BODY AREA                                   */}
      {/* ============================================================ */}
      <div className="w-full bg-[#f8fafc] text-slate-900 rounded-t-[28px] -mt-3 px-4 sm:px-5 pt-6 pb-8 space-y-6 shadow-lg print:rounded-2xl print:mt-0 print:shadow-none print:px-2">
        {/* Safety Crisis Support Pathway (if triggered) */}
        {summary.crisisSupport?.triggered && (
          <div className="bg-gradient-to-br from-rose-50 to-amber-50/50 border-2 border-rose-300 rounded-3xl p-5 shadow-sm space-y-3.5 text-left print:break-inside-avoid">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700 block">
                  Immediate Safety Pathway
                </span>
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  {summary.crisisSupport.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-800 leading-relaxed">
              {summary.crisisSupport.message}
            </p>

            <div className="space-y-2 pt-1 print:hidden">
              {summary.crisisSupport.hotlines.map((hotline) => (
                <a
                  key={hotline.number}
                  href={`tel:${hotline.number.replace(/\s+/g, '')}`}
                  className="p-3 rounded-2xl bg-white border border-rose-200/90 hover:border-rose-400 hover:shadow-xs transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-rose-700 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {hotline.name}
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        {hotline.number} · {hotline.description}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full group-hover:bg-rose-700 group-hover:text-white transition shrink-0">
                    Call Now
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 1: KEEP DOING */}
        <div className="space-y-3 print:break-inside-avoid">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#0e1726] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                  Keep doing
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">
                  What you're already doing well
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {displayKeepDoing.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {displayKeepDoing.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2 shadow-2xs print:border-slate-300 print:shadow-none"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    {getInsightIcon(item.title, 'keep')}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-1 pl-11">
                  <button
                    onClick={() => onOpenArticle(item.articleId || 'heart-health-women')}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 hover:text-emerald-700 transition cursor-pointer print:text-slate-900"
                  >
                    <span>Read the related article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: WORTH CHECKING */}
        <div className="space-y-3 pt-1 print:break-inside-avoid">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                  Worth checking
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">
                  Small, easy next steps
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {displayWorthChecking.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {displayWorthChecking.map((item) => (
              <div
                key={item.id}
                className="bg-[#f0f9ff]/75 rounded-2xl border border-sky-100 p-4 space-y-2 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5 print:bg-slate-100">
                    {getInsightIcon(item.title, 'check')}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-1 pl-11">
                  <button
                    onClick={() => onOpenArticle(item.articleId || 'heart-health-women')}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 hover:text-sky-700 transition cursor-pointer print:text-slate-900"
                  >
                    <span>Read the related article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: DISCUSS WITH A PROFESSIONAL */}
        <div className="space-y-3 pt-1 print:break-inside-avoid">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#14532d] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Stethoscope className="w-3.5 h-3.5" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                  Discuss with a professional
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">
                  Things a clinician should weigh in on
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {displayDiscussWithDoctor.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {displayDiscussWithDoctor.map((item) => (
              <div
                key={item.id}
                className="bg-[#f0fdf4]/85 rounded-2xl border border-emerald-100 p-4 space-y-2 shadow-2xs print:bg-white print:border-slate-300 print:shadow-none"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5 print:bg-slate-100">
                    {getInsightIcon(item.title, 'discuss')}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-1 pl-11">
                  <button
                    onClick={() => onOpenArticle(item.articleId || 'preventive-care-matrix')}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 hover:text-emerald-800 transition cursor-pointer print:text-slate-900"
                  >
                    <span>Read the related article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Disclaimer Callout */}
        <div className="bg-[#f0f9ff] border border-sky-100/90 rounded-2xl p-4 flex gap-3 text-left print:break-inside-avoid print:bg-slate-50 print:border-slate-300">
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

        {/* SECTION: Suggested for you */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3.5 shadow-2xs print:break-inside-avoid print:border-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Suggested for you
            </span>
            <button
              onClick={() => onNavigate('womens-health')}
              className="text-xs font-bold text-slate-700 hover:text-slate-950 transition cursor-pointer"
            >
              See all
            </button>
          </div>

          <button
            onClick={() => onOpenArticle('diabetes-prevention')}
            className="w-full flex items-center justify-between gap-3 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=240&q=80"
                  alt="Nutritious food bowl"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                  Reducing the risk of type 2 diabetes
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">4 min read</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0 transition" />
          </button>

          {/* Quick Hub Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
            <button
              onClick={() => onNavigate('womens-health')}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer whitespace-nowrap"
            >
              Breast health
            </button>
            <button
              onClick={() => onNavigate('womens-health')}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer whitespace-nowrap"
            >
              Menstrual health
            </button>
            <button
              onClick={() => onNavigate('womens-health')}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer whitespace-nowrap"
            >
              Menopause & midlife
            </button>
          </div>
        </div>

        {/* Primary Action Buttons matching screenshot */}
        <div className="space-y-2.5 pt-1 print:break-inside-avoid">
          {/* Button 1: See the screening guide */}
          <button
            onClick={() => onNavigate('screening-guide')}
            className="w-full py-4 px-5 bg-[#080e1d] hover:bg-[#121c35] active:bg-[#192748] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>See the screening guide</span>
          </button>

          {/* Button 2: Talk to Iwosan (optional) */}
          <button
            onClick={() => onNavigate('contact')}
            className="w-full py-3.5 px-5 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 text-slate-900 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-2xs transition active:scale-[0.99] cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Talk to Iwosan (optional)</span>
          </button>

          {/* Redo the check link */}
          <div className="text-center pt-1 pb-1">
            <button
              onClick={onRetakeCheck}
              className="text-xs font-medium text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              Redo the check
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. USER EXPLICIT FOOTER SECTIONS (Hidden on Print Snapshot)   */}
        {/*    1. Review Selection: Check or adjust questionnaire answers */}
        {/*    2. Save PDF / Print: Trigger print & PDF snapshot          */}
        {/*    3. Share App: Share link or native share                   */}
        {/*    4. Retake: Start fresh check                               */}
        {/* ============================================================ */}
        <div className="pt-4 border-t border-slate-200 space-y-3 print:hidden">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
            Summary Actions & Options
          </p>

          <div className="space-y-2">
            {/* Wellness Passport Flipbook Preview */}
            <button
              onClick={() => onNavigate('flipbook')}
              className="w-full bg-[#081934] hover:bg-[#0c2246] border-2 border-[#00B1DA]/50 hover:border-[#00B1DA] text-white rounded-2xl p-3.5 flex items-center justify-between text-left transition shadow-md group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00B1DA] text-[#081934] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <BookOpen className="w-4 h-4 stroke-[2.3]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00B1DA] transition flex items-center gap-1.5">
                    <span>Wellness Passport Flipbook Preview</span>
                    <span className="text-[10px] bg-[#47B549]/20 text-[#47B549] font-bold px-2 py-0.5 rounded-full border border-[#47B549]/40">
                      9 Pages
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Flip through your 9-page interactive commemorative health passport booklet.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#00B1DA] group-hover:translate-x-0.5 flex-shrink-0 transition" />
            </button>

            {/* 1. Review Selection */}
            <button
              onClick={onReviewSelections || (() => onNavigate('check'))}
              className="w-full bg-white hover:bg-slate-50/90 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-left transition shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    Review Selection
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Check or adjust your answers on the questionnaire.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0 transition" />
            </button>

            {/* 2. Save PDF / Print */}
            <button
              onClick={handlePrintSummary}
              className="w-full bg-white hover:bg-slate-50/90 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-left transition shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0">
                  <Printer className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700 transition">
                    Save PDF / Print
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Print or save your personal health summary report.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0 transition" />
            </button>

            {/* 3. Share App */}
            <button
              onClick={handleShareSummary}
              className="w-full bg-white hover:bg-slate-50/90 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-left transition shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-purple-700 transition">
                    Share App
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {copiedLink
                      ? '✓ Link copied to clipboard!'
                      : 'Share Wellness Passport with family and colleagues.'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0 transition" />
            </button>

            {/* 4. Retake */}
            <button
              onClick={onRetakeCheck}
              className="w-full bg-white hover:bg-slate-50/90 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-left transition shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition">
                    Retake
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Start fresh and retake the health awareness check.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0 transition" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
