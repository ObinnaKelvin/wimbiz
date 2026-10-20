import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId } from '../types';
import {
  Heart,
  Droplet,
  ShieldCheck,
  Activity,
  Scale,
  Eye,
  Smile,
  FileText,
  Calendar,
  Info,
  Plus,
  Minus,
} from 'lucide-react';

interface ScreeningGuideScreenProps {
  onNavigate: (screen: ScreenId) => void;
  userAgeBand?: string;
}

type ScreeningCategory = 'all' | 'womens' | 'heart' | 'general';

interface ScreeningCheck {
  id: string;
  name: string;
  subtitle: string;
  category: 'womens' | 'heart' | 'general';
  icon: React.ComponentType<{ className?: string }>;
  whyItMatters: string;
  whatToExpect: string;
}

const SCREENING_CHECKS: ScreeningCheck[] = [
  {
    id: 'blood-pressure',
    name: 'Blood pressure',
    subtitle: 'At least once a year',
    category: 'heart',
    icon: Heart,
    whyItMatters:
      'High blood pressure usually has no symptoms. Regular checks are how it is found early, when it is easiest to manage.',
    whatToExpect:
      'A cuff around your upper arm, resting for five minutes beforehand. It takes about two minutes and results are immediate.',
  },
  {
    id: 'blood-sugar',
    name: 'Blood sugar',
    subtitle: 'Every 1–3 years from age 35, or sooner with family history',
    category: 'heart',
    icon: Droplet,
    whyItMatters:
      'A simple fasting or HbA1c test spots pre-diabetes years before symptoms begin, allowing 100% lifestyle reversal.',
    whatToExpect:
      'A simple morning blood test after fasting overnight, or a quick fingertip glucose check at a health screening booth.',
  },
  {
    id: 'cervical-screening',
    name: 'Cervical screening (smear / HPV test)',
    subtitle: 'Usually every 3–5 years from around age 25 to 65',
    category: 'womens',
    icon: ShieldCheck,
    whyItMatters:
      'Detects persistent high-risk HPV and cellular changes years before they can progress. Cervical cancer is virtually 100% preventable when caught in the precancerous stage.',
    whatToExpect:
      'A gentle 2-minute pelvic exam using a speculum. A clinician gently sweeps surface cells from the cervix with a soft brush.',
  },
  {
    id: 'breast-screening',
    name: 'Breast screening',
    subtitle: 'From around 40–50, every 1–2 years, depending on your risk profile',
    category: 'womens',
    icon: Heart,
    whyItMatters:
      'Digital mammography reveals microcalcifications and microscopic lesions up to two years before they can be felt by hand.',
    whatToExpect:
      'You stand in front of a digital low-dose X-ray machine. Each breast is gently compressed between two clear plates for 10–15 seconds.',
  },
  {
    id: 'cholesterol',
    name: 'Cholesterol',
    subtitle: 'Every 4–6 years from around age 40, more often with family history',
    category: 'heart',
    icon: Activity,
    whyItMatters:
      'Measures HDL ("good"), LDL ("bad"), and triglycerides to assess cardiovascular protection and prevent arterial plaque build-up.',
    whatToExpect:
      'A standard blood draw, often included with your comprehensive annual routine wellness check.',
  },
  {
    id: 'height-weight-bmi',
    name: 'Height, weight & BMI',
    subtitle: 'At every routine check-up',
    category: 'general',
    icon: Scale,
    whyItMatters:
      'Provides a helpful longitudinal baseline for overall metabolic health, medication dosage, and cardiovascular risk tracking.',
    whatToExpect:
      'Stepping on a calibrated medical scale and stadiometer height rod without shoes.',
  },
  {
    id: 'eye-check',
    name: 'Eye check',
    subtitle: 'Every 2 years, or every year with diabetes',
    category: 'general',
    icon: Eye,
    whyItMatters:
      'Evaluates visual acuity, intraocular pressure (glaucoma screening), and retinal blood vessels which reflect systemic vascular health.',
    whatToExpect:
      'Looking through a phoropter eye chart, gentle non-contact intraocular pressure check, and illuminated retinal exam.',
  },
  {
    id: 'dental-check',
    name: 'Dental check',
    subtitle: 'Every 6–12 months',
    category: 'general',
    icon: Smile,
    whyItMatters:
      'Oral gum inflammation and chronic periodontal bacteria are clinically connected to systemic cardiovascular inflammation and adverse health outcomes.',
    whatToExpect:
      'A gentle dental inspection, ultrasonic plaque scaling, teeth polishing, and gum pocket depth measurement.',
  },
  {
    id: 'bone-density',
    name: 'Bone density',
    subtitle: 'Usually around the menopause transition, or with fracture risk',
    category: 'womens',
    icon: FileText,
    whyItMatters:
      'Declining estrogen speeds up bone calcium loss. A DEXA scan catches osteopenia early so bone-strengthening habits can prevent fractures.',
    whatToExpect:
      'A completely painless, open low-radiation DEXA scan where you lie comfortably clothed on a cushioned table for about 10 minutes.',
  },
];

