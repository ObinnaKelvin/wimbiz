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
import { AdminDashboardScreen } from './components/AdminDashboardScreen';
import { ArticleModal } from './components/ArticleModal';
import { ConferenceQRModal } from './components/ConferenceQRModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CLINICAL_ARTICLES } from './data/clinicalLibrary';
import { submitAnonymousRecord } from './utils/adminApi';
import {
  loadAnswersFromLocal,
  saveAnswersToLocal,
  loadNumbersFromLocal,
  saveNumbersToLocal,
  DEFAULT_EMPTY_NUMBERS,
} from './utils/healthLogic';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [answers, setAnswers] = useState<Record<string, string>>(() => loadAnswersFromLocal());
  const [numbers, setNumbers] = useState<HealthNumbers>(() => loadNumbersFromLocal());
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [checkSessionKey, setCheckSessionKey] = useState(0);
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
    setActiveArticleId(null);
    setCurrentScreen('summary');
    submitAnonymousRecord({
      answers,
      numbers,
      completedCheck: true,
    });
  };

  const handleNavigate = (screen: ScreenId) => {
    setActiveArticleId(null);
    setCurrentScreen(screen);
  };

  const handleNumbersChange = (newNumbers: HealthNumbers) => {
    setNumbers(newNumbers);
    saveNumbersToLocal(newNumbers);
    if (Object.keys(answers).length > 0) {
      submitAnonymousRecord({
        answers,
        numbers: newNumbers,
        completedCheck: hasCompletedCheck,
      });
    }
  };

  const handleOpenArticle = (articleId: string) => {
    setActiveArticleId(articleId);
  };

  const handleCloseArticle = () => {
    setActiveArticleId(null);
  };

  const handleRetakeCheck = () => {
    setActiveArticleId(null);
    setAnswers({});
    saveAnswersToLocal({});
    const resetNumbers: HealthNumbers = { ...DEFAULT_EMPTY_NUMBERS };
    setNumbers(resetNumbers);
    saveNumbersToLocal(resetNumbers);
    setHasCompletedCheck(false);
    setCheckSessionKey((prev) => prev + 1);
    setCurrentScreen('check');
  };

  const handleDataReset = () => {
    setAnswers({});
    saveAnswersToLocal({});
    const resetNumbers: HealthNumbers = { ...DEFAULT_EMPTY_NUMBERS };
    setNumbers(resetNumbers);
    saveNumbersToLocal(resetNumbers);
    setHasCompletedCheck(false);
    setActiveArticleId(null);
    setCheckSessionKey((prev) => prev + 1);
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
    <div className={`min-h-screen ${currentScreen === 'welcome' ? 'bg-[#030611]' : 'bg-slate-100'} text-slate-900 flex flex-col items-center justify-start antialiased selection:bg-emerald-100 selection:text-emerald-900`}>
      {/* Centered Mobile App Canvas Frame */}
      <div className={`w-full ${currentScreen === 'admin' ? 'max-w-4xl' : 'max-w-md'} min-h-screen ${currentScreen === 'welcome' ? 'bg-[#050b18] sm:border-slate-800/60' : 'bg-slate-50 sm:border-slate-200/80'} flex flex-col relative sm:shadow-2xl sm:border-x transition-all duration-300`}>
        {/* Persistent Brand Header on non-welcome screens */}
        {currentScreen !== 'welcome' && (
          <Header
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onOpenQR={() => setIsQRModalOpen(true)}
            hasCompletedCheck={hasCompletedCheck}
          />
        )}

        {/* Dynamic Screen View with Smooth Page Transition */}
        <main className={`flex-1 ${currentScreen === 'welcome' ? 'p-0' : 'px-4 sm:px-5 py-4'} overflow-hidden`}>
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
                  onNavigate={handleNavigate}
                  hasCompletedCheck={hasCompletedCheck}
                  onOpenQR={() => setIsQRModalOpen(true)}
                  onRetakeCheck={handleRetakeCheck}
                />
              )}

              {currentScreen === 'privacy' && (
                <PrivacyConsentScreen
                  onNavigate={handleNavigate}
                  onProceedToCheck={() => handleNavigate('check')}
                />
              )}

              {currentScreen === 'check' && (
                <HealthCheckScreen
                  key={checkSessionKey}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                  onFinishCheck={handleFinishCheck}
                  onNavigate={handleNavigate}
                  hasCompletedCheck={hasCompletedCheck}
                />
              )}

              {currentScreen === 'numbers' && (
                <NumbersScreen
                  key={checkSessionKey}
                  numbers={numbers}
                  onNumbersChange={handleNumbersChange}
                  onNavigate={handleNavigate}
                />
              )}

              {currentScreen === 'summary' && (
                <SummaryScreen
                  answers={answers}
                  numbers={numbers}
                  onNavigate={handleNavigate}
                  onOpenArticle={handleOpenArticle}
                  onRetakeCheck={handleRetakeCheck}
                  onReviewSelections={() => handleNavigate('check')}
                />
              )}

              {currentScreen === 'womens-health' && (
                <WomensHealthHub
                  onOpenArticle={handleOpenArticle}
                  onNavigate={handleNavigate}
                />
              )}

              {currentScreen === 'lifestyle' && (
                <LifestyleHub
                  onOpenArticle={handleOpenArticle}
                  onNavigate={handleNavigate}
                />
              )}

              {currentScreen === 'screening-guide' && (
                <ScreeningGuideScreen
                  onNavigate={handleNavigate}
                  userAgeBand={ageBandLabel}
                />
              )}

              {currentScreen === 'contact' && (
                <ContactBookingScreen
                  onNavigate={handleNavigate}
                />
              )}

              {currentScreen === 'about' && (
                <AboutSafetyScreen
                  onNavigate={handleNavigate}
                  onDataReset={handleDataReset}
                />
              )}

              {currentScreen === 'admin' && (
                <AdminDashboardScreen
                  onNavigate={handleNavigate}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Persistent Navigation for Quick Exploration (hidden on Welcome and Admin screens) */}
        {currentScreen !== 'admin' && currentScreen !== 'welcome' && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            hasCompletedCheck={hasCompletedCheck}
          />
        )}
      </div>

      {/* Global Clinical Article Modal Reader */}
      <ArticleModal
        article={activeArticle}
        onClose={handleCloseArticle}
        onNavigate={handleNavigate}
        hasCompletedCheck={hasCompletedCheck}
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
