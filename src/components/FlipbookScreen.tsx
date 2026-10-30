import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, HealthNumbers, SummaryResults } from '../types';
import { generateSummary, calculateBMI } from '../utils/healthLogic';
import { IWOSAN_CONTACT_INFO } from '../data/locations';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShieldCheck,
  Activity,
  Droplet,
  Sparkles,
  Calendar,
  Phone,
  MessageSquare,
  QrCode,
  Printer,
  CheckCircle2,
  Building2,
  Leaf,
  Moon,
  Footprints,
  Users,
  Compass,
  TrendingUp,
  Scan,
  BookOpen,
  Check,
  Eye,
  TriangleAlert,
  Stethoscope,
  Scale,
  SquarePlus,
  Mic,
  Briefcase,
  HeartPulse,
  Plus,
  Repeat,
  RotateCw,
  Share2,
  MapPin,
  Smartphone,
  Info,
  FileText,
} from 'lucide-react';

interface FlipbookScreenProps {
  answers: Record<string, string>;
  numbers: HealthNumbers;
  onNavigate: (screen: ScreenId) => void;
  onOpenQR?: () => void;
}

const TOTAL_PAGES = 9;

const PAGE_META = [
  { number: 1, title: 'Cover', subtitle: 'E-Health Passport' },
  { number: 2, title: 'Profile', subtitle: 'Fit@25 baseline' },
  { number: 3, title: 'Map One', subtitle: 'The map, part one' },
  { number: 4, title: 'Map Two', subtitle: 'The map, part two' },
  { number: 5, title: 'Prep', subtitle: 'Things to discuss' },
  { number: 6, title: 'Screening', subtitle: 'Your screening timetable' },
  { number: 7, title: 'Roadmap', subtitle: 'Your twelve-month roadmap' },
  { number: 8, title: 'Milestones', subtitle: 'Checkpoints & pledge' },
  { number: 9, title: 'Clinical Booth', subtitle: 'Iwosan clinical booth' },
];

