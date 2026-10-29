import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, ScreenId } from '../types';
import { getHealthQuestions } from '../data/questions';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Users,
  Briefcase,
  Stethoscope,
  Heart,
  Activity,
  Sparkles,
  Apple,
  Dumbbell,
  Moon,
  HeartHandshake,
  Brain,
  Shield,
  PhoneCall,
  ShieldAlert,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  X,
  Layers,
  QrCode,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HealthCheckScreenProps {
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, optionId: string) => void;
  onFinishCheck: () => void;
  onNavigate: (screen: ScreenId) => void;
  hasCompletedCheck?: boolean;
  onOpenQR?: () => void;
}

interface SectionSummary {
  category: string;
  categoryLabel: string;
  firstQuestionIndex: number;
  totalQuestions: number;
  answeredQuestions: number;
  isComplete: boolean;
  isCurrent: boolean;
}

export const HealthCheckScreen: React.FC<HealthCheckScreenProps> = ({
  answers,
  onAnswerChange,
  onFinishCheck,
  onNavigate,
  hasCompletedCheck = false,
  onOpenQR,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [showSectionsMenu, setShowSectionsMenu] = useState(false);

  const questions = getHealthQuestions(answers);
  const safeStepIndex = Math.min(currentStepIndex, Math.max(0, questions.length - 1));
  const currentQuestion: Question = questions[safeStepIndex] || questions[0];
  const selectedOptionId = answers[currentQuestion.id];
  const isLastQuestion = safeStepIndex === questions.length - 1;

  // Dynamically calculate the number of questions answered
  const answeredCount = questions.filter(
    (q) => !!answers[q.id] && answers[q.id] !== 'skipped'
  ).length;

  // Compute all unique sections in order of questions
  const sections: SectionSummary[] = [];
  questions.forEach((q, idx) => {
    let sec = sections.find((s) => s.categoryLabel === q.categoryLabel);
    if (!sec) {
      sec = {
        category: q.category,
        categoryLabel: q.categoryLabel,
        firstQuestionIndex: idx,
        totalQuestions: 0,
        answeredQuestions: 0,
        isComplete: false,
        isCurrent: false,
      };
      sections.push(sec);
    }
    sec.totalQuestions += 1;
    if (answers[q.id] && answers[q.id] !== 'skipped') {
      sec.answeredQuestions += 1;
    }
  });

  sections.forEach((s) => {
    s.isComplete = s.answeredQuestions === s.totalQuestions;
    s.isCurrent = s.categoryLabel === currentQuestion.categoryLabel;
  });

  const handleSelectOption = (optionId: string) => {
    onAnswerChange(currentQuestion.id, optionId);

    // Immediate compassionate safety pathway trigger
    if (
      (currentQuestion.id === 'phq9_self_harm' ||
        currentQuestion.id === 'q_self_harm_thoughts' ||
        currentQuestion.isSafetyQuestion) &&
      optionId !== 'not_at_all' &&
      optionId !== 'no' &&
      optionId !== 'skipped' &&
      optionId !== 'prefer_not'
    ) {
      setShowSafetyModal(true);
      return;
    }

    // Auto-advance to the next question after brief visual feedback
    setTimeout(() => {
      if (isLastQuestion) {
        if (!hasCompletedCheck) {
          triggerCompletionConfetti();
        }
        onFinishCheck();
      } else {
        setCurrentStepIndex((prev) => Math.min(prev + 1, questions.length - 1));
      }
    }, 240);
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
      if (!hasCompletedCheck) {
        triggerCompletionConfetti();
      }
      onFinishCheck();
    } else {
      setCurrentStepIndex((prev) => Math.min(prev + 1, questions.length - 1));
    }
  };

  const handleJumpToSection = (firstQuestionIndex: number) => {
    setCurrentStepIndex(firstQuestionIndex);
    setShowSectionsMenu(false);
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

  const getCategoryIcon = (category: string, className = 'w-6 h-6 text-slate-700') => {
    const norm = (category || '').toUpperCase();
    if (norm.includes('OCCUPATION')) {
      return <Briefcase className={className} />;
    }
    if (norm.includes('AGE')) {
      return <Calendar className={className} />;
    }
    if (norm.includes('ROUTINE')) {
      return <Stethoscope className={className} />;
    }
    if (norm.includes('PRESSURE')) {
      return <Heart className={className} />;
    }
    if (norm.includes('SUGAR')) {
      return <Activity className={className} />;
    }
    if (norm.includes('FAMILY')) {
      return <Users className={className} />;
    }
    if (norm.includes('WOMEN')) {
      return <Sparkles className={className} />;
    }
    if (norm.includes('NUTRITION')) {
      return <Apple className={className} />;
    }
    if (norm.includes('EXERCISE') || norm.includes('FITNESS')) {
      return <Dumbbell className={className} />;
    }
    if (norm.includes('SLEEP')) {
      return <Moon className={className} />;
    }
    if (norm.includes('SOCIAL') || norm.includes('RELATIONSHIP')) {
      return <HeartHandshake className={className} />;
    }
    if (norm.includes('MENTAL') || norm.includes('MINDFUL')) {
      return <Brain className={className} />;
    }
    if (norm.includes('TOXIC') || norm.includes('SUBSTANCE')) {
      return <Shield className={className} />;
    }
    return <Users className={className} />;
  };

  const progressPercent = Math.max(
    8,
    Math.round(((safeStepIndex + 1) / questions.length) * 100)
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 px-5 pt-4 pb-12 max-w-md mx-auto flex flex-col justify-between text-left">
      <div>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pt-1 pb-3">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous question or back"
            className="w-10 h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <h1 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight">
            Health check
          </h1>

          <div className="flex items-center gap-2">
            {onOpenQR && (
              <button
                type="button"
                onClick={onOpenQR}
                aria-label="Share Conference QR Code"
                title="Share QR Code"
                className="w-9 h-9 rounded-full bg-white border border-slate-200/90 hover:bg-slate-100 active:scale-95 flex items-center justify-center text-slate-700 shadow-2xs transition cursor-pointer"
              >
                <QrCode className="w-4 h-4 stroke-[2.2]" />
              </button>
            )}
            <button
              type="button"
              onClick={onFinishCheck}
              className="px-4 py-1.5 rounded-full border border-slate-200/90 hover:bg-slate-50 active:scale-95 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              Finish
            </button>
          </div>
        </div>

        {/* Section Category & Progress Indicator */}
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            {/* Clickable section name that reveals all sections */}
            <button
              type="button"
              onClick={() => setShowSectionsMenu(true)}
              className="inline-flex items-center gap-1 text-slate-800 hover:text-slate-950 font-semibold cursor-pointer transition py-0.5 px-1 -ml-1 rounded-md hover:bg-slate-100 group"
              title="Click to jump to another section"
            >
              <span className="group-hover:underline underline-offset-2">
                {currentQuestion.categoryLabel}
              </span>
              <span className="text-slate-400 font-normal">
                · {safeStepIndex + 1} of {questions.length}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition" />
            </button>

            <span className="font-bold text-slate-800">
              {safeStepIndex + 1} / {questions.length}
            </span>
          </div>

          {/* Thin Progress Bar with cyan-blue gradient fill */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#003853] via-[#005c87] to-[#0092d0] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Review Banner if user returned to review selections */}
        {hasCompletedCheck && (
          <div className="mt-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-2.5 px-3 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-900">Reviewing answers</span>
            <button
              onClick={onFinishCheck}
              className="font-bold text-emerald-700 hover:text-emerald-950 bg-white border border-emerald-300 px-3 py-1 rounded-full shadow-2xs text-[11px] cursor-pointer"
            >
              Done · Return to Summary
            </button>
          </div>
        )}

        {/* Category Icon Badge & Answered Count Pill */}
        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowSectionsMenu(true)}
            title="Click to view all sections"
            className="w-12 h-12 rounded-2xl bg-[#eaf2fa] hover:bg-[#dce9f8] active:scale-95 flex items-center justify-center text-slate-800 shadow-2xs transition cursor-pointer"
          >
            {getCategoryIcon(currentQuestion.category)}
          </button>

          <div className="bg-[#dcf3e4] text-[#1c783c] px-3.5 py-1 rounded-full text-xs font-semibold tracking-tight shadow-2xs">
            {answeredCount} answered
          </div>
        </div>

        {/* Question Title & Subtitle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-snug">
              {currentQuestion.title}
            </h2>

            {currentQuestion.whyWeAsk && (
              <p className="text-sm text-slate-500 leading-relaxed font-normal mt-2.5">
                {currentQuestion.whyWeAsk}
              </p>
            )}

            {/* Date Picker Input for LMP Question */}
            {currentQuestion.hasDatePicker && (
              <div className="mt-4 bg-white rounded-[22px] p-4 border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{currentQuestion.datePickerLabel || 'Select exact date'}</span>
                </div>
                <input
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                />

                {selectedOptionId && (selectedOptionId.startsWith('date:') || /^\d{4}-\d{2}-\d{2}$/.test(selectedOptionId)) && (
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        Selected:{' '}
                        {new Date(
                          selectedOptionId.replace('date:', '') + 'T00:00:00'
                        ).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Options List */}
            <div className="mt-5 space-y-2.5">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isPreferNot =
                  option.label.toLowerCase().includes('prefer not') ||
                  option.id === 'prefer_not' ||
                  option.id === 'prefer_not_to_say';

                if (isSelected) {
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelectOption(option.id)}
                      className="w-full bg-[#34a853] hover:bg-[#2ea04b] text-white rounded-[22px] px-5 py-4 font-semibold text-sm sm:text-[15px] flex items-center justify-between shadow-xs transition-transform active:scale-[0.99] cursor-pointer text-left"
                    >
                      <div className="pr-3 leading-snug">
                        <span>{option.label}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/20 border border-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      </div>
                    </button>
                  );
                }

                if (isPreferNot) {
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelectOption(option.id)}
                      className="w-full border border-dashed border-slate-200 hover:border-slate-300 bg-transparent rounded-[22px] px-5 py-4 text-slate-400 font-normal text-sm sm:text-[15px] flex items-center justify-between transition-colors active:scale-[0.99] cursor-pointer text-left"
                    >
                      <div className="pr-3 leading-snug">
                        <span>{option.label}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 shrink-0" />
                    </button>
                  );
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className="w-full bg-white hover:bg-slate-50/80 border border-slate-200/90 rounded-[22px] px-5 py-4 text-slate-800 font-medium text-sm sm:text-[15px] flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors active:scale-[0.99] cursor-pointer text-left"
                  >
                    <div className="pr-3 leading-snug">
                      <span>{option.label}</span>
                      {option.detail && (
                        <span className="block text-[11px] text-slate-400 font-normal mt-0.5">
                          {option.detail}
                        </span>
                      )}
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 shrink-0" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Controls & Disclaimer */}
      <div className="mt-8 pt-4 space-y-3">
        {/* Back and Skip this one row */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handlePrevious}
            className="w-full rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 active:scale-[0.98] py-3.5 text-sm font-semibold text-slate-700 transition cursor-pointer text-center"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="w-full rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 active:scale-[0.98] py-3.5 text-sm font-semibold text-slate-700 transition cursor-pointer text-center"
          >
            Skip this one
          </button>
        </div>

        {/* Disclaimer footer */}
        <p className="text-xs text-slate-400 text-center pt-2 font-normal">
          Every question can be skipped or answered &ldquo;prefer not to say&rdquo;.
        </p>
      </div>

      {/* Section Navigation Drawer / Modal */}
      <AnimatePresence>
        {showSectionsMenu && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-5 pb-8 sm:pb-6 shadow-2xl border border-slate-200 text-left space-y-4 max-h-[82vh] flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#eaf2fa] flex items-center justify-center text-slate-700">
                    <Layers className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      Screening Sections
                    </h3>
                    <p className="text-[11px] text-slate-500 font-normal">
                      Jump directly to any section below
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSectionsMenu(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
                  aria-label="Close sections list"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sections Scrollable List */}
              <div className="overflow-y-auto space-y-2 pr-1 -mr-1 flex-1">
                {sections.map((sec, idx) => {
                  return (
                    <button
                      key={sec.categoryLabel}
                      type="button"
                      onClick={() => handleJumpToSection(sec.firstQuestionIndex)}
                      className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                        sec.isCurrent
                          ? 'border-[#003853] bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            sec.isCurrent
                              ? 'bg-white/20 text-white'
                              : 'bg-[#eaf2fa] text-slate-700'
                          }`}
                        >
                          {getCategoryIcon(
                            sec.category,
                            `w-4 h-4 ${sec.isCurrent ? 'text-white' : 'text-slate-700'}`
                          )}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold opacity-60">
                              {idx + 1}.
                            </span>
                            <span
                              className={`text-sm font-bold truncate ${
                                sec.isCurrent ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {sec.categoryLabel}
                            </span>
                          </div>
                          <span
                            className={`text-[11px] block mt-0.5 ${
                              sec.isCurrent ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {sec.answeredQuestions} of {sec.totalQuestions} answered
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        {sec.isCurrent ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                            Current
                          </span>
                        ) : sec.isComplete ? (
                          <span className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          </span>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer Tip */}
              <div className="pt-2 text-center shrink-0">
                <span className="text-[11px] text-slate-400">
                  You can jump back and forth anytime without losing your answers.
                </span>
              </div>
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
