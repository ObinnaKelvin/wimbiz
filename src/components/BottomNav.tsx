import React from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../types';
import { Sparkles, ClipboardCheck, BookOpen, Calculator, CalendarCheck, Shield } from 'lucide-react';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  hasCompletedCheck: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, hasCompletedCheck }) => {
  // We can show the summary tab if she has completed check
  const navItems = [
    {
      id: 'welcome' as ScreenId,
      label: 'Home',
      icon: Sparkles,
    },
    {
      id: (hasCompletedCheck && currentScreen === 'summary' ? 'summary' : 'check') as ScreenId,
      label: hasCompletedCheck ? 'Check' : 'Check',
      icon: ClipboardCheck,
      highlight: true,
    },
    {
      id: 'womens-health' as ScreenId,
      label: 'Library',
      icon: BookOpen,
      isActive: currentScreen === 'womens-health' || currentScreen === 'lifestyle',
    },
    {
      id: 'numbers' as ScreenId,
      label: 'Numbers',
      icon: Calculator,
    },
    {
      id: 'screening-guide' as ScreenId,
      label: 'Screening',
      icon: Shield,
    },
    {
      id: 'contact' as ScreenId,
      label: 'Iwosan',
      icon: CalendarCheck,
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-2 safe-area-bottom shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-6 gap-0.5">
        {navItems.map((item) => {
          const isSelected = item.isActive !== undefined ? item.isActive : currentScreen === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.label}
              id={`nav-btn-${item.label.toLowerCase()}`}
              whileTap={{ scale: 0.88 }}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition cursor-pointer ${
                isSelected
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition ${
                  isSelected ? 'bg-emerald-50 text-emerald-700' : 'bg-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
