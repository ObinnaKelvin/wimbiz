import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, HealthNumbers, Article } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PrivacyConsentScreen } from './components/PrivacyConsentScreen';
import { HealthCheckScreen } from './components/HealthCheckScreen';
import { NumbersScreen } from './components/NumbersScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { WomensHealthHub } from './components/WomensHealthHub';
import { LifestyleHub } from './components/LifestyleHub';
import { ScreeningGuideScreen } from './components/ScreeningGuideScreen';
import { ContactBookingScreen } from './components/ContactBookingScreen';
import { AboutSafetyScreen } from './components/AboutSafetyScreen';
import { ArticleModal } from './components/ArticleModal';
import { ConferenceQRModal } from './components/ConferenceQRModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CLINICAL_ARTICLES } from './data/clinicalLibrary';
import {
  loadAnswersFromLocal,
  saveAnswersToLocal,
  loadNumbersFromLocal,
  saveNumbersToLocal,
} from './utils/healthLogic';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [answers, setAnswers] = useState<Record<string, string>>(() => loadAnswersFromLocal());
  const [numbers, setNumbers] = useState<HealthNumbers>(() => loadNumbersFromLocal());
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [hasCompletedCheck, setHasCompletedCheck] = useState<boolean>(() => {
    const saved = loadAnswersFromLocal();
    return Object.keys(saved).length >= 5;
  });

  // Keep scroll position reset on screen navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleAnswerChange = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);
    saveAnswersToLocal(updated);
  };

  const handleFinishCheck = () => {
    setHasCompletedCheck(true);
    setCurrentScreen('summary');
  };

  const handleNumbersChange = (newNumbers: HealthNumbers) => {
    setNumbers(newNumbers);
    saveNumbersToLocal(newNumbers);
  };

  const handleOpenArticle = (articleId: string) => {
    setActiveArticleId(articleId);
  };

  const handleCloseArticle = () => {
    setActiveArticleId(null);
  };

  const handleRetakeCheck = () => {
    setCurrentScreen('check');
  };

  const handleDataReset = () => {
    setAnswers({});
    setNumbers({
      sugarType: 'fasting',
      sugarUnit: 'mg/dL',
      height: 165,
      weight: 65,
      unitSystem: 'metric',
    });
    setHasCompletedCheck(false);
    setCurrentScreen('welcome');
  };

  const activeArticle: Article | null = activeArticleId
    ? CLINICAL_ARTICLES.find((a) => a.id === activeArticleId) || null
    : null;

  // Selected Age Band label for context
  const ageAnswer = answers['q1_age'];
  let ageBandLabel: string | undefined = undefined;
  if (ageAnswer === 'under_20') ageBandLabel = 'Under 20';
  else if (ageAnswer === '20_29') ageBandLabel = '20 – 29';
  else if (ageAnswer === '30_39') ageBandLabel = '30 – 39';
  else if (ageAnswer === '40_49') ageBandLabel = '40 – 49';
  else if (ageAnswer === '50_59') ageBandLabel = '50 – 59';
  else if (ageAnswer === '60_plus') ageBandLabel = '60+';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col items-center justify-start antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Centered Mobile App Canvas Frame */}
      <div className="w-full max-w-md min-h-screen bg-slate-50 flex flex-col relative sm:shadow-xl sm:border-x sm:border-slate-200/80">
        {/* Persistent Brand Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenQR={() => setIsQRModalOpen(true)}
        />

        {/* Dynamic Screen View with Smooth Page Transition */}
        <main className="flex-1 px-4 sm:px-5 py-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {currentScreen === 'welcome' && (
                <WelcomeScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  hasCompletedCheck={hasCompletedCheck}
                  onOpenQR={() => setIsQRModalOpen(true)}
                />
              )}

              {currentScreen === 'privacy' && (
                <PrivacyConsentScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  onProceedToCheck={() => setCurrentScreen('check')}
                />
              )}

              {currentScreen === 'check' && (
                <HealthCheckScreen
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                  onFinishCheck={handleFinishCheck}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'numbers' && (
                <NumbersScreen
                  numbers={numbers}
                  onNumbersChange={handleNumbersChange}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'summary' && (
                <SummaryScreen
                  answers={answers}
                  numbers={numbers}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  onOpenArticle={handleOpenArticle}
                  onRetakeCheck={handleRetakeCheck}
                />
              )}

              {currentScreen === 'womens-health' && (
                <WomensHealthHub
                  onOpenArticle={handleOpenArticle}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'lifestyle' && (
                <LifestyleHub
                  onOpenArticle={handleOpenArticle}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'screening-guide' && (
                <ScreeningGuideScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  userAgeBand={ageBandLabel}
                />
              )}

              {currentScreen === 'contact' && (
                <ContactBookingScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'about' && (
                <AboutSafetyScreen
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  onDataReset={handleDataReset}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Persistent Navigation for Quick Exploration */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          hasCompletedCheck={hasCompletedCheck}
        />
      </div>

      {/* Global Clinical Article Modal Reader */}
      <ArticleModal
        article={activeArticle}
        onClose={handleCloseArticle}
        onNavigate={(screen) => setCurrentScreen(screen)}
      />

      {/* Conference QR Code Modal */}
      <ConferenceQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

      {/* Offline Connectivity Toast */}
      <OfflineIndicator />
    </div>
  );
}
