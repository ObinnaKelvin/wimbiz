import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, ScreenId } from '../types';
import { getHealthQuestions } from '../data/questions';
import {
  Calendar,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  X,
  Sparkles,
  ClipboardList,
  CheckCircle2,
  HeartHandshake,
  PhoneCall,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HealthCheckScreenProps {
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, optionId: string) => void;
  onFinishCheck: () => void;
  onNavigate: (screen: ScreenId) => void;
  hasCompletedCheck?: boolean;
}

export const HealthCheckScreen: React.FC<HealthCheckScreenProps> = ({
  answers,
  onAnswerChange,
  onFinishCheck,
  onNavigate,
  hasCompletedCheck = false,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  const questions = getHealthQuestions(answers);
  const safeStepIndex = Math.min(currentStepIndex, Math.max(0, questions.length - 1));
  const currentQuestion: Question = questions[safeStepIndex] || questions[0];
  const selectedOptionId = answers[currentQuestion.id];
  const isLastQuestion = safeStepIndex === questions.length - 1;

  const handleSelectOption = (optionId: string) => {
    onAnswerChange(currentQuestion.id, optionId);

    // Immediate compassionate safety pathway trigger
    if (currentQuestion.id === 'q_self_harm_thoughts' && optionId === 'yes') {
      setShowSafetyModal(true);
      return;
    }

    // Auto-advance smoothly after short selection cue if user prefers fast flow
    setTimeout(() => {
      if (isLastQuestion) {
        if (!hasCompletedCheck) {
          triggerCompletionConfetti();
        }
        onFinishCheck();
      } else {
        setCurrentStepIndex((prev) => Math.min(prev + 1, questions.length - 1));
      }
    }, 280);
  };

  const handleSkip = () => {
    onAnswerChange(currentQuestion.id, 'skipped');
    if (isLastQuestion) {
      if (!hasCompletedCheck) {
        triggerCompletionConfetti();
      }
      onFinishCheck();
    } else {
      setCurrentStepIndex((prev) => Math.min(prev + 1, questions.length - 1));
    }
  };

  const handlePrevious = () => {
    if (safeStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      onNavigate(hasCompletedCheck ? 'summary' : 'welcome');
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onFinishCheck();
    } else {
      setCurrentStepIndex((prev) => Math.min(prev + 1, questions.length - 1));
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
      {/* Review Banner if user returned to review selections */}
      {hasCompletedCheck && (
        <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-2.5 px-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-bold text-emerald-900">Reviewing form selections</span>
          </div>
          <button
            onClick={onFinishCheck}
            className="font-bold text-emerald-700 hover:text-emerald-950 bg-white border border-emerald-300 px-3 py-1 rounded-full shadow-2xs flex items-center gap-1 transition cursor-pointer"
          >
            <span>Done · Return to Summary</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Top Multi-segment Progress Bar with click-to-jump */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-1.5 px-0.5">
          {questions.map((q, idx) => {
            const isCompleted = !!answers[q.id];
            const isCurrent = idx === safeStepIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                title={`Question ${idx + 1}: ${q.categoryLabel}`}
                className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-900 ring-2 ring-slate-900/30 ring-offset-1'
                    : isCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
              />
            );
          })}
        </div>

        {/* Category Tracker & Quick Jump Toggle */}
        <div className="flex items-center justify-between text-xs font-bold text-sky-800 tracking-wider uppercase pt-1">
          <button
            onClick={() => setShowOverview(!showOverview)}
            className="flex items-center gap-1 text-slate-700 hover:text-emerald-800 transition cursor-pointer"
            title="Click to view all question steps"
          >
            <ClipboardList className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {currentQuestion.categoryLabel} · {currentQuestion.stepNumber} OF {currentQuestion.totalSteps}
            </span>
          </button>

          <div className="flex items-center gap-2">
            {safeStepIndex > 0 && (
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
      </div>

      {/* Overview Accordion Dropdown to jump directly to any question */}
      <AnimatePresence>
        {showOverview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-1.5"
          >
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                All {questions.length} Screening Questions
              </span>
              <button
                onClick={() => setShowOverview(false)}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pt-1">
              {questions.map((q, idx) => {
                const answerId = answers[q.id];
                const isDate = answerId && (answerId.startsWith('date:') || /^\d{4}-\d{2}-\d{2}$/.test(answerId));
                const matchedOption = q.options.find((opt) => opt.id === answerId);
                const isCurrent = idx === safeStepIndex;

                let answerText = 'Not answered';
                if (isDate) {
                  const rawDate = answerId.replace('date:', '');
                  answerText = `Date: ${rawDate}`;
                } else if (matchedOption) {
                  answerText = matchedOption.label;
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setShowOverview(false);
                    }}
                    className={`text-left p-2 rounded-xl border text-[11px] transition cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'border-slate-900 bg-slate-900 text-white font-bold'
                        : answerId
                        ? 'border-emerald-200 bg-emerald-50/60 text-slate-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-semibold truncate">
                      {idx + 1}. {q.categoryLabel}
                    </span>
                    <span className={`text-[10px] truncate mt-0.5 ${isCurrent ? 'text-emerald-300' : 'text-slate-500'}`}>
                      {answerText}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

          {/* Date Picker Input for LMP Question */}
          {currentQuestion.hasDatePicker && (
            <div className="bg-white rounded-2xl p-4 border border-emerald-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <label htmlFor="lmp-date-input" className="text-xs font-bold text-slate-900 block leading-tight">
                      {currentQuestion.datePickerLabel || 'Select date of last menstrual period'}
                    </label>
                    <span className="text-[11px] text-slate-500">Pick exact date from calendar</span>
                  </div>
                </div>
                {selectedOptionId && (selectedOptionId.startsWith('date:') || /^\d{4}-\d{2}-\d{2}$/.test(selectedOptionId)) && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Date Picked
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                <input
                  id="lmp-date-input"
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  value={
                    selectedOptionId && selectedOptionId.startsWith('date:')
                      ? selectedOptionId.replace('date:', '')
                      : selectedOptionId && /^\d{4}-\d{2}-\d{2}$/.test(selectedOptionId)
                      ? selectedOptionId
                      : ''
                  }
                  onChange={(e) => {
                    if (e.target.value) {
                      handleSelectOption(`date:${e.target.value}`);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50 cursor-pointer shadow-2xs"
                />

                {selectedOptionId && (selectedOptionId.startsWith('date:') || /^\d{4}-\d{2}-\d{2}$/.test(selectedOptionId)) && (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {new Date(
                          selectedOptionId.replace('date:', '') + 'T00:00:00'
                        ).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentQuestion.hasDatePicker && currentQuestion.options.length > 0 && (
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center pt-1">
              — Or choose an approximate timeframe —
            </div>
          )}

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

          {/* Navigation Controls row between questions */}
          <div className="pt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 flex items-center gap-1 cursor-pointer transition shadow-2xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{safeStepIndex === 0 ? (hasCompletedCheck ? 'Back to Summary' : 'Back') : 'Previous'}</span>
            </button>

            {/* Skip Question Link */}
            <button
              onClick={handleSkip}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer px-2"
            >
              {currentQuestion.skipText || 'Skip'}
            </button>

            {safeStepIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 hover:text-slate-950 bg-white border border-slate-200 flex items-center gap-1 cursor-pointer transition shadow-2xs"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onFinishCheck}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 cursor-pointer transition shadow-xs"
              >
                <span>{hasCompletedCheck ? 'View Summary' : 'Complete'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
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

      {/* Immediate Compassionate Safety Pathway Modal */}
      <AnimatePresence>
        {showSafetyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100 text-left space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700 block">
                    Immediate Support Pathway
                  </span>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    You are not alone. Support is here.
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                Thank you for your courage in sharing this with us. Going through intense emotional pain or thoughts of not wanting to be alive can feel overwhelming, but you do not have to carry this alone. Compassionate, trained professionals are standing by to listen confidentially and help right now.
              </p>

              {/* Helpline Contact Cards */}
              <div className="space-y-2 pt-1">
                <a
                  href="tel:+2348091116264"
                  className="w-full p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-rose-700 shrink-0" />
                    <div>
                      <span className="text-xs font-black text-slate-900 block">
                        MANI Mental Health Crisis Line (24/7)
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        +234 809 111 6264 · Free & Confidential
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-rose-700 bg-white px-2.5 py-1 rounded-full border border-rose-200 shadow-2xs group-hover:bg-rose-700 group-hover:text-white transition">
                    Call Now
                  </span>
                </a>

                <a
                  href="tel:112"
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Emergency Medical Services
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Dial 112 or 767 (Toll-Free Nationwide)
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs group-hover:bg-slate-900 group-hover:text-white transition">
                    Call 112
                  </span>
                </a>

                <a
                  href="tel:+234700496726"
                  className="w-full p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Stethoscope className="w-5 h-5 text-emerald-700 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Iwosan Lagoon Hospitals Urgent Care
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        0700-IWOSAN (0700 496726) · 24/7 Clinical Care
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs group-hover:bg-emerald-700 group-hover:text-white transition">
                    Call Clinic
                  </span>
                </a>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSafetyModal(false);
                    if (isLastQuestion) {
                      onFinishCheck();
                    } else {
                      setCurrentStepIndex((prev) => Math.min(prev + 1, questions.length - 1));
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer text-center"
                >
                  I am in a safe space, continue with questionnaire
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