export const ScreeningGuideScreen: React.FC<ScreeningGuideScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ScreeningCategory>('all');
  // First item ('blood-pressure') expanded by default matching screenshot
  const [expandedId, setExpandedId] = useState<string | null>('blood-pressure');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredChecks = SCREENING_CHECKS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <div className="w-full min-h-screen bg-[#fafbfe] text-slate-900 px-4 sm:px-5 pt-3 pb-32 flex flex-col justify-start select-none max-w-md mx-auto">
      {/* 1. TOP HEADER */}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#edf2f8] flex items-center justify-center text-slate-900 shadow-2xs">
          <Heart className="w-5 h-5 fill-slate-900 stroke-0" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Screening guide
        </h1>
      </div>

      {/* 2. DARK NAVY HERO CARD */}
      <div className="w-full bg-gradient-to-br from-[#0c1428] via-[#0d172e] to-[#091122] rounded-[28px] p-5 sm:p-6 shadow-[0_8px_24px_rgba(12,20,40,0.18)] mb-5 relative overflow-hidden text-left">
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Prevention pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold shadow-2xs mb-3.5">
          <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2] text-slate-300" />
          <span>Prevention</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-[1.2]">
          Why routine checks<br />
          <span className="font-serif italic font-normal text-teal-300">matter.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mt-2.5 max-w-[95%]">
          Most screening exists to find quiet changes early — when they are simplest to treat. Here is the usual rhythm, and what each check involves.
        </p>
      </div>

      {/* 3. HORIZONTAL FILTER TABS */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-[#0c1527] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
          }`}
        >
          All checks
        </button>
        <button
          onClick={() => setActiveTab('womens')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'womens'
              ? 'bg-[#0c1527] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
          }`}
        >
          Women's
        </button>
        <button
          onClick={() => setActiveTab('heart')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'heart'
              ? 'bg-[#0c1527] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
          }`}
        >
          Heart & sugar
        </button>
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'general'
              ? 'bg-[#0c1527] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
          }`}
        >
          General
        </button>
      </div>

      {/* 4. SUBTITLE COUNTER */}
      <div className="text-xs font-bold text-slate-400 tracking-wider mb-3 text-left">
        {filteredChecks.length} checks to know about
      </div>

      {/* 5. EXPANDABLE SCREENING ACCORDION CARDS */}
      <div className="space-y-3 mb-6">
        {filteredChecks.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-[22px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden transition text-left"
            >
              {/* Header row */}
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/60 transition"
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition ${
                      isExpanded
                        ? 'bg-[#0c1527] text-white shadow-xs'
                        : 'bg-[#edf3fc] text-slate-800 shadow-2xs'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 p-1 flex-shrink-0">
                  {isExpanded ? (
                    <Minus className="w-4 h-4 stroke-[2]" />
                  ) : (
                    <Plus className="w-4 h-4 stroke-[2]" />
                  )}
                </div>
              </button>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="px-4 pb-4 space-y-3 overflow-hidden"
                  >
                    {/* Why it matters callout */}
                    <div className="bg-[#f0f9f0] rounded-2xl p-4 space-y-1">
                      <div className="text-xs font-bold text-emerald-800">
                        Why it matters
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {item.whyItMatters}
                      </p>
                    </div>

                    {/* What to expect callout */}
                    <div className="bg-[#f8faff] rounded-2xl p-4 space-y-1">
                      <div className="text-xs font-bold text-slate-500">
                        What to expect
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {item.whatToExpect}
                      </p>
                    </div>

                    {/* Ask Iwosan about this check button */}
                    <button
                      onClick={() => onNavigate('contact')}
                      className="w-full py-3 px-4 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 text-slate-900 font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-2xs transition active:scale-[0.99] cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Ask Iwosan about this check</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 6. A SIMPLE RHYTHM TO REMEMBER CARD */}
      <div className="bg-white rounded-[26px] border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 mb-5 space-y-4 text-left">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>A simple rhythm to remember</span>
        </div>

        <div className="space-y-4 pt-1">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#0c1527] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              1
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Once a year
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Blood pressure, weight and a routine conversation
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              2
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Every 1–3 years
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Blood sugar and cholesterol from around 35–40
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              3
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Every 3–5 years
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Cervical screening, depending on your programme
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#0c1527] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              4
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                From 40–50
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Breast screening invitations in many programmes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. TIMINGS DISCLAIMER CALLOUT BOX */}
      <div className="bg-[#f0f9ff] border border-sky-100 rounded-2xl p-4 flex gap-3 text-left mb-4">
        <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-700 leading-relaxed font-normal">
          Timings vary by country and personal history. Use this as a starting point for a conversation, not as a schedule to follow blindly.
        </p>
      </div>

      {/* 8. REVIEWED BYLINE & DISCLAIMER */}
      <div className="text-center px-4">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Reviewed by the Iwosan clinical team · educational, not a diagnosis
        </p>
      </div>
    </div>
  );
};
