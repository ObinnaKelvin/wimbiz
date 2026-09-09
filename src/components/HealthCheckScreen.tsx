import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, ScreenId } from '../types';
import { HEALTH_QUESTIONS } from '../data/questions';
import { HelpCircle, ChevronLeft, ArrowRight, Check, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HealthCheckScreenProps {
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, optionId: string) => void;
  onFinishCheck: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const HealthCheckScreen: React.FC<HealthCheckScreenProps> = ({
  answers,
  onAnswerChange,
  onFinishCheck,
  onNavigate,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showWhyModal, setShowWhyModal] = useState(false);

  const currentQuestion: Question = HEALTH_QUESTIONS[currentStepIndex];
  const selectedOptionId = answers[currentQuestion.id];
  const isLastQuestion = currentStepIndex === HEALTH_QUESTIONS.length - 1;

  const handleSelectOption = (optionId: string) => {
    onAnswerChange(currentQuestion.id, optionId);

    // Auto-advance smoothly after short selection cue if user prefers fast flow
    setTimeout(() => {
      if (isLastQuestion) {
        triggerCompletionConfetti();
        onFinishCheck();
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
    }, 280);
  };

  const handleSkip = () => {
    onAnswerChange(currentQuestion.id, 'skipped');
    if (isLastQuestion) {
      triggerCompletionConfetti();
      onFinishCheck();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      onNavigate('welcome');
    }
  };

  const triggerCompletionConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#22C55E', '#0D1C2E', '#0284C7', '#F59E0B'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5 pb-24 pt-2 text-left max-w-md mx-auto">
      {/* Top Multi-segment Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-1.5 px-0.5">
          {HEALTH_QUESTIONS.map((q, idx) => {
            const isCompleted = idx < currentStepIndex || (idx === currentStepIndex && !!selectedOptionId);
            const isCurrent = idx === currentStepIndex;

            return (
              <motion.div
                key={q.id}
                layout
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  isCompleted && !isCurrent
                    ? 'bg-emerald-600'
                    : isCurrent
                    ? 'bg-slate-900'
                    : 'bg-slate-200'
                }`}
              />
            );
          })}
        </div>

        {/* Category Tracker */}
        <div className="flex items-center justify-between text-xs font-bold text-sky-800 tracking-wider uppercase pt-1">
          <span>
            {currentQuestion.categoryLabel} · {currentQuestion.stepNumber} OF {currentQuestion.totalSteps}
          </span>
          {currentStepIndex > 0 && (
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handlePrevious}
              className="flex items-center gap-0.5 text-slate-500 hover:text-slate-900 transition text-[11px] font-semibold cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Main Question & Options Container with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Main Question Title */}
          <div className="space-y-2 pt-1">
            <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-snug">
              {currentQuestion.title}
            </h2>

            {/* "Why we ask this" interactive link with question mark */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowWhyModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 transition cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-black">
                ?
              </span>
              <span>Why we ask this</span>
            </motion.button>
          </div>

          {/* Question Options List */}
          <div className="space-y-3 pt-1">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;

              return (
                <motion.button
                  key={option.id}
                  id={`option-${currentQuestion.id}-${option.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.25 }}
                  whileHover={{ scale: 1.015, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-colors flex items-center gap-3.5 cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600/50'
                      : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  {/* Custom Radio Button Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-2 border-emerald-600 bg-white'
                        : 'border-2 border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        className="w-2.5 h-2.5 rounded-full bg-emerald-600"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <span className="text-sm font-bold text-slate-900 block leading-tight">
                      {option.label}
                    </span>
                    {option.detail && (
                      <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug">
                        {option.detail}
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Skip Question Link */}
          <div className="pt-2 text-center">
            <button
              onClick={handleSkip}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              {currentQuestion.skipText || 'Skip this question'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Disclaimer Callout Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-3.5 text-left space-y-1 mt-4"
      >
        <h4 className="text-xs font-black text-rose-900">
          Awareness, not diagnosis.
        </h4>
        <p className="text-[11px] text-rose-900/90 leading-relaxed font-medium">
          A clinician gives the real assessment. Skip anything you’d rather not answer.
        </p>
      </motion.div>

      {/* "Why we ask this" Context Modal */}
      <AnimatePresence>
        {showWhyModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm rounded-3xl bg-slate-50 p-5 shadow-2xl border border-slate-200 text-slate-900"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold">Clinical Context</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowWhyModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                {currentQuestion.whyWeAsk}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowWhyModal(false)}
                className="mt-4 w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                Continue Check
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
