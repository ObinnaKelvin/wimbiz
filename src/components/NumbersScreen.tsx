import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HealthNumbers, ScreenId } from '../types';
import { calculateBMI, analyzeBloodPressure, analyzeBloodSugar, saveNumbersToLocal } from '../utils/healthLogic';
import { Stethoscope, Activity, Scale, Heart, Info, ArrowRight, Check, Sparkles, RotateCcw } from 'lucide-react';

interface NumbersScreenProps {
  numbers: HealthNumbers;
  onNumbersChange: (numbers: HealthNumbers) => void;
  onNavigate: (screen: ScreenId) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export const NumbersScreen: React.FC<NumbersScreenProps> = ({
  numbers,
  onNumbersChange,
  onNavigate,
}) => {
  const [systolic, setSystolic] = useState<string>(numbers.systolic ? String(numbers.systolic) : '');
  const [diastolic, setDiastolic] = useState<string>(numbers.diastolic ? String(numbers.diastolic) : '');
  const [bloodSugar, setBloodSugar] = useState<string>(numbers.bloodSugar ? String(numbers.bloodSugar) : '');
  const [sugarType, setSugarType] = useState<'fasting' | 'random'>(numbers.sugarType || 'fasting');
  const [sugarUnit, setSugarUnit] = useState<'mg/dL' | 'mmol/L'>(numbers.sugarUnit || 'mg/dL');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(numbers.unitSystem || 'metric');
  const [height, setHeight] = useState<string>(numbers.height ? String(numbers.height) : '');
  const [weight, setWeight] = useState<string>(numbers.weight ? String(numbers.weight) : '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync internal state when numbers prop changes externally (e.g. on Retake reset)
  useEffect(() => {
    setSystolic(numbers.systolic ? String(numbers.systolic) : '');
    setDiastolic(numbers.diastolic ? String(numbers.diastolic) : '');
    setBloodSugar(numbers.bloodSugar ? String(numbers.bloodSugar) : '');
    setSugarType(numbers.sugarType || 'fasting');
    setSugarUnit(numbers.sugarUnit || 'mg/dL');
    setUnitSystem(numbers.unitSystem || 'metric');
    setHeight(numbers.height ? String(numbers.height) : '');
    setWeight(numbers.weight ? String(numbers.weight) : '');
  }, [numbers]);

  // Real-time calculations
  const numSystolic = systolic ? Number(systolic) : undefined;
  const numDiastolic = diastolic ? Number(diastolic) : undefined;
  const numSugar = bloodSugar ? Number(bloodSugar) : undefined;
  const numHeight = height ? Number(height) : 0;
  const numWeight = weight ? Number(weight) : 0;

  const bpAnalysis = analyzeBloodPressure(numSystolic, numDiastolic);
  const sugarAnalysis = analyzeBloodSugar(numSugar, sugarType, sugarUnit);
  const bmiAnalysis = calculateBMI(numWeight, numHeight, unitSystem);

  const handleSaveAndSync = () => {
    const updated: HealthNumbers = {
      systolic: numSystolic && numSystolic > 0 ? numSystolic : undefined,
      diastolic: numDiastolic && numDiastolic > 0 ? numDiastolic : undefined,
      bloodSugar: numSugar && numSugar > 0 ? numSugar : undefined,
      sugarType,
      sugarUnit,
      height: numHeight > 0 ? numHeight : undefined,
      weight: numWeight > 0 ? numWeight : undefined,
      unitSystem,
    };
    onNumbersChange(updated);
    saveNumbersToLocal(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetNumbers = () => {
    setSystolic('');
    setDiastolic('');
    setBloodSugar('');
    setHeight('');
    setWeight('');
    const reset: HealthNumbers = {
      sugarType,
      sugarUnit,
      unitSystem,
      systolic: undefined,
      diastolic: undefined,
      bloodSugar: undefined,
      height: undefined,
      weight: undefined,
    };
    onNumbersChange(reset);
    saveNumbersToLocal(reset);
  };

  const handleQuickPreset = (type: 'healthy' | 'review') => {
    if (type === 'healthy') {
      setSystolic('118');
      setDiastolic('76');
      setBloodSugar(sugarUnit === 'mg/dL' ? '88' : '4.9');
      setHeight(unitSystem === 'metric' ? '165' : '65');
      setWeight(unitSystem === 'metric' ? '62' : '136');
    } else {
      setSystolic('134');
      setDiastolic('86');
      setBloodSugar(sugarUnit === 'mg/dL' ? '112' : '6.2');
      setHeight(unitSystem === 'metric' ? '160' : '63');
      setWeight(unitSystem === 'metric' ? '74' : '163');
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-28 pt-2 text-left max-w-md mx-auto"
    >
      {/* Category header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-sky-800">
          <Stethoscope className="w-4 h-4" />
          <span>Optional Vitals & BMI</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
          <span>Booth & Home numbers</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Add Your Numbers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Got your blood pressure, sugar, or measurements from a check or our conference booth? Enter them for instant, friendly educational context.
        </p>
      </motion.div>

      {/* Quick Demo Presets */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 pt-0.5">
        <span className="text-[11px] font-bold text-slate-500">Quick Demo:</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleQuickPreset('healthy')}
          className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
        >
          Optimal Range
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleQuickPreset('review')}
          className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition cursor-pointer"
        >
          Worth Discussing
        </motion.button>
      </motion.div>

      {/* SECTION 1: BLOOD PRESSURE */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Blood Pressure</h3>
              <p className="text-[11px] text-slate-500">Systolic / Diastolic (mmHg)</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">Standard cuff</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Top (Systolic)
            </label>
            <input
              type="number"
              placeholder="e.g. 118"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Bottom (Diastolic)
            </label>
            <input
              type="number"
              placeholder="e.g. 78"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Real-time BP Feedback */}
        <AnimatePresence mode="wait">
          {bpAnalysis && (
            <motion.div
              key={bpAnalysis.category}
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`p-3 rounded-xl border ${bpAnalysis.badgeBg} ${bpAnalysis.borderClass}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black ${bpAnalysis.badgeText}`}>
                  {bpAnalysis.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  AHA / NHF Guide
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                {bpAnalysis.guidance}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* SECTION 2: BLOOD SUGAR */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Blood Sugar (Glucose)</h3>
              <p className="text-[11px] text-slate-500">Fasting or Random reading</p>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-slate-100 p-1 rounded-xl flex">
            <button
              onClick={() => setSugarType('fasting')}
              className={`flex-1 py-1 text-xs font-bold rounded-lg transition ${
                sugarType === 'fasting' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Fasting
            </button>
            <button
              onClick={() => setSugarType('random')}
              className={`flex-1 py-1 text-xs font-bold rounded-lg transition ${
                sugarType === 'random' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Random
            </button>
          </div>

          <div className="bg-slate-100 p-1 rounded-xl flex">
            <button
              onClick={() => setSugarUnit('mg/dL')}
              className={`flex-1 py-1 text-xs font-bold rounded-lg transition ${
                sugarUnit === 'mg/dL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              mg/dL
            </button>
            <button
              onClick={() => setSugarUnit('mmol/L')}
              className={`flex-1 py-1 text-xs font-bold rounded-lg transition ${
                sugarUnit === 'mmol/L' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              mmol/L
            </button>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-600 block mb-1">
            Glucose Value ({sugarUnit})
          </label>
          <input
            type="number"
            step="0.1"
            placeholder={sugarUnit === 'mg/dL' ? 'e.g. 92' : 'e.g. 5.1'}
            value={bloodSugar}
            onChange={(e) => setBloodSugar(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50"
          />
        </div>

        <AnimatePresence mode="wait">
          {sugarAnalysis && (
            <motion.div
              key={sugarAnalysis.category}
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`p-3 rounded-xl border ${sugarAnalysis.badgeBg}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black ${sugarAnalysis.badgeText}`}>
                  {sugarAnalysis.category}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  {sugarType}
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                {sugarAnalysis.guidance}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* SECTION 3: HEIGHT, WEIGHT & AUTO-BMI */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Height & Weight (BMI)</h3>
              <p className="text-[11px] text-slate-500">Auto-calculated BMI band</p>
            </div>
          </div>

          <div className="bg-slate-100 p-0.5 rounded-lg flex text-[11px] font-bold">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-2 py-0.5 rounded-md transition ${
                unitSystem === 'metric' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-2 py-0.5 rounded-md transition ${
                unitSystem === 'imperial' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Imperial
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Height ({unitSystem === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              placeholder={unitSystem === 'metric' ? '165' : '65'}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              placeholder={unitSystem === 'metric' ? '65' : '143'}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>
        </div>

        {/* BMI Results Box */}
        <AnimatePresence mode="wait">
          {bmiAnalysis && (
            <motion.div
              key={bmiAnalysis.category}
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Body Mass Index
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    {bmiAnalysis.bmi} <span className="text-xs font-semibold text-slate-500">kg/m²</span>
                  </span>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${bmiAnalysis.badgeBg}`}>
                  {bmiAnalysis.category}
                </span>
              </div>

              {/* Visual indicator bar */}
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, Math.max(10, ((bmiAnalysis.bmi - 14) / 26) * 100))}%`,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full ${bmiAnalysis.progressColor}`}
                />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {bmiAnalysis.guidance}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action CTA Bar */}
      <motion.div variants={itemVariants} className="space-y-2.5 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveAndSync}
          className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
        >
          {savedSuccess ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Numbers Saved on Device!</span>
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Save & Include in My Summary</span>
            </div>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('summary')}
          className="w-full py-3 px-6 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>View Full Health Summary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </motion.div>

      {/* Bottom disclaimer */}
      <motion.div variants={itemVariants} className="text-center text-[11px] text-slate-500 px-2 leading-relaxed">
        Educational reference values based on Nigerian Heart Foundation & WHO guidelines.
      </motion.div>
    </motion.div>
  );
};
