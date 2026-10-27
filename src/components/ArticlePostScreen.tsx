import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Article, ScreenId } from '../types';
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Lightbulb,
  Info,
  Stethoscope,
  ArrowRight,
  FileText,
  ChevronRight,
  Plus,
  Minus,
  User,
  Share2,
} from 'lucide-react';

interface ArticlePostScreenProps {
  article: Article;
  onNavigate: (screen: ScreenId) => void;
  onOpenArticle: (articleId: string) => void;
  onBack: () => void;
}

export const ArticlePostScreen: React.FC<ArticlePostScreenProps> = ({
  article,
  onNavigate,
  onOpenArticle,
  onBack,
}) => {
  // Manage accordion open state: default to opening section index 0
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true });
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('wellness_bookmarks');
      if (saved) {
        const list = JSON.parse(saved);
        return Array.isArray(list) && list.includes(article.id);
      }
    } catch {
      // ignore
    }
    return false;
  });

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem('wellness_bookmarks');
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(list)) list = [];
      if (list.includes(article.id)) {
        list = list.filter((id) => id !== article.id);
        setIsBookmarked(false);
      } else {
        list.push(article.id);
        setIsBookmarked(true);
      }
      localStorage.setItem('wellness_bookmarks', JSON.stringify(list));
    } catch {
      setIsBookmarked(!isBookmarked);
    }
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpenSections({ 0: true });
  }, [article.id]);

  // Derived sections fallback if not explicitly provided
  const sections =
    article.sections && article.sections.length > 0
      ? article.sections
      : article.content.map((p, idx) => ({
          number: idx + 1,
          title:
            idx === 0
              ? 'Understanding the basics'
              : idx === 1
              ? 'Key changes to monitor'
              : idx === 2
              ? 'Recommended next steps'
              : 'Clinical recommendations',
          content: p,
        }));

  const takeaway =
    article.takeawayMessage ||
    (article.keyTakeaways && article.keyTakeaways.length > 0
      ? article.keyTakeaways[0]
      : 'Notice changes, don’t diagnose them. Book a conversation if something is new and stays.');

  const introText =
    article.intro ||
    article.summary ||
    (article.content && article.content.length > 0 ? article.content[0] : '');

  const displayTitle = article.headline || article.title;
  const categoryLabel = article.categoryTag || article.category || 'Women’s health';

  // Fallback image based on article id if not explicitly defined
  const heroImage =
    article.image ||
    (article.id === 'breast-health'
      ? '/assets/aistudio/image_a986066b.png'
      : article.id === 'menstrual-health'
      ? '/assets/aistudio/image_425a2223.png'
      : article.id === 'menopause-midlife'
      ? '/assets/aistudio/image_69e6584c.png'
      : article.id === 'reproductive-health'
      ? '/assets/aistudio/image_ad6762cc.png'
      : article.id === 'cervical-cancer-hpv'
      ? '/assets/aistudio/image_ff6d3cc7.png'
      : article.id === 'preventive-care-matrix'
      ? '/assets/aistudio/image_a4a9cee3.png'
      : article.id === 'heart-health-women'
      ? '/assets/aistudio/image_572b6d90.png'
      : article.id === 'movement-exercise'
      ? '/assets/aistudio/image_1a1890e0.png'
      : article.id === 'sleep-stress'
      ? '/assets/aistudio/image_e9ce1814.png'
      : article.id === 'healthy-micro-habits'
      ? '/assets/aistudio/image_27257c44.png'
      : article.id === 'mental-health-mindfulness'
      ? 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80'
      : article.id === 'mindfulness-daily-peace'
      ? 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
      : article.id === 'avoidance-toxic-substances'
      ? 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'
      : '/assets/aistudio/image_a986066b.png');

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 pb-28 max-w-md mx-auto select-none font-sans">
      {/* 1. TOP NAVIGATION BAR (matching user image) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-100/60">
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-10 h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight text-center truncate max-w-[200px]">
          {categoryLabel}
        </h1>

        <button
          onClick={toggleBookmark}
          aria-label="Bookmark"
          className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs ${
            isBookmarked
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Bookmark
            className={`w-4 h-4 stroke-[2.2] ${isBookmarked ? 'fill-emerald-600' : ''}`}
          />
        </button>
      </div>

      {/* 2. HERO IMAGE BANNER with smooth fade to white */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-100">
        <img
          src={heroImage}
          alt={displayTitle}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        {/* Soft vignette/gradient blending into pure white */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      </div>

      {/* 3. CONTENT CONTAINER */}
      <div className="px-5 -mt-6 relative z-10 space-y-4">
        {/* Metadata Pills */}
        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e8f6ec] text-[#1b7a3a] text-xs font-semibold tracking-wide border border-emerald-100/80 shadow-2xs">
            {article.readTime || '4 min read'}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#eeeffb] text-[#3e4ab8] text-xs font-semibold tracking-wide border border-indigo-100/60 shadow-2xs">
            {categoryLabel}
          </span>
        </div>

        {/* Article Headline */}
        <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight leading-[1.2] pt-1">
          {displayTitle}
        </h2>

        {/* Clinician Reviewer Card */}
        <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#e0edfb] text-[#1a65da] flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0 text-left">
              <div className="text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                {article.reviewerName}, {article.reviewerRole}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {article.reviewDate.replace('Reviewed: ', 'Reviewed ')}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[2.2]" />
          </div>
        </div>

        {/* Intro Paragraph */}
        <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed pt-1 text-left">
          {introText}
        </p>

        {/* 4. NUMBERED ACCORDION CARDS (1, 2, 3...) */}
        <div className="space-y-2.5 pt-2">
          {sections.map((section, idx) => {
            const isOpen = !!openSections[idx];
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden transition-all duration-200 text-left"
              >
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#0d1424] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {section.number || idx + 1}
                    </div>
                    <span className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                      {section.title}
                    </span>
                  </div>

                  <div className="text-slate-400 flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.2]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.2]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 pl-13 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50/60 mt-1">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* 5. "TAKE THIS WITH YOU" GREEN CALLOUT CARD */}
        <div className="bg-[#2eb34a] text-white rounded-3xl p-5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 stroke-[2.2]" />
            <span>Take this with you</span>
          </div>
          <p className="mt-2 text-sm sm:text-[15px] font-semibold leading-relaxed text-white">
            {takeaway}
          </p>
        </div>

        {/* 6. EDUCATIONAL DISCLAIMER CARD */}
        <div className="bg-[#edf5fd] border border-[#d6e7f9] rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 text-left">
          <Info className="w-4 h-4 text-[#1a73e8] mt-0.5 flex-shrink-0 stroke-[2.2]" />
          <p className="text-xs text-[#1e4b85] font-normal leading-relaxed">
            {article.disclaimer ||
              'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.'}
          </p>
        </div>

        {/* 7. PRIMARY ACTION CTA BUTTON: Discuss this with Iwosan */}
        <button
          onClick={() => onNavigate('contact')}
          className="w-full bg-[#0d1424] hover:bg-[#16213b] text-white rounded-full py-4 px-6 flex items-center justify-between shadow-md active:scale-[0.99] transition-all cursor-pointer mt-4"
        >
          <div className="flex items-center gap-3">
            <Stethoscope className="w-5 h-5 stroke-[2.2]" />
            <span className="font-bold text-sm sm:text-base">
              Discuss this with Iwosan
            </span>
          </div>
          <ArrowRight className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* 8. RELATED READING SECTION */}
        <div className="pt-4 text-left">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Related reading
          </div>

          <div className="space-y-2.5">
            {article.relatedArticles && article.relatedArticles.length > 0 ? (
              article.relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onOpenArticle(rel.id)}
                  className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-3.5 flex items-center justify-between hover:border-slate-200 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                      <FileText className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors truncate">
                        {rel.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {rel.readTime}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors flex-shrink-0" />
                </div>
              ))
            ) : (
              <>
                <div
                  onClick={() => onOpenArticle('breast-health')}
                  className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-3.5 flex items-center justify-between hover:border-slate-200 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                      <FileText className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors truncate">
                        When breast screening is usually offered
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        3 min read
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors flex-shrink-0" />
                </div>

                <div
                  onClick={() => onOpenArticle('preventive-care-matrix')}
                  className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-3.5 flex items-center justify-between hover:border-slate-200 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                      <FileText className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors truncate">
                        What a good routine check includes
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        4 min read
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors flex-shrink-0" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* 9. MORE IN [CATEGORY] SECTION */}
        <div className="pt-2 text-left">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            More in {categoryLabel}
          </div>

          <div className="flex flex-wrap gap-2">
            {(article.tags && article.tags.length > 0
              ? article.tags
              : ['When breast screening is usually offered', 'Routine checkups']
            ).map((tag, tIdx) => (
              <button
                key={tIdx}
                onClick={() => {
                  if (article.hub === 'womens') onNavigate('womens-health');
                  else onNavigate('lifestyle');
                }}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