export const FlipbookScreen: React.FC<FlipbookScreenProps> = ({
  answers,
  numbers,
  onNavigate,
  onOpenQR,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1); // 1 = forward, -1 = backward
  const [roadmapTasks, setRoadmapTasks] = useState<Record<string, boolean>>({
    q1: true,
    q2: false,
    q3: false,
    q4: false,
  });

  const toggleRoadmapTask = (key: string) => {
    setRoadmapTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedRoadmapCount = Object.values(roadmapTasks).filter(Boolean).length;

  const summary: SummaryResults = generateSummary(answers, numbers);

  // Derived user details
  const ageRaw = answers['q1_age'] || '';
  let ageBand = '25 – 34';
  if (ageRaw.includes('40') || ageRaw.includes('49')) ageBand = '40 – 49';
  else if (ageRaw.includes('50') || ageRaw.includes('60') || ageRaw.includes('plus')) ageBand = '50+';
  else if (ageRaw.includes('30') || ageRaw.includes('35')) ageBand = '30 – 39';
  else if (ageRaw.includes('18') || ageRaw.includes('20')) ageBand = '18 – 24';

  const occupationAnswer = answers['q0_occupation'] || 'corporate';
  const occupationLabel =
    occupationAnswer === 'corporate'
      ? 'Corporate / Executive Leader'
      : occupationAnswer === 'entrepreneur'
      ? 'Entrepreneur / Business Owner'
      : occupationAnswer === 'public_service'
      ? 'Public Service / Civil Sector'
      : occupationAnswer === 'student_early'
      ? 'Emerging Professional / Graduate'
      : 'WIMBIZ Delegate';

  const bmiData =
    numbers.height && numbers.weight
      ? calculateBMI(numbers.weight, numbers.height, numbers.unitSystem || 'metric')
      : null;

  const goToNextPage = () => {
    if (currentPage < TOTAL_PAGES) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const jumpToPage = (page: number) => {
    if (page === currentPage) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const handleDownloadFullPdf = () => {
    const origTitle = document.title;
    document.title = `Iwosan_WIMBIZ_25_Wellness_Passport_9_Pages_${new Date().toISOString().split('T')[0]}`;
    window.print();
    setTimeout(() => {
      document.title = origTitle;
    }, 1500);
  };

  const handlePrint = handleDownloadFullPdf;

  // Current formatted page string (e.g., "01/06")
  const pageNumberString = `0${currentPage}/0${TOTAL_PAGES}`;
  const currentTitle = PAGE_META[currentPage - 1].title;

  // Render content for a specific flipbook page (used for both screen viewer and 9-page PDF printout)
  const renderPageContent = (pageIndex: number, isPrint = false) => {
    return (
      <>
                {/* ---------------------------------------------------- */}
                {/* PAGE 1: EXACT MATCH TO image_cefdcbc8.png            */}
                {/* ---------------------------------------------------- */}
                {pageIndex === 1 && (
                  <div className={`flex-1 bg-gradient-to-b from-[#081934] via-[#0b2144] to-[#051124] text-white ${isPrint ? "p-4 sm:p-5" : "p-5 sm:p-6"} flex flex-col justify-between relative overflow-hidden select-none`}>
                    {/* Security Subtle Grid Tint */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#00B1DA_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Top Row: "Iwosan Clinical / WIMBIZ 25th Annual" + "25 Years" Circular Seal */}
                    <div className="flex items-start justify-between relative z-10 pt-1">
                      <div className="text-left space-y-0.5">
                        <div className="text-[11px] font-mono font-bold tracking-[0.22em] text-slate-300 uppercase">
                          Iwosan Clinical
                        </div>
                        <div className="text-[10px] font-medium text-slate-400 tracking-wider">
                          WIMBIZ 25th Annual
                        </div>
                      </div>

                      {/* 25 Years Concentric Dotted Badge */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#00B1DA]/40 flex flex-col items-center justify-center p-1 bg-white/[0.02] shadow-[0_0_15px_rgba(0,177,218,0.15)]">
                        <span className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight leading-none">
                          25
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-slate-400 font-medium tracking-wide mt-0.5 uppercase">
                          Years
                        </span>
                      </div>
                    </div>

                    {/* Center Artwork: Concentric Vital Orbit + Heartbeat Crest */}
                    <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
                      {/* Multi-Ring Radar Pulse */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-slate-700/60 flex items-center justify-center relative shadow-inner">
                        {/* Mid Dashed Ring */}
                        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-slate-600/60 border-dashed flex items-center justify-center">
                          {/* Inner Vital Badge */}
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0b2144] via-[#07172f] to-[#040e1f] border-2 border-[#00B1DA] flex items-center justify-center shadow-[0_0_24px_rgba(0,177,218,0.4)]">
                            {/* Vital Pulse SVG */}
                            <svg
                              viewBox="0 0 36 36"
                              className="w-8 h-8 text-[#00B1DA]"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="18" cy="18" r="14" fill="#00B1DA" fillOpacity="0.2" />
                              <path
                                d="M 7 18 L 12 18 L 14.5 12 L 18 24 L 21.5 14 L 24 18 L 29 18"
                                stroke="#47B549"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Sub-kicker & E-Health Passport Title (Matching image_cefdcbc8.png) */}
                      <div className="mt-3.5 space-y-1">
                        <div className="text-[10px] tracking-[0.25em] font-medium text-slate-400 uppercase">
                          WIMBIZ × IWOSAN
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center justify-center">
                          <span>E-Health</span>
                          <span className="font-serif italic font-normal text-[#47B549] ml-2">Passport</span>
                        </h2>
                      </div>

                      {/* Pillar Map Description */}
                      <p className="text-[11px] text-slate-400 max-w-[270px] mt-2 leading-relaxed">
                        Baseline profile · twelve-pillar health map · twelve-month plan
                      </p>
                    </div>

                    {/* Bottom Identity Card: Issued to WIMBIZ Delegate */}
                    <div className="relative z-10 space-y-2.5">
                      <div className="bg-[#0b1c38]/80 border border-slate-800/90 rounded-2xl p-3.5 sm:p-4 text-left shadow-sm backdrop-blur-xs">
                        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                          Issued to
                        </div>
                        <div className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5 truncate">
                          {occupationLabel}
                        </div>

                        {/* Dashed Separator */}
                        <div className="border-b border-dashed border-slate-700/70 my-2.5" />

                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <div className="text-[10px] text-slate-400">Age band</div>
                            <div className="font-bold text-slate-200 mt-0.5">{ageBand}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-slate-400">Issued</div>
                            <div className="font-bold text-slate-200 mt-0.5">19 Oct 2026</div>
                          </div>
                        </div>
                      </div>

                      {/* MRZ Code Zone Strip (Matching image_cefdcbc8.png) */}
                      <div className="bg-[#061224]/90 border border-slate-800/80 rounded-xl px-3 py-2 font-mono text-[9px] text-slate-400 tracking-wider text-left select-none overflow-x-hidden leading-relaxed">
                        <div className="truncate">P&lt;WIMBIZ&lt;IWOSAN&lt;&lt;IW250810&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                        <div className="truncate">IW08102026&lt;&lt;&lt;2534&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                      </div>

                      {/* Swipe or Tap to Open CTA */}
                      {!isPrint && (
                        <button
                          type="button"
                          onClick={goToNextPage}
                          className="w-full text-center py-1 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition cursor-pointer print:hidden"
                        >
                          <span>→ Swipe to open</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 2: FIT@25 BASELINE PROFILE (Matches image_6019a855.png) */}
                {/* ---------------------------------------------------- */}
                {pageIndex === 2 && (
                  <div className={`flex-1 ${isPrint ? "p-3.5 sm:p-4" : "p-5 sm:p-6"} bg-white text-slate-900 flex flex-col justify-between relative select-none`}>
                    <div>
                      {/* Top Meta Line: "Baseline profile" + "Page 01" */}
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Baseline profile</span>
                        <span className="font-mono">Page 01</span>
                      </div>

                      {/* Main Title: "Fit@25 baseline" */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
                        Fit@25 <span className="font-serif italic font-normal text-slate-800">baseline</span>
                      </h3>

                      {/* Description Subtitle */}
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                        A one-page record of where you are today. Nothing here is a diagnosis — it is a starting line.
                      </p>

                      {/* 6-Card Baseline Vitals Grid (2 cols x 3 rows) */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-4">
                        {/* 1. Age band */}
                        <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-2.5 sm:p-3">
                          <div className="text-[10px] text-slate-400 font-medium">Age band</div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{ageBand}</div>
                        </div>

                        {/* 2. Date issued */}
                        <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-2.5 sm:p-3">
                          <div className="text-[10px] text-slate-400 font-medium">Date issued</div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">19 Oct 2026</div>
                        </div>

                        {/* 3. Check status */}
                        <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-2.5 sm:p-3">
                          <div className="text-[10px] text-slate-400 font-medium">Check status</div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                            {Object.keys(answers).length > 0
                              ? `${Math.min(Object.keys(answers).length, 9)} of 9 answered`
                              : '8 of 9 answered'}
                          </div>
                        </div>

                        {/* 4. BMI */}
                        <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-2.5 sm:p-3">
                          <div className="text-[10px] text-slate-400 font-medium">BMI</div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 truncate">
                            {bmiData ? `${bmiData.bmi} (${bmiData.category})` : 'Not set'}
                          </div>
                        </div>

                        {/* 5. Last BP */}
                        <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-2.5 sm:p-3">
                          <div className="text-[10px] text-slate-400 font-medium">Last BP</div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                            {numbers.systolic && numbers.diastolic ? `${numbers.systolic}/${numbers.diastolic}` : 'Not saved'}
                          </div>
                        </div>

                        {/* 6. Passport no. */}
                        <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-2.5 sm:p-3">
                          <div className="text-[10px] text-slate-400 font-medium">Passport no.</div>
                          <div className="text-sm sm:text-base font-bold font-mono text-slate-900 mt-0.5">IW25-0810</div>
                        </div>
                      </div>

                      {/* Section 2: Digital Badges */}
                      <div className="mt-4">
                        <div className="text-[11px] font-medium text-slate-400 tracking-wide mb-2">
                          Digital badges
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {/* Badge 1: Fit@25 Verified (Active Green) */}
                          <div className="bg-[#47B549]/10 border border-[#47B549]/40 rounded-2xl p-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#47B549] shadow-2xs shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-[#47B549]" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-900 leading-tight">Fit@25 Verified</div>
                                <div className="text-[10px] text-slate-500 leading-none mt-0.5">Awareness check complete</div>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#47B549] flex items-center justify-center text-white shrink-0 ml-1">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          </div>

                          {/* Badge 2: Numbers on File */}
                          <div
                            className={`rounded-2xl p-2.5 flex items-center gap-2 border ${
                              numbers.systolic || numbers.bloodSugar
                                ? 'bg-[#00B1DA]/10 border-[#00B1DA]/40'
                                : 'bg-slate-50/60 border-dashed border-slate-200 opacity-60'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-500 shadow-2xs shrink-0">
                              <TrendingUp className="w-3.5 h-3.5 text-[#00B1DA]" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-800 leading-tight">Numbers on File</div>
                              <div className="text-[10px] text-slate-500 leading-none mt-0.5">
                                {numbers.systolic || numbers.bloodSugar ? 'Readings recorded' : 'No readings saved yet'}
                              </div>
                            </div>
                          </div>

                          {/* Badge 3: Booth Ready (Active Blue) */}
                          <div className="bg-[#00B1DA]/10 border border-[#00B1DA]/40 rounded-2xl p-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#00B1DA] shadow-2xs shrink-0">
                                <Scan className="w-4 h-4 text-[#00B1DA]" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-900 leading-tight">Booth Ready</div>
                                <div className="text-[10px] text-slate-500 leading-none mt-0.5">Bring this to the Iwosan booth</div>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#081934] flex items-center justify-center text-white shrink-0 ml-1">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          </div>

                          {/* Badge 4: Passport Complete */}
                          <div
                            className={`rounded-2xl p-2.5 flex items-center gap-2 border ${
                              Object.keys(answers).length >= 8
                                ? 'bg-[#47B549]/10 border-[#47B549]/40'
                                : 'bg-slate-50/60 border-dashed border-slate-200 opacity-60'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-500 shadow-2xs shrink-0">
                              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-800 leading-tight">Passport Complete</div>
                              <div className="text-[10px] text-slate-500 leading-none mt-0.5">
                                {Object.keys(answers).length >= 8 ? 'Passport ready' : 'Finish the check to close it'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Inside this passport (Directory) */}
                      <div className="mt-4">
                        <div className="text-[11px] font-medium text-slate-400 tracking-wide mb-1.5">
                          Inside this passport
                        </div>

                        <div className="divide-y divide-slate-100 text-xs">
                          <button
                            type="button"
                            onClick={() => jumpToPage(3)}
                            className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 px-1 rounded transition cursor-pointer"
                          >
                            <span className="font-bold text-slate-800">Twelve-pillar health map</span>
                            <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1">
                              02–03 <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => jumpToPage(5)}
                            className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 px-1 rounded transition cursor-pointer"
                          >
                            <span className="font-bold text-slate-800">Clinical prep list</span>
                            <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1">
                              04 <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => jumpToPage(6)}
                            className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 px-1 rounded transition cursor-pointer"
                          >
                            <span className="font-bold text-slate-800">Preventive screening plan</span>
                            <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1">
                              05 <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => jumpToPage(7)}
                            className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 px-1 rounded transition cursor-pointer"
                          >
                            <span className="font-bold text-slate-800">Twelve-month action plan</span>
                            <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1">
                              06 <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => jumpToPage(8)}
                            className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 px-1 rounded transition cursor-pointer"
                          >
                            <span className="font-bold text-slate-800">Milestones & signature</span>
                            <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1">
                              07 <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => jumpToPage(9)}
                            className="w-full flex items-center justify-between py-2 text-left hover:bg-slate-50 px-1 rounded transition cursor-pointer"
                          >
                            <span className="font-bold text-slate-800">Booth details & disclaimer</span>
                            <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1">
                              08 <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Section Footer Footnote */}
                    <div className="pt-3 border-t border-dashed border-slate-200 mt-2">
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Held only on this device. Your delegate passport number is reference only and is not linked to any clinical record.
                      </p>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 3: THE MAP, PART ONE (Matches image_80ebe606.png)*/}
                {/* ---------------------------------------------------- */}
                {pageIndex === 3 && (
                  <div className={`flex-1 ${isPrint ? "p-3.5 sm:p-4" : "p-5 sm:p-6"} bg-white text-slate-900 flex flex-col justify-between relative select-none`}>
                    <div>
                      {/* Top Meta Line: "Health conversation map" + "Page 02" */}
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Health conversation map</span>
                        <span className="font-mono">Page 02</span>
                      </div>

                      {/* Main Title: "The map, part one" */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
                        The map, <span className="font-serif italic font-normal text-slate-800">part one</span>
                      </h3>

                      {/* Description Subtitle */}
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                        Six pillars. Each visa stamp is a status, not a verdict — read it as a prompt for the next conversation.
                      </p>

                      {/* Status Metric Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3.5">
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800">
                          <span>4</span>
                          <span className="w-2 h-2 rounded-full bg-[#47B549]" />
                          <span className="font-medium text-slate-600 text-[11px]">Doing well</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800">
                          <span>6</span>
                          <span className="w-2 h-2 rounded-full bg-[#00B1DA]" />
                          <span className="font-medium text-slate-600 text-[11px]">Pay attention</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800">
                          <span>1</span>
                          <span className="w-2 h-2 rounded-full bg-[#081934]" />
                          <span className="font-medium text-slate-600 text-[11px]">Clinical review</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800">
                          <span>1</span>
                          <span className="w-2 h-2 rounded-full bg-slate-900" />
                          <span className="font-medium text-slate-600 text-[11px]">Prompt attention</span>
                        </div>
                      </div>

                      {/* The 6 Pillar Cards */}
                      <div className="space-y-2.5 mt-3.5">
                        {/* 01: Blood pressure */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">01</span>
                              <Heart className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Blood pressure</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                {numbers.systolic && numbers.diastolic
                                  ? `${numbers.systolic}/${numbers.diastolic} mmHg recorded. Baseline monitored on device.`
                                  : 'Last check was one to two years ago. Worth re-booking this year.'}
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#00B1DA] flex flex-col items-center justify-center text-[#00B1DA] shrink-0 bg-[#00B1DA]/5">
                            <Eye className="w-3.5 h-3.5 stroke-[2]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Watch</span>
                          </div>
                        </div>

                        {/* 02: Blood sugar */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">02</span>
                              <Droplet className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Blood sugar</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                {numbers.bloodSugar
                                  ? `${numbers.bloodSugar} ${numbers.sugarUnit || 'mg/dL'} on file. Routine glycemic surveillance.`
                                  : 'A year or two since the last test. Worth pairing with your next check.'}
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#00B1DA] flex flex-col items-center justify-center text-[#00B1DA] shrink-0 bg-[#00B1DA]/5">
                            <Eye className="w-3.5 h-3.5 stroke-[2]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Watch</span>
                          </div>
                        </div>

                        {/* 03: Family history */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">03</span>
                              <Users className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Family history</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                No known family history — reassuring, and routine checks still matter.
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#47B549] flex flex-col items-center justify-center text-[#47B549] shrink-0 bg-[#47B549]/5">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Well</span>
                          </div>
                        </div>

                        {/* 04: Nutrition */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">04</span>
                              <Leaf className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Nutrition</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                Rarely. Start with a single serving added to a meal you already eat.
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-[#081934] text-white flex flex-col items-center justify-center shadow-xs shrink-0">
                            <TriangleAlert className="w-3.5 h-3.5 stroke-[2] text-white" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Prompt</span>
                          </div>
                        </div>

                        {/* 05: Movement */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">05</span>
                              <Footprints className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Movement</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                Two to three sessions a week. A short walk on the other days adds up.
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#00B1DA] flex flex-col items-center justify-center text-[#00B1DA] shrink-0 bg-[#00B1DA]/5">
                            <Eye className="w-3.5 h-3.5 stroke-[2]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Watch</span>
                          </div>
                        </div>

                        {/* 06: Sleep & stress */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">06</span>
                              <Moon className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Sleep & stress</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                Not answered yet. Sleep belongs in the health conversation.
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#00B1DA] flex flex-col items-center justify-center text-[#00B1DA] shrink-0 bg-[#00B1DA]/5">
                            <Eye className="w-3.5 h-3.5 stroke-[2]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Watch</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Footer Footnote */}
                    <div className="pt-3 border-t border-dashed border-slate-200 mt-3">
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Visa status reflects your own answers, not a clinical finding. A clinician is the only person who can interpret these pillars together.
                      </p>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 4: THE MAP, PART TWO (Matches image_268c2c40.png)*/}
                {/* ---------------------------------------------------- */}
                {pageIndex === 4 && (
                  <div className={`flex-1 ${isPrint ? "p-3.5 sm:p-4" : "p-5 sm:p-6"} bg-white text-slate-900 flex flex-col justify-between relative select-none`}>
                    <div>
                      {/* Top Meta Line: "Health conversation map" + "Page 03" */}
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Health conversation map</span>
                        <span className="font-mono">Page 03</span>
                      </div>

                      {/* Main Title: "The map, part two" */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
                        The map, <span className="font-serif italic font-normal text-slate-800">part two</span>
                      </h3>

                      {/* Description Subtitle */}
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                        The remaining six. Taken together they form the picture a clinician would want to see.
                      </p>

                      {/* The 6 Pillar Cards */}
                      <div className="space-y-2.5 mt-4">
                        {/* 01: Screening rhythm */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">01</span>
                              <ShieldCheck className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Screening rhythm</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                Not discussed yet. Ask which checks apply at your stage of life.
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#081934] flex flex-col items-center justify-center text-[#081934] shrink-0 bg-slate-50">
                            <Stethoscope className="w-3.5 h-3.5 stroke-[2]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Review</span>
                          </div>
                        </div>

                        {/* 02: Routine care */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">02</span>
                              <Calendar className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Routine care</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                One to two years since a routine check. Time to put one in the diary.
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#00B1DA] flex flex-col items-center justify-center text-[#00B1DA] shrink-0 bg-[#00B1DA]/5">
                            <Eye className="w-3.5 h-3.5 stroke-[2]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Watch</span>
                          </div>
                        </div>

                        {/* 03: Breast awareness */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">03</span>
                              <Heart className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Breast awareness</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                Self-awareness is the check at this stage. Screening starts later.
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#47B549] flex flex-col items-center justify-center text-[#47B549] shrink-0 bg-[#47B549]/5">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Well</span>
                          </div>
                        </div>

                        {/* 04: Cervical health */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">04</span>
                              <ShieldCheck className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Cervical health</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                Screening usually begins around 25 — you are inside the window.
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#47B549] flex flex-col items-center justify-center text-[#47B549] shrink-0 bg-[#47B549]/5">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Well</span>
                          </div>
                        </div>

                        {/* 05: Bone & strength */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">05</span>
                              <SquarePlus className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Bone & strength</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                No action needed now. Strength work is the long-term investment.
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#47B549] flex flex-col items-center justify-center text-[#47B549] shrink-0 bg-[#47B549]/5">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Well</span>
                          </div>
                        </div>

                        {/* 06: Weight & metabolic */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0">
                              <span className="text-[8.5px] font-mono text-slate-400 absolute top-1 left-1.5 font-bold">06</span>
                              <Scale className="w-4 h-4 text-slate-700 stroke-[1.8] mt-1" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Weight & metabolic</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                {bmiData
                                  ? `BMI ${bmiData.bmi} (${bmiData.category}) calculated from logged height and weight.`
                                  : 'Add height and weight and this pillar completes itself.'}
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-dashed border-[#00B1DA] flex flex-col items-center justify-center text-[#00B1DA] shrink-0 bg-[#00B1DA]/5">
                            <Eye className="w-3.5 h-3.5 stroke-[2]" />
                            <span className="text-[7.5px] font-bold uppercase tracking-wider mt-0.5">Watch</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Footer Footnote */}
                    <div className="pt-3 border-t border-dashed border-slate-200 mt-3">
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Visa status reflects your own answers, not a clinical finding. A clinician is the only person who can interpret these pillars together.
                      </p>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 5: THINGS TO DISCUSS (Matches image_911c706d.png)*/}
                {/* ---------------------------------------------------- */}
                {pageIndex === 5 && (
                  <div className={`flex-1 ${isPrint ? 'p-3 sm:p-4' : 'p-5 sm:p-6'} bg-white text-slate-900 flex flex-col justify-between relative select-none`}>
                    <div>
                      {/* Top Meta Line: "Clinical preparation" + "Page 04" */}
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Clinical preparation</span>
                        <span className="font-mono">Page 04</span>
                      </div>

                      {/* Main Title: "Things to discuss" */}
                      <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 ${isPrint ? 'mt-1' : 'mt-2'}`}>
                        Things to <span className="font-serif italic font-normal text-slate-800">discuss</span>
                      </h3>

                      {/* Description Subtitle */}
                      <p className={`text-xs sm:text-[13px] text-slate-500 ${isPrint ? 'mt-0.5' : 'mt-1.5'} leading-relaxed`}>
                        Five minutes of preparation turns a rushed appointment into a useful one. Read these aloud if it helps.
                      </p>

                      {/* 6 Discussion Item Cards */}
                      <div className={isPrint ? 'space-y-1 mt-2' : 'space-y-2 mt-4'}>
                        {/* 1. Nutrition */}
                        <div className={`bg-white border border-slate-200/90 rounded-2xl ${isPrint ? 'p-1.5 px-2.5' : 'p-2.5 sm:p-3'} shadow-2xs`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-[#081934] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                              1
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900">Nutrition</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block ml-0.5" />
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-600 pl-7 leading-snug">
                            “What is one realistic change to my meals that would actually move my numbers?”
                          </p>
                        </div>

                        {/* 2. Screening rhythm */}
                        <div className={`bg-white border border-slate-200/90 rounded-2xl ${isPrint ? 'p-1.5 px-2.5' : 'p-2.5 sm:p-3'} shadow-2xs`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-[#081934] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                              2
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900">Screening rhythm</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#081934] inline-block ml-0.5" />
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-600 pl-7 leading-snug">
                            “Which screening tests am I due for this year, and how do I book them?”
                          </p>
                        </div>

                        {/* 3. Blood pressure */}
                        <div className={`bg-white border border-slate-200/90 rounded-2xl ${isPrint ? 'p-1.5 px-2.5' : 'p-2.5 sm:p-3'} shadow-2xs`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-[#081934] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                              3
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900">Blood pressure</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00B1DA] inline-block ml-0.5" />
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-600 pl-7 leading-snug">
                            “What is my blood pressure, and should I be measuring it at home between visits?”
                          </p>
                        </div>

                        {/* 4. Blood sugar */}
                        <div className={`bg-white border border-slate-200/90 rounded-2xl ${isPrint ? 'p-1.5 px-2.5' : 'p-2.5 sm:p-3'} shadow-2xs`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-[#081934] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                              4
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900">Blood sugar</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00B1DA] inline-block ml-0.5" />
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-600 pl-7 leading-snug">
                            “Should I have a fasting glucose or HbA1c test this year, and what would we do with the result?”
                          </p>
                        </div>

                        {/* 5. Movement */}
                        <div className={`bg-white border border-slate-200/90 rounded-2xl ${isPrint ? 'p-1.5 px-2.5' : 'p-2.5 sm:p-3'} shadow-2xs`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-[#081934] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                              5
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900">Movement</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00B1DA] inline-block ml-0.5" />
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-600 pl-7 leading-snug">
                            “What kind of movement is safe and useful for me to start with, given my joints?”
                          </p>
                        </div>

                        {/* 6. Sleep & stress */}
                        <div className={`bg-white border border-slate-200/90 rounded-2xl ${isPrint ? 'p-1.5 px-2.5' : 'p-2.5 sm:p-3'} shadow-2xs`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-[#081934] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                              6
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900">Sleep & stress</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00B1DA] inline-block ml-0.5" />
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-600 pl-7 leading-snug">
                            “My sleep is broken most weeks. What should we rule out before we talk about habits?”
                          </p>
                        </div>
                      </div>

                      {/* Bring with you Box */}
                      <div className={`rounded-2xl border border-[#47B549]/35 bg-[#47B549]/5 ${isPrint ? 'p-2 space-y-1 mt-2' : 'p-3 sm:p-3.5 space-y-2 mt-3.5'}`}>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                          <Briefcase className="w-4 h-4 text-[#47B549] stroke-[2.2]" />
                          <span className="tracking-tight text-[#081934] font-bold">Bring with you</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          <span className="inline-flex items-center bg-white/95 border border-[#47B549]/30 rounded-full px-2.5 py-1 text-[10.5px] sm:text-[11px] font-medium text-slate-700 shadow-2xs">
                            Last blood pressure reading
                          </span>
                          <span className="inline-flex items-center bg-white/95 border border-[#47B549]/30 rounded-full px-2.5 py-1 text-[10.5px] sm:text-[11px] font-medium text-slate-700 shadow-2xs">
                            Cycle dates from the last 3 months
                          </span>
                          <span className="inline-flex items-center bg-white/95 border border-[#47B549]/30 rounded-full px-2.5 py-1 text-[10.5px] sm:text-[11px] font-medium text-slate-700 shadow-2xs">
                            Any medication you take
                          </span>
                          <span className="inline-flex items-center bg-white/95 border border-[#47B549]/30 rounded-full px-2.5 py-1 text-[10.5px] sm:text-[11px] font-medium text-slate-700 shadow-2xs">
                            Family history notes
                          </span>
                          <span className="inline-flex items-center bg-white/95 border border-[#47B549]/30 rounded-full px-2.5 py-1 text-[10.5px] sm:text-[11px] font-medium text-slate-700 shadow-2xs">
                            Two questions you want answered
                          </span>
                        </div>
                      </div>

                      {/* Chaperone & Notes callout */}
                      <div className={`rounded-2xl border border-dashed border-slate-200/90 bg-slate-50/70 ${isPrint ? 'p-1.5 mt-1.5' : 'p-2.5 sm:p-3 mt-3'} flex items-center gap-2.5`}>
                        <div className="w-6 h-6 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-[#00B1DA] shrink-0 shadow-2xs">
                          <Mic className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-[10.5px] sm:text-[11px] text-slate-500 leading-snug">
                          You can ask for a chaperone, take notes, or bring someone with you. All three are reasonable.
                        </p>
                      </div>

                      {/* Status Key */}
                      <div className={isPrint ? 'pt-1.5' : 'pt-3'}>
                        <div className="text-[10px] font-medium text-slate-400 mb-1.5">
                          Status key
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[10px] sm:text-[11px] text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#47B549]" />
                            <span>Doing well</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00B1DA]" />
                            <span>Pay attention</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#081934]" />
                            <span>Clinical review</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-slate-900" />
                            <span>Prompt attention</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Footer Footnote */}
                    <div className={`border-t border-dashed border-slate-200 ${isPrint ? 'pt-1.5 mt-2' : 'pt-2.5 mt-3'}`}>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Sensitive topics around personal safety are automatically left out of the exported PDF.
                      </p>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 6: PREVENTIVE SCREENING (Matches image_59518671.png) */}
                {/* ---------------------------------------------------- */}
                {pageIndex === 6 && (
                  <div className={`flex-1 ${isPrint ? "p-3.5 sm:p-4" : "p-5 sm:p-6"} bg-white text-slate-900 flex flex-col justify-between relative select-none`}>
                    <div>
                      {/* Top Meta Line: "Preventive screening" + "Page 05" */}
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Preventive screening</span>
                        <span className="font-mono">Page 05</span>
                      </div>

                      {/* Main Title: "Your screening timetable" */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
                        Your screening <span className="font-serif italic font-normal text-slate-800">timetable</span>
                      </h3>

                      {/* Description Subtitle */}
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                        Screening is for people without symptoms. Anything new and unexplained needs its own appointment, not a wait for the next invitation.
                      </p>

                      {/* Featured Dark Banner: "Next one to book: Blood pressure - This year" */}
                      <div className="bg-[#081934] text-white rounded-3xl p-3.5 sm:p-4 flex items-center justify-between shadow-xs mt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                            <HeartPulse className="w-5 h-5 stroke-[2] text-white" />
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-none">
                              Next one to book
                            </div>
                            <div className="text-sm sm:text-base font-bold text-white mt-1">
                              Blood pressure
                            </div>
                          </div>
                        </div>
                        <span className="bg-[#00B1DA] text-[#081934] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-2xs">
                          This year
                        </span>
                      </div>

                      {/* Vertical Timeline with 5 Screening Cards */}
                      <div className="relative pl-6 sm:pl-7 space-y-2.5 mt-4">
                        {/* Continuous Vertical Guide Line */}
                        <div className="absolute left-2.5 top-5 bottom-5 w-px bg-slate-200" />

                        {/* 1. Blood pressure */}
                        <div className="relative">
                          {/* Dark Solid Node Dot */}
                          <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#081934] ring-4 ring-white" />
                          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <HeartPulse className="w-4 h-4 text-slate-700 stroke-[1.8] shrink-0" />
                              <div>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Blood pressure</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">At least once a year</p>
                              </div>
                            </div>
                            <span className="bg-[#081934] text-white text-[11px] font-bold px-3 py-1 rounded-full shrink-0 shadow-2xs">
                              Due now
                            </span>
                          </div>
                        </div>

                        {/* 2. Blood sugar / HbA1c */}
                        <div className="relative">
                          {/* Light Muted Node Dot */}
                          <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Droplet className="w-4 h-4 text-slate-700 stroke-[1.8] shrink-0" />
                              <div>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Blood sugar / HbA1c</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">Every 1–3 years from 35</p>
                              </div>
                            </div>
                            <span className="bg-slate-100 text-slate-500 text-[11px] font-medium px-3 py-1 rounded-full shrink-0">
                              Later
                            </span>
                          </div>
                        </div>

                        {/* 3. Cervical screening */}
                        <div className="relative">
                          {/* Dark Solid Node Dot */}
                          <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#081934] ring-4 ring-white" />
                          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <ShieldCheck className="w-4 h-4 text-slate-700 stroke-[1.8] shrink-0" />
                              <div>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Cervical screening</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">Every 3–5 years, 25 to 65</p>
                              </div>
                            </div>
                            <span className="bg-[#081934] text-white text-[11px] font-bold px-3 py-1 rounded-full shrink-0 shadow-2xs">
                              Due now
                            </span>
                          </div>
                        </div>

                        {/* 4. Breast screening */}
                        <div className="relative">
                          {/* Light Muted Node Dot */}
                          <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Heart className="w-4 h-4 text-slate-700 stroke-[1.8] shrink-0" />
                              <div>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Breast screening</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">Every 1–2 years from around 40–50</p>
                              </div>
                            </div>
                            <span className="bg-slate-100 text-slate-500 text-[11px] font-medium px-3 py-1 rounded-full shrink-0">
                              Later
                            </span>
                          </div>
                        </div>

                        {/* 5. Bone density (DEXA) */}
                        <div className="relative">
                          {/* Light Muted Node Dot */}
                          <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <SquarePlus className="w-4 h-4 text-slate-700 stroke-[1.8] shrink-0" />
                              <div>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Bone density (DEXA)</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">Around the menopause transition</p>
                              </div>
                            </div>
                            <span className="bg-slate-100 text-slate-500 text-[11px] font-medium px-3 py-1 rounded-full shrink-0">
                              Later
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Footer: Discreet booking action to connect with Iwosan */}
                    <div className="pt-3 border-t border-dashed border-slate-200 mt-4 flex items-center justify-between gap-3">
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Timetable based on clinical consensus. Discuss personal risk factors with your doctor.
                      </p>
                      <button
                        type="button"
                        onClick={() => onNavigate('contact')}
                        className="py-1.5 px-3 bg-[#47B549] hover:bg-[#3ea040] text-slate-950 font-bold text-[11px] rounded-full shrink-0 shadow-2xs transition cursor-pointer flex items-center gap-1"
                      >
                        Book screening
                      </button>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 7: LIFE & LEADERSHIP PLAN (Matches image_ebeb5c0d.png) */}
                {/* ---------------------------------------------------- */}
                {pageIndex === 7 && (
                  <div className={`flex-1 ${isPrint ? "p-3.5 sm:p-4" : "p-5 sm:p-6"} bg-white text-slate-900 flex flex-col justify-between relative select-none`}>
                    <div>
                      {/* Top Meta Line: "Life & leadership plan" + "Page 06" */}
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Life & leadership plan</span>
                        <span className="font-mono">Page 06</span>
                      </div>

                      {/* Main Title: "Your twelve-month roadmap" */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
                        Your twelve-month <span className="font-serif italic font-normal text-slate-800">roadmap</span>
                      </h3>

                      {/* Description Subtitle */}
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                        One clear action per quarter. Tap a circle to mark it done — this stays on your device.
                      </p>

                      {/* Progress Bar & Counter */}
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#081934] to-[#00B1DA] rounded-full transition-all duration-300"
                            style={{ width: `${(completedRoadmapCount / 4) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-500 shrink-0">
                          {completedRoadmapCount}/4 done
                        </span>
                      </div>

                      {/* 4 Quarter Action Cards */}
                      <div className="space-y-2.5 mt-4">
                        {/* Q1: Months 1-3 · Oct – Dec */}
                        <div
                          onClick={() => toggleRoadmapTask('q1')}
                          className={`rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3 cursor-pointer transition border ${
                            roadmapTasks.q1
                              ? 'bg-[#47B549]/5 border-[#47B549]/40'
                              : 'bg-white border-slate-200/90 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label="Toggle Q1 task"
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${
                                roadmapTasks.q1
                                  ? 'bg-[#47B549] text-white shadow-2xs'
                                  : 'border border-slate-300 text-slate-400 hover:border-slate-400'
                              }`}
                            >
                              {roadmapTasks.q1 ? (
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              ) : (
                                <Plus className="w-3.5 h-3.5 stroke-[2]" />
                              )}
                            </button>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">
                                  Q1
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  Months 1–3 · Oct – Dec
                                </span>
                              </div>
                              <h4
                                className={`text-xs sm:text-sm font-bold mt-1 ${
                                  roadmapTasks.q1 ? 'text-slate-900' : 'text-slate-800'
                                }`}
                              >
                                Add one vegetable to a meal you already eat
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                One change for four weeks before adding another. Repetition is the whole strategy.
                              </p>
                            </div>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-[#081934]/5 text-slate-700 flex items-center justify-center shrink-0">
                            <TriangleAlert className="w-3.5 h-3.5 stroke-[2]" />
                          </div>
                        </div>

                        {/* Q2: Months 4-6 · Jan – Mar */}
                        <div
                          onClick={() => toggleRoadmapTask('q2')}
                          className={`rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3 cursor-pointer transition border ${
                            roadmapTasks.q2
                              ? 'bg-[#47B549]/5 border-[#47B549]/40'
                              : 'bg-white border-slate-200/90 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label="Toggle Q2 task"
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${
                                roadmapTasks.q2
                                  ? 'bg-[#47B549] text-white shadow-2xs'
                                  : 'border border-slate-300 text-slate-400 hover:border-slate-400'
                              }`}
                            >
                              {roadmapTasks.q2 ? (
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              ) : (
                                <Plus className="w-3.5 h-3.5 stroke-[2]" />
                              )}
                            </button>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">
                                  Q2
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  Months 4–6 · Jan – Mar
                                </span>
                              </div>
                              <h4
                                className={`text-xs sm:text-sm font-bold mt-1 ${
                                  roadmapTasks.q2 ? 'text-slate-900' : 'text-slate-800'
                                }`}
                              >
                                Book the screening you are due for
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                Use the timetable in this passport. Book the first row that says due now.
                              </p>
                            </div>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-[#081934] flex items-center justify-center shrink-0">
                            <Stethoscope className="w-3.5 h-3.5 stroke-[2]" />
                          </div>
                        </div>

                        {/* Q3: Months 7-9 · Apr – Jun */}
                        <div
                          onClick={() => toggleRoadmapTask('q3')}
                          className={`rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3 cursor-pointer transition border ${
                            roadmapTasks.q3
                              ? 'bg-[#47B549]/5 border-[#47B549]/40'
                              : 'bg-white border-slate-200/90 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label="Toggle Q3 task"
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${
                                roadmapTasks.q3
                                  ? 'bg-[#47B549] text-white shadow-2xs'
                                  : 'border border-slate-300 text-slate-400 hover:border-slate-400'
                              }`}
                            >
                              {roadmapTasks.q3 ? (
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              ) : (
                                <Plus className="w-3.5 h-3.5 stroke-[2]" />
                              )}
                            </button>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">
                                  Q3
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  Months 7–9 · Apr – Jun
                                </span>
                              </div>
                              <h4
                                className={`text-xs sm:text-sm font-bold mt-1 ${
                                  roadmapTasks.q3 ? 'text-slate-900' : 'text-slate-800'
                                }`}
                              >
                                Get a baseline blood pressure reading
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                Use the Iwosan booth or a pharmacy. Measure twice, a minute apart, and save both numbers.
                              </p>
                            </div>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-[#00B1DA]/10 text-[#00B1DA] flex items-center justify-center shrink-0">
                            <Eye className="w-3.5 h-3.5 stroke-[2]" />
                          </div>
                        </div>

                        {/* Q4: Months 10-12 · Jul – Sep */}
                        <div
                          onClick={() => toggleRoadmapTask('q4')}
                          className={`rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3 cursor-pointer transition border ${
                            roadmapTasks.q4
                              ? 'bg-[#47B549]/5 border-[#47B549]/40'
                              : 'bg-white border-slate-200/90 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label="Toggle Q4 task"
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${
                                roadmapTasks.q4
                                  ? 'bg-[#47B549] text-white shadow-2xs'
                                  : 'border border-slate-300 text-slate-400 hover:border-slate-400'
                              }`}
                            >
                              {roadmapTasks.q4 ? (
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              ) : (
                                <Plus className="w-3.5 h-3.5 stroke-[2]" />
                              )}
                            </button>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">
                                  Q4
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  Months 10–12 · Jul – Sep
                                </span>
                              </div>
                              <h4
                                className={`text-xs sm:text-sm font-bold mt-1 ${
                                  roadmapTasks.q4 ? 'text-slate-900' : 'text-slate-800'
                                }`}
                              >
                                Book a glucose or HbA1c test
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                Pair it with your routine check so one visit covers both. Note the result in this passport.
                              </p>
                            </div>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-[#00B1DA]/10 text-[#00B1DA] flex items-center justify-center shrink-0">
                            <Eye className="w-3.5 h-3.5 stroke-[2]" />
                          </div>
                        </div>
                      </div>

                      {/* Leadership Note Callout */}
                      <div className="rounded-2xl border border-dashed border-slate-200/90 bg-slate-50/60 p-3 sm:p-3.5 mt-3.5 space-y-1">
                        <div className="text-[11px] font-bold text-slate-700 tracking-tight">
                          Leadership note
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Your team, family and business all run on your capacity. Protecting one hour a quarter for your own health is a leadership decision, not a luxury.
                        </p>
                      </div>
                    </div>

                    {/* Section Footer Footnote */}
                    <div className="pt-2.5 border-t border-dashed border-slate-200 mt-3">
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        A plan you can keep matters more than a plan that sounds impressive. If a quarter slips, resume the next one without starting over.
                      </p>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 8: MILESTONES & SIGNATURE (Matches image_6f8d39f8.png) */}
                {/* ---------------------------------------------------- */}
                {pageIndex === 8 && (
                  <div className={`flex-1 ${isPrint ? "p-3.5 sm:p-4" : "p-5 sm:p-6"} bg-white text-slate-900 flex flex-col justify-between relative select-none`}>
                    <div>
                      {/* Top Meta Line: "Milestones & signature" + "Page 07" */}
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Milestones & signature</span>
                        <span className="font-mono">Page 07</span>
                      </div>

                      {/* Main Title: "Checkpoints & pledge" */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
                        Checkpoints <span className="font-serif italic font-normal text-slate-800">& pledge</span>
                      </h3>

                      {/* Description Subtitle */}
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                        Four dates to come back to. Little and often is the whole method.
                      </p>

                      {/* 4 Checkpoint Milestones List */}
                      <div className="mt-4 space-y-3">
                        {/* Checkpoint 1 */}
                        <div className="flex items-start gap-3 relative">
                          <div className="w-8 h-8 rounded-full border border-[#00B1DA]/60 bg-[#00B1DA]/5 flex items-center justify-center text-xs font-bold text-slate-800 shrink-0 shadow-2xs">
                            1
                          </div>
                          <div className="flex-1 pb-1">
                            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                              <span>Dec 2026</span>
                              <span>•</span>
                              <span>Checkpoint</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                              Add one vegetable to a meal you already eat
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              Checkpoint for Q1. Note what changed, then adjust the next quarter.
                            </p>
                          </div>
                        </div>

                        {/* Connector line 1-2 */}
                        <div className="w-px h-3 bg-slate-200 ml-4 -mt-2 -mb-2" />

                        {/* Checkpoint 2 */}
                        <div className="flex items-start gap-3 relative">
                          <div className="w-8 h-8 rounded-full border border-[#00B1DA]/60 bg-[#00B1DA]/5 flex items-center justify-center text-xs font-bold text-slate-800 shrink-0 shadow-2xs">
                            2
                          </div>
                          <div className="flex-1 pb-1">
                            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                              <span>Mar 2027</span>
                              <span>•</span>
                              <span>Checkpoint</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                              Book the screening you are due for
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              Checkpoint for Q2. Note what changed, then adjust the next quarter.
                            </p>
                          </div>
                        </div>

                        {/* Connector line 2-3 */}
                        <div className="w-px h-3 bg-slate-200 ml-4 -mt-2 -mb-2" />

                        {/* Checkpoint 3 */}
                        <div className="flex items-start gap-3 relative">
                          <div className="w-8 h-8 rounded-full border border-[#00B1DA]/60 bg-[#00B1DA]/5 flex items-center justify-center text-xs font-bold text-slate-800 shrink-0 shadow-2xs">
                            3
                          </div>
                          <div className="flex-1 pb-1">
                            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                              <span>Jun 2027</span>
                              <span>•</span>
                              <span>Checkpoint</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                              Get a baseline blood pressure reading
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              Checkpoint for Q3. Note what changed, then adjust the next quarter.
                            </p>
                          </div>
                        </div>

                        {/* Connector line 3-4 */}
                        <div className="w-px h-3 bg-slate-200 ml-4 -mt-2 -mb-2" />

                        {/* Checkpoint 4 */}
                        <div className="flex items-start gap-3 relative">
                          <div className="w-8 h-8 rounded-full border border-[#00B1DA]/60 bg-[#00B1DA]/5 flex items-center justify-center text-xs font-bold text-slate-800 shrink-0 shadow-2xs">
                            4
                          </div>
                          <div className="flex-1 pb-1">
                            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                              <span>Sept 2027</span>
                              <span>•</span>
                              <span>Checkpoint</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                              Book a glucose or HbA1c test
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              Review this passport and re-take the awareness check before the next conference.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Fit@25 Pledge Card */}
                      <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-3.5 sm:p-4 shadow-2xs mt-3.5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                              Fit@25 pledge
                            </div>
                            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                              I will treat my health as part of my leadership, not a break from it. Three months at a time.
                            </p>
                            <div className="pt-2 border-t border-dashed border-slate-200 mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                              <span className="font-serif italic text-slate-600 font-medium">Signature</span>
                              <span>Issued 19 Oct 2026</span>
                            </div>
                          </div>
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#47B549] flex flex-col items-center justify-center bg-[#47B549]/5 shrink-0">
                            <Leaf className="w-4 h-4 text-[#47B549]" />
                            <span className="text-[9.5px] font-bold text-[#47B549] mt-0.5 leading-none">
                              Fit@25
                            </span>
                            <span className="text-[7.5px] text-[#47B549] font-medium leading-none mt-0.5">
                              {completedRoadmapCount}/4 started
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3 Action Buttons: Re-check, Refresh, Share */}
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {/* Re-check */}
                        <button
                          type="button"
                          onClick={() => onNavigate('questions')}
                          className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 text-center shadow-2xs transition cursor-pointer"
                        >
                          <Repeat className="w-4 h-4 text-slate-700 mx-auto stroke-[2]" />
                          <div className="text-xs font-bold text-slate-900 mt-1 leading-tight">Re-check</div>
                          <div className="text-[9.5px] text-slate-400 mt-0.5 leading-none">Every 3 months</div>
                        </button>

                        {/* Refresh */}
                        <button
                          type="button"
                          onClick={() => jumpToPage(7)}
                          className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 text-center shadow-2xs transition cursor-pointer"
                        >
                          <RotateCw className="w-4 h-4 text-slate-700 mx-auto stroke-[2]" />
                          <div className="text-xs font-bold text-slate-900 mt-1 leading-tight">Refresh</div>
                          <div className="text-[9.5px] text-slate-400 mt-0.5 leading-none">After each quarter</div>
                        </button>

                        {/* Share */}
                        <button
                          type="button"
                          onClick={onOpenQR || (() => window.print())}
                          className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 text-center shadow-2xs transition cursor-pointer"
                        >
                          <Share2 className="w-4 h-4 text-slate-700 mx-auto stroke-[2]" />
                          <div className="text-xs font-bold text-slate-900 mt-1 leading-tight">Share</div>
                          <div className="text-[9.5px] text-slate-400 mt-0.5 leading-none">Only if you choose</div>
                        </button>
                      </div>
                    </div>

                    {/* Section Footer Footnote */}
                    <div className="pt-2.5 border-t border-dashed border-slate-200 mt-3">
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        This page is a personal record, not a medical certificate. Keep it with the rest of this passport.
                      </p>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* PAGE 9: IWOSAN CLINICAL BOOTH (Matches image_5f1a0e51.png) */}
                {/* ---------------------------------------------------- */}
                {pageIndex === 9 && (
                  <div className="flex-1 p-5 sm:p-6 bg-[#081934] text-white flex flex-col justify-between relative select-none">
                    <div>
                      {/* Top Meta Line & 25th Badge */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[11px] font-bold tracking-widest uppercase text-slate-400">
                            Iwosan Clinical
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            Booth IW25-0810
                          </div>
                        </div>

                        {/* 25 Years Circular Anniversary Badge */}
                        <div className="w-14 h-14 rounded-full border border-dashed border-[#00B1DA]/60 flex flex-col items-center justify-center text-white shrink-0 bg-white/5">
                          <span className="text-xl font-serif font-black text-white leading-none">25</span>
                          <span className="text-[7.5px] uppercase tracking-widest text-[#00B1DA] font-semibold mt-0.5 leading-none">
                            Years
                          </span>
                        </div>
                      </div>

                      {/* Main Title: "Iwosan clinical booth" */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-4">
                        Iwosan clinical <span className="font-serif italic font-normal text-slate-300">booth</span>
                      </h3>

                      {/* Conference Schedule Card */}
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 mt-4 shadow-sm">
                        <div className="text-[10px] text-slate-400 font-medium tracking-wide">
                          WIMBIZ 25th Annual Conference
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-white mt-1">
                          5 – 6 November
                        </div>
                        <div className="border-t border-dashed border-white/15 my-3" />
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-[10px] text-slate-400">Walk-in hours</div>
                            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                              08:00 – 17:00
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400">Access</div>
                            <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                              Walk in, no booking
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3 Clinic Details Cards */}
                      <div className="space-y-2 mt-3">
                        {/* 1. Location */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:p-3 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                            <MapPin className="w-4 h-4 text-[#00B1DA]" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-white">
                              Iwosan Hospitals
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Conference floor, clinical booth
                            </div>
                          </div>
                        </div>

                        {/* 2. Helpline */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:p-3 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                            <Phone className="w-4 h-4 text-[#00B1DA]" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-white">
                              Helpline
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Ask at the booth for the direct line
                            </div>
                          </div>
                        </div>

                        {/* 3. Bring this passport */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:p-3 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                            <Smartphone className="w-4 h-4 text-[#00B1DA]" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-white">
                              Bring this passport
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Printed or on your phone
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Disclaimer Callout */}
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 flex items-start gap-2.5 mt-3 text-slate-400">
                        <Info className="w-4 h-4 text-[#00B1DA] shrink-0 mt-0.5" />
                        <p className="text-[10px] sm:text-[10.5px] leading-relaxed">
                          Educational information, not a diagnosis. Nothing in this passport labels you as high or low risk. Sensitive personal-safety entries are excluded from any exported copy.
                        </p>
                      </div>

                      {/* Interactive PDF & navigation actions (hidden in exported print document) */}
                      {!isPrint && (
                        <div className="print:hidden">
                          <button
                            type="button"
                            onClick={handleDownloadFullPdf}
                            className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-md transition cursor-pointer mt-3.5"
                          >
                            <FileText className="w-4 h-4 stroke-[2.2]" />
                            <span>Save this passport as PDF</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Passport Machine Code Line */}
                    <div className="text-center font-mono text-[9px] text-slate-500 tracking-widest mt-3">
                      IW08102026&lt;&lt;&lt;2534&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                    </div>
                  </div>
                )}

      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 flex flex-col justify-between px-3 sm:px-4 py-3 sm:py-5 max-w-lg mx-auto print:bg-white print:p-0 print:m-0 print:max-w-none print:min-h-0 print:h-auto print:w-[210mm]">
      {/* 1. Top Header Bar (Matching Attached Design image_cefdcbc8.png) */}
      <header className="pb-2 print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('summary')}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-800 transition active:scale-95 cursor-pointer"
              title="Return to Summary"
              aria-label="Return to Summary"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.3]" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                E-Health passport
              </h1>
              <p className="text-xs text-slate-500 font-medium leading-none mt-0.5">
                Iwosan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              title="Print or Save Document"
              aria-label="Print Document"
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-700 transition active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>

            {onOpenQR && (
              <button
                type="button"
                onClick={onOpenQR}
                title="Share QR Code"
                aria-label="Share QR Code"
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-700 transition active:scale-95 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#00B1DA]" />
              </button>
            )}
          </div>
        </div>
        {/* Header Kicker Title: "Your e-health passport" + Download 9-Page PDF Button */}
        <div className="mt-3.5 px-0.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-slate-400 tracking-wider">
              Iwosan × WIMBIZ 25
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Your e-health <span className="font-serif italic font-normal text-slate-800">passport</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={handleDownloadFullPdf}
            title="Download Complete 9-Page PDF Flipbook"
            aria-label="Download Complete 9-Page PDF Flipbook"
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-[#00B1DA] transition active:scale-95 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Passport Flipbook Container (Matching Attached Design image_cefdcbc8.png) */}
      <main className="relative my-2 sm:my-3 flex-1 flex flex-col justify-center items-center print:hidden">
        <div className="w-full relative max-w-md mx-auto">
          {/* Subtle Page Peek Layers Beneath (Booklet Edge Effect) */}
          <div className="absolute inset-x-4 -bottom-2 h-6 bg-slate-200/70 rounded-[28px] pointer-events-none" />
          <div className="absolute inset-x-2 -bottom-1 h-6 bg-slate-100 rounded-[30px] pointer-events-none shadow-xs" />

          {/* Main Card Frame */}
          <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(8,25,52,0.35)] border border-slate-800/80 bg-[#081934]">
            {/* Animated Dynamic Page Content */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                initial={{
                  opacity: 0,
                  rotateY: direction > 0 ? 25 : -25,
                  x: direction > 0 ? 30 : -30,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotateY: direction > 0 ? -25 : 25,
                  x: direction > 0 ? -30 : 30,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full min-h-[510px] sm:min-h-[530px] flex flex-col justify-between"
              >
                {renderPageContent(currentPage, false)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* 3. High-Fidelity 9-Page Complete PDF Flipbook Booklet (Exported / Printed Sequentially) */}
      <div className="hidden print:block w-[210mm] print-flipbook-document">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pageNum) => (
          <div
            key={`print-booklet-page-${pageNum}`}
            className="print-page w-[210mm] h-[297mm] max-w-[210mm] max-h-[297mm] min-h-[297mm] flex flex-col justify-center items-center overflow-hidden box-border mx-auto"
          >
            <div
              className={`print-card w-full max-w-[175mm] h-full max-h-[268mm] rounded-[24px] overflow-hidden border shadow-none flex flex-col justify-between box-border mx-auto ${
                pageNum === 1 || pageNum === 9
                  ? 'border-slate-800 bg-[#081934]'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="w-full flex-1 flex flex-col justify-between overflow-hidden">
                {renderPageContent(pageNum, true)}
              </div>
              <div
                className={`py-2 px-6 border-t flex items-center justify-between text-[9px] font-mono tracking-wider shrink-0 ${
                  pageNum === 1 || pageNum === 9
                    ? 'bg-[#051124] text-slate-400 border-white/10'
                    : 'bg-slate-50 text-slate-400 border-slate-200/80'
                }`}
              >
                <span>IWOSAN HEALTHCARE × WIMBIZ 25</span>
                <span>PASSPORT NO. IW25-0810 · PAGE 0${pageNum} OF 09</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Bottom Flipbook Navigation Controls (Matching image_cefdcbc8.png) */}
      <footer className="pt-2 sm:pt-3 print:hidden">
        <div className="flex items-center justify-between max-w-md mx-auto px-1">
          {/* Circular Previous Button */}
          <button
            type="button"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className="w-11 h-11 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs disabled:opacity-30 disabled:pointer-events-none active:scale-95 text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Center Indicator: "Cover · 01/06" */}
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-medium text-slate-500 font-mono">
              <span className="font-sans font-semibold text-slate-700">{currentTitle}</span> · {pageNumberString}
            </span>
          </div>

          {/* Circular Next Button */}
          <button
            type="button"
            onClick={goToNextPage}
            disabled={currentPage === TOTAL_PAGES}
            aria-label="Next Page"
            className="w-11 h-11 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs disabled:opacity-30 disabled:pointer-events-none active:scale-95 text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Quick Jump Dot / Pill Scrubber */}
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {PAGE_META.map((meta) => {
            const isActive = meta.number === currentPage;
            return (
              <button
                key={meta.number}
                type="button"
                onClick={() => jumpToPage(meta.number)}
                title={`${meta.number}. ${meta.title}`}
                className={`transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'w-6 h-1.5 rounded-full bg-[#00B1DA]'
                    : 'w-1.5 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Jump to page ${meta.number}`}
              />
            );
          })}
        </div>
      </footer>
    </div>
  );
};
