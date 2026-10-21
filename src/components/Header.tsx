import React, { useState } from 'react';
import { ScreenId } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { QrCode, ShieldCheck, Heart, Stethoscope, Menu, X, BookOpen, Activity, PhoneCall, Info, Lock } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenQR: () => void;
  hasCompletedCheck?: boolean;
  hasFilledAssessment?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenQR,
  hasCompletedCheck,
  hasFilledAssessment = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const homeTarget: ScreenId = hasFilledAssessment ? 'dashboard' : 'welcome';

  const handleNavClick = (screen: ScreenId) => {
    onNavigate(screen);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 transition-colors shadow-2xs">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Icon & Title */}
        <button
          onClick={() => handleNavClick(homeTarget)}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
        >
          {/* Logo container */}
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-xs group-hover:bg-slate-800 transition">
            <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none">
              <path
                d="M6 20 H13 L17 10 L22 30 L26 15 L29 23 L32 20 H34"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-none">
                Wellness Passport
              </h1>
            </div>
            <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">
              WIMBIZ × IWOSAN
            </p>
          </div>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* QR Code Share Modal trigger */}
          <button
            onClick={onOpenQR}
            title="Show Conference QR Code"
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:text-emerald-700 transition cursor-pointer shadow-2xs"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* In-app PWA install trigger */}
          <PWAInstallButton variant="header" />

          {/* Quick Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
            aria-label="Navigation Menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Dropdown Drawer for rapid screen jumping on all devices */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-[61px] bg-slate-50 border-b border-slate-200 shadow-xl p-4 z-50 animate-fade-in">
          <div className="max-w-md mx-auto space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1">
              Navigation & Resources
            </p>

            <button
              onClick={() => handleNavClick(homeTarget)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                currentScreen === homeTarget
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-800 hover:bg-slate-200/70'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>{hasFilledAssessment ? 'Home (Dashboard)' : 'Home (Welcome)'}</span>
            </button>

            {hasCompletedCheck ? (
              <>
                <button
                  onClick={() => handleNavClick('summary')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                    currentScreen === 'summary'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-800 hover:bg-slate-200/70'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>Your Health Awareness Summary</span>
                </button>

                <button
                  onClick={() => handleNavClick('check')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-left transition ${
                    currentScreen === 'check'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Review / Retake Check</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavClick('check')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                  currentScreen === 'check'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-800 hover:bg-slate-200/70'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>3-Min Health Awareness Check</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('numbers')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                currentScreen === 'numbers'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-800 hover:bg-slate-200/70'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Add Your Numbers (BP, Sugar, BMI)</span>
            </button>

            <button
              onClick={() => handleNavClick('womens-health')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                currentScreen === 'womens-health'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-800 hover:bg-slate-200/70'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Women’s Health Hub</span>
            </button>

            <button
              onClick={() => handleNavClick('lifestyle')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                currentScreen === 'lifestyle'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-800 hover:bg-slate-200/70'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Heart & Lifestyle</span>
            </button>

            <button
              onClick={() => handleNavClick('screening-guide')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                currentScreen === 'screening-guide'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-800 hover:bg-slate-200/70'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Screening Guide by Age</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                currentScreen === 'contact'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-800 hover:bg-slate-200/70'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book / Reach Iwosan</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                currentScreen === 'about'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-800 hover:bg-slate-200/70'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About, Safety & Privacy</span>
            </button>

            {/* Administrator Staff Portal Button */}
            <div className="pt-2 mt-1 border-t border-slate-200/90">
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-left transition cursor-pointer ${
                  currentScreen === 'admin'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <span>Administrator</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                  Staff Login
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
