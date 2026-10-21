import React from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../types';
import { Home, BookOpen, ShieldCheck, Info } from 'lucide-react';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  hasCompletedCheck: boolean;
  hasFilledAssessment?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  hasCompletedCheck,
  hasFilledAssessment = false,
}) => {
  // If the user has filled in assessment questions, Home routes to 'dashboard'
  // If no assessment or cleared out, Home routes to 'welcome'
  const homeTarget: ScreenId = hasFilledAssessment ? 'dashboard' : 'welcome';

  const navItems = [
    {
      id: homeTarget,
      label: 'Home',
      icon: Home,
      isActive: currentScreen === 'dashboard' || currentScreen === 'welcome',
    },
    {
      id: 'womens-health' as ScreenId,
      label: 'Learn',
      icon: BookOpen,
      isActive: currentScreen === 'womens-health' || currentScreen === 'lifestyle' || currentScreen === 'article',
    },
    {
      id: 'screening-guide' as ScreenId,
      label: 'Screening',
      icon: ShieldCheck,
      isActive: currentScreen === 'screening-guide',
    },
    {
      id: 'about' as ScreenId,
      label: 'About',
      icon: Info,
      isActive: currentScreen === 'about',
    },
  ];

  return (
    <nav className="fixed bottom-4 inset-x-0 z-50 px-4 pointer-events-none print:hidden">
      <div className="max-w-[340px] sm:max-w-[360px] mx-auto bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.14)] p-1.5 flex items-center justify-between pointer-events-auto">
        {navItems.map((item) => {
          const isSelected = item.isActive;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.label}
              id={`nav-btn-${item.label.toLowerCase()}`}
              whileTap={{ scale: 0.92 }}
              onClick={() => onNavigate(item.id)}
              className="relative flex items-center justify-center cursor-pointer focus:outline-hidden"
              aria-label={item.label}
            >
              {isSelected ? (
                <div className="bg-[#0d172a] text-white px-4 py-1.5 rounded-full flex flex-col items-center justify-center gap-0.5 shadow-sm min-w-[68px]">
                  <Icon className="w-4 h-4 text-white" />
                  <span className="text-[10px] font-bold tracking-tight leading-none">
                    {item.label}
                  </span>
                </div>
              ) : (
                <div className="px-3.5 py-1.5 flex flex-col items-center justify-center text-slate-500 hover:text-slate-900 transition-colors gap-0.5 min-w-[60px]">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-medium tracking-tight leading-none">
                    {item.label}
                  </span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

