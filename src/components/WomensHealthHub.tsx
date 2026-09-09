import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Article, ScreenId } from '../types';
import { CLINICAL_ARTICLES } from '../data/clinicalLibrary';
import { BookOpen, ShieldCheck, Clock, Search, ChevronRight, Sparkles, Heart } from 'lucide-react';

interface WomensHealthHubProps {
  onOpenArticle: (articleId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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

export const WomensHealthHub: React.FC<WomensHealthHubProps> = ({ onOpenArticle, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const articles = CLINICAL_ARTICLES.filter((art) => art.hub === 'womens');

  const categories = ['All', 'Breast Health', 'Menstrual', 'Menopause & Midlife', 'Reproductive', 'Cervical', 'Preventive Care'];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5 pb-28 pt-2 text-left max-w-md mx-auto"
    >
      {/* Top Toggle Switch between Hubs */}
      <motion.div variants={itemVariants} className="bg-slate-200/80 p-1 rounded-2xl flex text-xs font-bold">
        <button
          className="flex-1 py-2 px-3 rounded-xl bg-white text-slate-900 shadow-2xs transition"
        >
          Women’s Health Hub
        </button>
        <button
          onClick={() => onNavigate('lifestyle')}
          className="flex-1 py-2 px-3 rounded-xl text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1 cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Heart & Lifestyle</span>
        </button>
      </motion.div>

      {/* Header Info */}
      <motion.div variants={itemVariants} className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <span>Clinician-Reviewed Library</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Women’s Health Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Trusted clinical guidance on breast wellness, cycle health, cervical screening, midlife transitions, and preventive care.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search breast health, cervical, fibroids..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs"
        />
      </motion.div>

      {/* Category Filter Pills */}
      <motion.div variants={itemVariants} className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Article List */}
      <div className="space-y-3 pt-1">
        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-xs text-slate-500 font-medium">No topics matched your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-emerald-700 underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.25 }}
              whileHover={{ y: -3, scale: 1.008 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onOpenArticle(article.id)}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-colors cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                  {article.category}
                </span>
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {article.summary}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-[11px]">
                <div className="flex items-center gap-1 text-slate-500 font-medium truncate max-w-[200px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{article.reviewerName}</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Read Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Dynamic Content update guarantee note */}
      <motion.div variants={itemVariants} className="bg-rose-50/70 rounded-2xl p-3.5 border border-rose-200/70 text-[11px] text-rose-900 leading-relaxed">
        <strong>Clinician Verified:</strong> Every article is authored and reviewed by Iwosan Lagoon Hospitals specialists. Content updates continuously in real-time without requiring app store updates.
      </motion.div>
    </motion.div>
  );
};
