import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HealthNumbers, ScreenId } from '../types';
import { calculateBMI, saveNumbersToLocal } from '../utils/healthLogic';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Droplet,
  Ruler,
  Scale,
  Calculator,
  Plus,
  QrCode,
} from 'lucide-react';

interface NumbersScreenProps {
  numbers: HealthNumbers;
  onNumbersChange: (numbers: HealthNumbers) => void;
  onNavigate: (screen: ScreenId) => void;
  hasFilledAssessment?: boolean;
  hasCompletedCheck?: boolean;
  onOpenQR?: () => void;
}

export const NumbersScreen: React.FC<NumbersScreenProps> = ({
  numbers,
  onNumbersChange,
  onNavigate,
  hasFilledAssessment = false,
  hasCompletedCheck = false,
  onOpenQR,
}) => {
  const [systolic, setSystolic] = useState<string>(numbers.systolic ? String(numbers.systolic) : '');
  const [diastolic, setDiastolic] = useState<string>(numbers.diastolic ? String(numbers.diastolic) : '');
  const [bloodSugar, setBloodSugar] = useState<string>(numbers.bloodSugar ? String(numbers.bloodSugar) : '');
  const [height, setHeight] = useState<string>(numbers.height ? String(numbers.height) : '');
  const [weight, setWeight] = useState<string>(numbers.weight ? String(numbers.weight) : '');
  const [sugarUnit, setSugarUnit] = useState<'mg/dL' | 'mmol/L'>(numbers.sugarUnit || 'mg/dL');

  // Sync internal state when numbers prop changes externally
  useEffect(() => {
    setSystolic(numbers.systolic ? String(numbers.systolic) : '');
    setDiastolic(numbers.diastolic ? String(numbers.diastolic) : '');
    setBloodSugar(numbers.bloodSugar ? String(numbers.bloodSugar) : '');
    setHeight(numbers.height ? String(numbers.height) : '');
    setWeight(numbers.weight ? String(numbers.weight) : '');
    setSugarUnit(numbers.sugarUnit || 'mg/dL');
  }, [numbers]);

  // Real-time calculations
  const numSystolic = systolic ? Number(systolic) : undefined;
  const numDiastolic = diastolic ? Number(diastolic) : undefined;
  const numSugar = bloodSugar ? Number(bloodSugar) : undefined;
  const numHeight = height ? Number(height) : 0;
  const numWeight = weight ? Number(weight) : 0;

  const bmiAnalysis = calculateBMI(numWeight, numHeight, 'metric');

  const hasAnyNumbers = Boolean(
    (numSystolic && numSystolic > 0) ||
      (numDiastolic && numDiastolic > 0) ||
      (numSugar && numSugar > 0) ||
      numHeight > 0 ||
      numWeight > 0
  );

  const handleSaveAndContinue = () => {
    const updated: HealthNumbers = {
      ...numbers,
      systolic: numSystolic && numSystolic > 0 ? numSystolic : undefined,
      diastolic: numDiastolic && numDiastolic > 0 ? numDiastolic : undefined,
      bloodSugar: numSugar && numSugar > 0 ? numSugar : undefined,
      sugarType: numbers.sugarType || 'fasting',
      sugarUnit: sugarUnit || 'mg/dL',
      height: numHeight > 0 ? numHeight : undefined,
      weight: numWeight > 0 ? numWeight : undefined,
      unitSystem: 'metric',
    };
    onNumbersChange(updated);
    saveNumbersToLocal(updated);

    // If user has completed check, navigate to summary (or dashboard if from dashboard)
    onNavigate('summary');
  };

  const handleResetNumbers = () => {
    setSystolic('');
    setDiastolic('');
    setBloodSugar('');
    setHeight('');
    setWeight('');
    const reset: HealthNumbers = {
      sugarType: 'fasting',
      sugarUnit: 'mg/dL',
      unitSystem: 'metric',
      systolic: undefined,
      diastolic: undefined,
      bloodSugar: undefined,
      height: undefined,
      weight: undefined,
    };
    onNumbersChange(reset);
    saveNumbersToLocal(reset);
  };

  const handleBack = () => {
    if (hasFilledAssessment) {
      onNavigate('dashboard');
    } else {
      onNavigate('check');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafbfe] text-slate-900 px-5 pt-4 pb-16 flex flex-col justify-start select-none max-w-md mx-auto">
      {/* 1. TOP NAVIGATION BAR */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3.5">
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="w-10 h-10 rounded-full bg-[#f1f4f9] hover:bg-slate-200 active:bg-slate-300 flex items-center justify-center text-slate-800 transition active:scale-95 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Add your numbers
          </h2>
        </div>

        {onOpenQR && (
          <button
            type="button"
            onClick={onOpenQR}
            aria-label="Share Conference QR Code"
            title="Share QR Code"
            className="w-10 h-10 rounded-full bg-white border border-slate-200/90 hover:bg-slate-100 active:scale-95 flex items-center justify-center text-slate-700 shadow-xs transition cursor-pointer"
          >
            <QrCode className="w-4 h-4 stroke-[2.2]" />
          </button>
        )}
      </div>

      {/* 2. OPTIONAL KICKER BADGE */}
      <div className="mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8efff] text-slate-700 text-xs font-semibold">
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Optional</span>
        </span>
      </div>

      {/* 3. HEADLINE & VALUE PROPOSITION */}
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          If you have any <span className="font-serif italic font-normal text-[#1e4d75]">numbers</span>, add them here.
        </h1>
        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-sm">
          Only fill in what you already know. Nothing here is required, and nothing is sent anywhere.
        </p>
      </div>

      {/* 4. THE 5 NUMBER INPUT CARDS */}
      <div className="space-y-3 mb-4">
        {/* Card 1: Systolic */}
        <div className="bg-white rounded-[22px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xs p-4 flex items-center justify-between transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100/60">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#f0f6ff] flex items-center justify-center flex-shrink-0 text-slate-800 shadow-2xs">
              <Heart className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Systolic</div>
              <div className="text-[11px] text-slate-400 mt-0.5">The top number</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <input
              type="number"
              inputMode="numeric"
              placeholder="120"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              className="w-16 sm:w-20 text-right font-extrabold text-base sm:text-lg text-slate-800 placeholder:text-slate-300 placeholder:font-normal focus:outline-hidden bg-transparent"
            />
            <span className="text-xs font-semibold text-slate-400 min-w-[38px] text-left">
              mmHg
            </span>
          </div>
        </div>

        {/* Card 2: Diastolic */}
        <div className="bg-white rounded-[22px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xs p-4 flex items-center justify-between transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100/60">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#f0f6ff] flex items-center justify-center flex-shrink-0 text-slate-800 shadow-2xs">
              <Heart className="w-5 h-5 fill-slate-800 stroke-0" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Diastolic</div>
              <div className="text-[11px] text-slate-400 mt-0.5">The bottom number</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <input
              type="number"
              inputMode="numeric"
              placeholder="80"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className="w-16 sm:w-20 text-right font-extrabold text-base sm:text-lg text-slate-800 placeholder:text-slate-300 placeholder:font-normal focus:outline-hidden bg-transparent"
            />
            <span className="text-xs font-semibold text-slate-400 min-w-[38px] text-left">
              mmHg
            </span>
          </div>
        </div>

        {/* Card 3: Fasting sugar */}
        <div className="bg-white rounded-[22px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xs p-4 flex items-center justify-between transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100/60">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#f0f6ff] flex items-center justify-center flex-shrink-0 text-slate-800 shadow-2xs">
              <Droplet className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Fasting sugar</div>
              <div className="text-[11px] text-slate-400 mt-0.5">If you know it</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <input
              type="number"
              inputMode="numeric"
              step="any"
              placeholder="90"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
              className="w-16 sm:w-20 text-right font-extrabold text-base sm:text-lg text-slate-800 placeholder:text-slate-300 placeholder:font-normal focus:outline-hidden bg-transparent"
            />
            <button
              type="button"
              onClick={() => setSugarUnit(sugarUnit === 'mg/dL' ? 'mmol/L' : 'mg/dL')}
              title="Tap to toggle mg/dL and mmol/L"
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 min-w-[38px] text-left cursor-pointer"
            >
              {sugarUnit}
            </button>
          </div>
        </div>

        {/* Card 4: Height */}
        <div className="bg-white rounded-[22px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xs p-4 flex items-center justify-between transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100/60">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#f0f6ff] flex items-center justify-center flex-shrink-0 text-slate-800 shadow-2xs">
              <Ruler className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Height</div>
              <div className="text-[11px] text-slate-400 mt-0.5">For your BMI</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <input
              type="number"
              inputMode="numeric"
              placeholder="165"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-16 sm:w-20 text-right font-extrabold text-base sm:text-lg text-slate-800 placeholder:text-slate-300 placeholder:font-normal focus:outline-hidden bg-transparent"
            />
            <span className="text-xs font-semibold text-slate-400 min-w-[38px] text-left">
              cm
            </span>
          </div>
        </div>

        {/* Card 5: Weight */}
        <div className="bg-white rounded-[22px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xs p-4 flex items-center justify-between transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100/60">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#f0f6ff] flex items-center justify-center flex-shrink-0 text-slate-800 shadow-2xs">
              <Scale className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Weight</div>
              <div className="text-[11px] text-slate-400 mt-0.5">For your BMI</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <input
              type="number"
              inputMode="numeric"
              placeholder="68"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-16 sm:w-20 text-right font-extrabold text-base sm:text-lg text-slate-800 placeholder:text-slate-300 placeholder:font-normal focus:outline-hidden bg-transparent"
            />
            <span className="text-xs font-semibold text-slate-400 min-w-[38px] text-left">
              kg
            </span>
          </div>
        </div>
      </div>

      {/* 5. YOUR BMI CARD */}
      <div className="bg-[#edf6ff] border border-sky-100 rounded-[22px] p-5 mb-6 shadow-2xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-slate-700" />
            <span>Your BMI</span>
          </div>
          <div className="text-xs text-slate-500 font-normal">
            worked out for you
          </div>
        </div>

        <div className="flex items-end justify-between pt-3">
          <div>
            {bmiAnalysis ? (
              <div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                  {bmiAnalysis.bmi}
                </div>
                <div className="text-xs font-bold text-sky-800 mt-1">
                  {bmiAnalysis.category}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] leading-relaxed">
                  Calculated from your entered height and weight.
                </p>
              </div>
            ) : (
              <div>
                <div className="w-16 h-1 bg-slate-700 rounded-full my-3" />
                <div className="text-xs text-slate-500 font-medium">
                  Add height and weight to see it
                </div>
              </div>
            )}
          </div>

          {/* Equalizer / Histogram 5-Bar Graphic matching the screenshot */}
          <div className="flex items-end gap-1.5 pb-1 flex-shrink-0">
            <div className="w-2.5 h-4 bg-sky-400 rounded-full" />
            <div className="w-2.5 h-7 bg-sky-400 rounded-full" />
            <div className="w-2.5 h-12 bg-sky-500 rounded-full" />
            <div className="w-2.5 h-9 bg-sky-400 rounded-full" />
            <div className="w-2.5 h-5 bg-sky-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* 6. PRIMARY CTA BUTTON */}
      <div className="space-y-3">
        <button
          onClick={handleSaveAndContinue}
          className="w-full py-4 px-6 bg-[#0a1124] hover:bg-[#121c38] active:bg-[#19274e] text-white font-bold text-sm sm:text-base rounded-full flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
        >
          <span>
            {hasAnyNumbers ? 'Save and see my summary' : 'Skip and see my summary'}
          </span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>

        {/* 7. CLEAR THESE NUMBERS LINK */}
        <div className="text-center">
          <button
            onClick={handleResetNumbers}
            className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition cursor-pointer py-1"
          >
            Clear these numbers
          </button>
        </div>
      </div>
    </div>
  );
};
