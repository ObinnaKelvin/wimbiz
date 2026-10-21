import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import {
  Heart,
  HeartPulse,
  Calendar,
  Sun,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Droplet,
  Leaf,
  Footprints,
  Moon,
  Sprout,
  CheckCircle2,
  ArrowRight,
  User,
  FlaskConical,
} from 'lucide-react';

export type TabType = 'all' | 'womens' | 'lifestyle';

interface WomensHealthHubProps {
  initialTab?: TabType;
  onOpenArticle: (articleId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

interface TopicCard {
  id: string;
  title: string;
  subtitle: string;
  articleId: string;
  category: 'womens' | 'lifestyle';
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

const TOPIC_CARDS: TopicCard[] = [
  // 6 Women's Health Topics
  {
    id: 'breast',
    title: 'Breast health',
    subtitle: 'Self-awareness, changes & screening',
    articleId: 'breast-health',
    category: 'womens',
    icon: Heart,
    image: '/assets/aistudio/image_13c09b81.png',
  },
  {
    id: 'menstrual',
    title: 'Menstrual health',
    subtitle: "Cycles, pain & what's normal",
    articleId: 'menstrual-health',
    category: 'womens',
    icon: Calendar,
    image: '/assets/aistudio/image_425a2223.png',
  },
  {
    id: 'menopause',
    title: 'Menopause & midlife',
    subtitle: 'Changes, comfort & support',
    articleId: 'menopause-midlife',
    category: 'womens',
    icon: Sun,
    image: '/assets/aistudio/image_69e6584c.png',
  },
  {
    id: 'reproductive',
    title: 'Reproductive health',
    subtitle: 'Fertility, infections & care',
    articleId: 'reproductive-health',
    category: 'womens',
    icon: Sparkles,
    image: '/assets/aistudio/image_ad6762cc.png',
  },
  {
    id: 'cervical',
    title: 'Cervical health',
    subtitle: 'HPV, smears & prevention',
    articleId: 'cervical-cancer-hpv',
    category: 'womens',
    icon: ShieldCheck,
    image: '/assets/aistudio/image_ff6d3cc7.png',
  },
  {
    id: 'preventive',
    title: 'Preventive care',
    subtitle: 'Routine checks that matter',
    articleId: 'preventive-care-matrix',
    category: 'womens',
    icon: Stethoscope,
    image: '/assets/aistudio/image_a4a9cee3.png',
  },

  // 6 Heart, Diabetes & Lifestyle Topics (from Everyday Wellness & Prevention)
  {
    id: 'heart',
    title: 'Heart health',
    subtitle: 'Blood pressure & everyday habits',
    articleId: 'heart-health-women',
    category: 'lifestyle',
    icon: HeartPulse,
    image: '/assets/aistudio/image_572b6d90.png',
  },
  {
    id: 'diabetes',
    title: 'Diabetes',
    subtitle: 'Sugar, signs & prevention',
    articleId: 'diabetes-prevention',
    category: 'lifestyle',
    icon: Droplet,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=480&q=80',
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    subtitle: 'Simple food, real life',
    articleId: 'nutrition-habits',
    category: 'lifestyle',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=480&q=80',
  },
  {
    id: 'movement',
    title: 'Movement',
    subtitle: 'Start small, stay steady',
    articleId: 'movement-exercise',
    category: 'lifestyle',
    icon: Footprints,
    image: '/assets/aistudio/image_1a1890e0.png',
  },
  {
    id: 'sleep',
    title: 'Sleep & stress',
    subtitle: 'Rest, reset, recover',
    articleId: 'sleep-stress',
    category: 'lifestyle',
    icon: Moon,
    image: '/assets/aistudio/image_e9ce1814.png',
  },
  {
    id: 'habits',
    title: 'Healthy habits',
    subtitle: 'Small steps, kept simple',
    articleId: 'healthy-micro-habits',
    category: 'lifestyle',
    icon: Sprout,
    image: '/assets/aistudio/image_27257c44.png',
  },
];

export const WomensHealthHub: React.FC<WomensHealthHubProps> = ({
  initialTab = 'all',
  onOpenArticle,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const filteredTopics = TOPIC_CARDS.filter((card) => {
    if (activeTab === 'all') return true;
    return card.category === activeTab;
  });

  const isLifestyle = activeTab === 'lifestyle';

  const heroTitle = isLifestyle ? (
    <>
      Heart &amp; Lifestyle{' '}
      <span className="font-serif italic font-normal text-slate-950">Hub</span>
    </>
  ) : (
    <>
      Women's Health{' '}
      <span className="font-serif italic font-normal text-slate-950">Hub</span>
    </>
  );

  const heroDescription = isLifestyle
    ? 'Cardiovascular health in women, managing cortisol, reversing pre-diabetes, and joyful movement for longevity. Every piece shows who reviewed it and when.'
    : 'Trusted, plain-language articles on the things women actually want to know. Every piece shows who reviewed it and when.';

  // Featured Read details dynamically adapted to the active tab
  const featuredArticleId = isLifestyle ? 'heart-health-women' : 'breast-health';
  const featuredImage = isLifestyle
    ? '/assets/aistudio/image_572b6d90.png'
    : '/assets/aistudio/image_a986066b.png';
  const featuredTitle = isLifestyle
    ? 'Blood pressure & everyday habits'
    : "Knowing what's normal for you";
  const featuredSnippet = isLifestyle
    ? 'Heart disease manifests differently in women. Learn the subtle cues, blood pressure targets, and everyday preventive habits'
    : "Breast awareness is not about checking for cancer every morning. It's about knowing how your breasts normally";
  const featuredDate = isLifestyle ? '10 February 2026' : '14 August 2026';

  return (
    <div className="w-full min-h-screen bg-[#fafbfe] text-slate-900 px-4 sm:px-5 pt-3 pb-32 flex flex-col justify-start select-none max-w-md mx-auto">
      {/* 1. TOP HEADER */}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#edf2f8] flex items-center justify-center text-slate-900 shadow-2xs">
          <Heart className="w-5 h-5 fill-slate-900 stroke-0" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Learn
        </h1>
      </div>

      {/* 2. CYAN / OCEAN HERO CARD */}
      <div className="w-full bg-gradient-to-br from-[#0092d0] via-[#00ade8] to-[#00c5ee] rounded-[28px] p-5 sm:p-6 shadow-[0_8px_24px_rgba(0,173,232,0.22)] mb-5 relative overflow-hidden text-left transition-all duration-300">
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/15 rounded-full blur-2xl pointer-events-none" />

        {/* Clinician Reviewed Frosted Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-slate-950 text-xs font-bold shadow-2xs mb-3.5">
          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Clinician reviewed</span>
        </div>

        {/* Description */}
        <p className="text-white text-xs sm:text-[13px] font-normal leading-relaxed max-w-[94%] drop-shadow-2xs">
          {heroDescription}
        </p>

        {/* Overlapping Avatars & Reviewer Byline */}
        <div className="flex items-center gap-2.5 mt-4">
          <div className="flex -space-x-1.5">
            <div className="w-6 h-6 rounded-full bg-[#0a1626] border border-white/60 flex items-center justify-center text-white shadow-2xs">
              <User className="w-3 h-3 stroke-[2.5]" />
            </div>
            <div className="w-6 h-6 rounded-full bg-[#0284c7] border border-white/60 flex items-center justify-center text-white shadow-2xs">
              <Stethoscope className="w-3 h-3 stroke-[2.5]" />
            </div>
            <div className="w-6 h-6 rounded-full bg-[#10b981] border border-white/60 flex items-center justify-center text-white shadow-2xs">
              <FlaskConical className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-white/95">
            Reviewed by the Iwosan clinical team
          </span>
        </div>

        {/* Large Hub Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-4 sm:mt-5">
          {heroTitle}
        </h2>
      </div>

      {/* 3. HORIZONTAL FILTER TABS */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-[#0c1527] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-transparent'
          }`}
        >
          All topics
        </button>
        <button
          onClick={() => setActiveTab('womens')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'womens'
              ? 'bg-[#0c1527] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-transparent'
          }`}
        >
          Women's health
        </button>
        <button
          onClick={() => setActiveTab('lifestyle')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'lifestyle'
              ? 'bg-[#0c1527] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-transparent'
          }`}
        >
          Heart &amp; lifestyle
        </button>
      </div>

      {/* 4. FEATURED READ */}
      <div className="mb-6">
        <div className="text-xs font-bold text-slate-400 tracking-wider mb-2.5 text-left">
          Featured read
        </div>

        <div
          onClick={() => onOpenArticle(featuredArticleId)}
          className="bg-white rounded-[26px] border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] overflow-hidden cursor-pointer hover:shadow-md transition active:scale-[0.99] group text-left"
        >
          {/* Card Image */}
          <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
            <img
              src={featuredImage}
              alt={featuredTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              loading="lazy"
            />
            {/* Read Time Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/55 backdrop-blur-xs text-white text-[11px] font-semibold shadow-xs">
              4 min read
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-5 space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition leading-snug">
              {featuredTitle}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
              {featuredSnippet}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#edf7ee] text-emerald-800 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Clinician reviewed</span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                {featuredDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BROWSE BY SUBJECT GRID */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 text-left">
          <span className="text-xs font-bold text-slate-400 tracking-wider">
            Browse by subject
          </span>
          <span className="text-xs font-medium text-slate-400">
            {filteredTopics.length} topics
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {filteredTopics.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                onClick={() => onOpenArticle(card.articleId)}
                className="bg-white rounded-[22px] border border-slate-100/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-md transition active:scale-[0.98] group text-left"
              >
                {/* Topic Image with floating circle icon */}
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-800 shadow-2xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Light Green Bottom Bar */}
                <div className="bg-[#f0f9f0] text-emerald-800 text-[10px] font-bold py-1.5 px-3 flex items-center gap-1 border-t border-emerald-50/50">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Clinician reviewed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. SCREENING GUIDE BANNER CTA */}
      <div
        onClick={() => onNavigate('screening-guide')}
        className="w-full bg-[#0c1527] hover:bg-[#121f3a] active:bg-[#182a4d] text-white rounded-[22px] p-4 sm:p-5 flex items-center justify-between shadow-sm cursor-pointer transition active:scale-[0.99] mb-6 text-left group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 shrink-0 shadow-2xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition">
              Not sure which checks apply to you?
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              The screening guide explains the usual timing
            </p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition shrink-0" />
      </div>

      {/* 7. FOOTER DISCLAIMER */}
      <div className="text-center px-4">
        <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
          Educational information, not a diagnosis. Content updates any time — no app release needed.
        </p>
      </div>
    </div>
  );
};
