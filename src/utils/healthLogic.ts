import { HealthNumbers, SummaryResults, SummaryInsight, CrisisSupportInfo } from '../types';

// Local storage keys for privacy-first client-only persistence
const STORAGE_KEY_ANSWERS = 'iwosan_herhealth_answers_v1';
const STORAGE_KEY_NUMBERS = 'iwosan_herhealth_numbers_v1';
const STORAGE_KEY_COMPLETED = 'iwosan_herhealth_completed_v1';

export function saveAnswersToLocal(answers: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
  } catch {
    // ignore
  }
}

export function loadAnswersFromLocal(): Record<string, string> {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ANSWERS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export const DEFAULT_EMPTY_NUMBERS: HealthNumbers = {
  sugarType: 'fasting',
  sugarUnit: 'mg/dL',
  unitSystem: 'metric',
  systolic: undefined,
  diastolic: undefined,
  bloodSugar: undefined,
  height: undefined,
  weight: undefined,
};

export function saveNumbersToLocal(numbers: HealthNumbers) {
  try {
    localStorage.setItem(STORAGE_KEY_NUMBERS, JSON.stringify(numbers));
  } catch {
    // ignore
  }
}

export function loadNumbersFromLocal(): HealthNumbers {
  try {
    const data = localStorage.getItem(STORAGE_KEY_NUMBERS);
    return data ? JSON.parse(data) : { ...DEFAULT_EMPTY_NUMBERS };
  } catch {
    return { ...DEFAULT_EMPTY_NUMBERS };
  }
}

export function clearAllHealthData() {
  try {
    localStorage.removeItem(STORAGE_KEY_ANSWERS);
    localStorage.removeItem(STORAGE_KEY_NUMBERS);
    localStorage.removeItem(STORAGE_KEY_COMPLETED);
  } catch {
    // ignore
  }
}

export interface BmiAnalysis {
  bmi: number;
  category: string;
  badgeBg: string;
  badgeText: string;
  progressColor: string;
  guidance: string;
}

export function calculateBMI(weight: number, height: number, unitSystem: 'metric' | 'imperial'): BmiAnalysis | null {
  if (!weight || !height || height <= 0 || weight <= 0) return null;

  let bmi = 0;
  if (unitSystem === 'metric') {
    // weight in kg, height in cm
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  } else {
    // weight in lbs, height in inches
    bmi = (weight * 703) / (height * height);
  }

  bmi = Math.round(bmi * 10) / 10;

  if (bmi < 18.5) {
    return {
      bmi,
      category: 'Underweight Range',
      badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
      badgeText: 'text-amber-700',
      progressColor: 'bg-amber-400',
      guidance: 'A lower body weight can sometimes affect bone mineral density and hormonal balance. Consider discussing nutrient-dense meal strategies with a dietitian.',
    };
  } else if (bmi >= 18.5 && bmi < 25.0) {
    return {
      bmi,
      category: 'Healthy Weight Band',
      badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      badgeText: 'text-emerald-700',
      progressColor: 'bg-emerald-500',
      guidance: 'Your BMI sits within the healthy reference band. Continuing balanced nutrition and regular strength/aerobic movement supports lifelong vitality.',
    };
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return {
      bmi,
      category: 'Elevated Weight Band',
      badgeBg: 'bg-teal-50 border-teal-200 text-teal-800',
      badgeText: 'text-teal-700',
      progressColor: 'bg-teal-500',
      guidance: 'BMI is a general screening guide rather than a measure of body composition or fitness. Gentle daily movement and fiber-rich meals provide powerful cardiovascular protection.',
    };
  } else {
    return {
      bmi,
      category: 'Higher Weight Band',
      badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      badgeText: 'text-indigo-700',
      progressColor: 'bg-indigo-500',
      guidance: 'Focusing on gradual, sustainable habits—such as 150 minutes of walking per week and whole food nutrition—greatly reduces metabolic risks independent of scale weight.',
    };
  }
}

export interface BpAnalysis {
  category: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  guidance: string;
  isNormal: boolean;
}

export function analyzeBloodPressure(systolic?: number, diastolic?: number): BpAnalysis | null {
  if (!systolic || !diastolic || systolic <= 0 || diastolic <= 0) return null;

  if (systolic < 120 && diastolic < 80) {
    return {
      category: 'Normal Blood Pressure',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-800',
      borderClass: 'border-emerald-200',
      guidance: 'Your blood pressure is in the optimal range (<120/80 mmHg). Continue maintaining healthy hydration, balanced salt intake, and regular activity.',
      isNormal: true,
    };
  } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    return {
      category: 'Elevated Blood Pressure',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-800',
      borderClass: 'border-amber-200',
      guidance: 'Systolic pressure is slightly elevated (120–129 mmHg). Lifestyle modifications like reducing sodium, managing stress, and regular walking can bring it back into optimal range.',
      isNormal: false,
    };
  } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
    return {
      category: 'Stage 1 Hypertension Range',
      badgeBg: 'bg-orange-50',
      badgeText: 'text-orange-800',
      borderClass: 'border-orange-200',
      guidance: 'Readings are in the Stage 1 range. A clinician can perform a confirmation check, evaluate underlying factors, and suggest supportive nutrition and movement steps.',
      isNormal: false,
    };
  } else {
    return {
      category: 'Stage 2 Hypertension Range',
      badgeBg: 'bg-rose-50',
      badgeText: 'text-rose-800',
      borderClass: 'border-rose-200',
      guidance: 'Readings are in the Stage 2 range (140/90+ mmHg). We encourage scheduling a formal evaluation with an Iwosan physician to ensure cardiovascular safety.',
      isNormal: false,
    };
  }
}

export interface SugarAnalysis {
  category: string;
  badgeBg: string;
  badgeText: string;
  guidance: string;
  normalizedMgDl: number;
}

export function analyzeBloodSugar(
  value?: number,
  type: 'fasting' | 'random' = 'fasting',
  unit: 'mg/dL' | 'mmol/L' = 'mg/dL'
): SugarAnalysis | null {
  if (!value || value <= 0) return null;

  // Normalize to mg/dL for clinical evaluation (1 mmol/L = 18.018 mg/dL)
  const mgDl = unit === 'mmol/L' ? value * 18.018 : value;

  if (type === 'fasting') {
    if (mgDl < 70) {
      return {
        category: 'Low Blood Sugar Range',
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        badgeText: 'text-amber-700',
        guidance: 'Fasting glucose is on the lower side. Ensure consistent, balanced meals and speak with a doctor if you feel shaky or dizzy.',
        normalizedMgDl: Math.round(mgDl),
      };
    } else if (mgDl <= 99) {
      return {
        category: 'Optimal Fasting Glucose (Normal)',
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        badgeText: 'text-emerald-700',
        guidance: 'Fasting blood sugar is in the healthy target range (70–99 mg/dL / 3.9–5.5 mmol/L). Excellent metabolic baseline.',
        normalizedMgDl: Math.round(mgDl),
      };
    } else if (mgDl <= 125) {
      return {
        category: 'Pre-Diabetes Glucose Range',
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        badgeText: 'text-amber-700',
        guidance: 'Readings fall in the pre-diabetes bracket (100–125 mg/dL). This is an actionable window where dietary tweaks and post-meal walks can reverse elevated glucose.',
        normalizedMgDl: Math.round(mgDl),
      };
    } else {
      return {
        category: 'Elevated Fasting Glucose Range',
        badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
        badgeText: 'text-rose-700',
        guidance: 'Fasting glucose is 126+ mg/dL. A formal HbA1c test and clinician consultation are strongly recommended to guide tailored management.',
        normalizedMgDl: Math.round(mgDl),
      };
    }
  } else {
    // Random / Post-prandial
    if (mgDl < 140) {
      return {
        category: 'Normal Random Blood Sugar',
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        badgeText: 'text-emerald-700',
        guidance: 'Random blood sugar is normal (<140 mg/dL / 7.8 mmol/L). Your body effectively clears glucose from meals.',
        normalizedMgDl: Math.round(mgDl),
      };
    } else if (mgDl <= 199) {
      return {
        category: 'Elevated Random Blood Sugar',
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        badgeText: 'text-amber-700',
        guidance: 'Random glucose is slightly elevated (140–199 mg/dL). Consider confirming with a fasting blood test and discussing with your doctor.',
        normalizedMgDl: Math.round(mgDl),
      };
    } else {
      return {
        category: 'High Random Blood Sugar',
        badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
        badgeText: 'text-rose-700',
        guidance: 'Random blood sugar is 200+ mg/dL. Recommended to consult a clinician for a comprehensive metabolic review.',
        normalizedMgDl: Math.round(mgDl),
      };
    }
  }
}

export function generateSummary(answers: Record<string, string>, numbers?: HealthNumbers): SummaryResults {
  const keepDoing: SummaryInsight[] = [];
  const worthChecking: SummaryInsight[] = [];
  const discussWithDoctor: SummaryInsight[] = [];

  // 1. Age Band context
  const age = answers['q1_age'];
  let ageLabel = 'Your life stage';
  if (age === 'under_20') ageLabel = 'Under 20';
  else if (age === '20_29') ageLabel = '20s';
  else if (age === '30_39') ageLabel = '30s';
  else if (age === '40_49') ageLabel = '40s';
  else if (age === '50_59') ageLabel = '50s';
  else if (age === '60_plus') ageLabel = '60+';

  // 1b. Occupation Profile context
  const occupation = answers['q0_occupation'];
  let occupationLabel = 'Your occupation profile';
  if (occupation === 'full_time') {
    occupationLabel = 'Full-Time Employee';
    keepDoing.push({
      id: 'occ_full_time',
      title: 'Workplace Health & Ergonomics',
      description: 'As a full-time professional, taking regular posture micro-breaks, scheduling active screen timeouts, and protecting daily restorative sleep creates lasting metabolic stamina.',
      articleId: 'healthy-daily-rhythms',
      actionText: 'Read Daily Rhythms Guide',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'part_time') {
    occupationLabel = 'Part-Time Employee';
    keepDoing.push({
      id: 'occ_part_time',
      title: 'Balanced Schedule & Preventive Care',
      description: 'Your part-time structure provides opportunities to schedule dedicated physical movement and preventive health screenings during weekday hours.',
      articleId: 'preventive-care-matrix',
      actionText: 'View Screening Matrix',
      actionScreen: 'screening-guide',
    });
  } else if (occupation === 'self_employed') {
    occupationLabel = 'Self-Employed Woman';
    worthChecking.push({
      id: 'occ_self_employed',
      title: 'Entrepreneurial Wellness & Boundary Setting',
      description: 'Building and leading your own business is intensely rewarding, but founder burnout is real. Protect dedicated rest days, ergonomic seating, and annual health checkup appointments.',
      articleId: 'nourishing-stress-recovery',
      actionText: 'Read Stress Recovery Guide',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'freelancer') {
    occupationLabel = 'Freelancer';
    worthChecking.push({
      id: 'occ_freelancer',
      title: 'Independent Professional Ergonomics & Rest',
      description: 'Independent client work requires intentional physical boundaries: set dedicated work hours, stretch to prevent wrist and neck strain, and maintain consistent meal times.',
      articleId: 'healthy-daily-rhythms',
      actionText: 'Read Daily Rhythms',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'contract_worker') {
    occupationLabel = 'Contract Worker';
    worthChecking.push({
      id: 'occ_contract_worker',
      title: 'Project Transitions & Steady Vitality',
      description: 'Contract timelines can bring sprint cycles and transition periods. Keeping a steady hydration, movement, and sleep routine maintains your resilience between deliverables.',
      articleId: 'nourishing-stress-recovery',
      actionText: 'Read Stress Management',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'casual_worker') {
    occupationLabel = 'Casual Worker';
    worthChecking.push({
      id: 'occ_casual_worker',
      title: 'Adaptive Rhythms & Regular Checkups',
      description: 'With varying shift hours, anchor your days with fixed sleep cues and balanced meals, and ensure you keep up with annual wellness checkups.',
      articleId: 'healthy-daily-rhythms',
      actionText: 'Read Daily Rhythms',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'unemployed_professional') {
    occupationLabel = 'Unemployed Professional';
    worthChecking.push({
      id: 'occ_unemployed_professional',
      title: 'Nervous System Care & Self-Compassion',
      description: 'Professional transitions can be emotionally demanding. Prioritizing daily gentle walking, nervous system grounding, and supportive social connection preserves your health and optimism.',
      articleId: 'nourishing-stress-recovery',
      actionText: 'Nervous System Recovery',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'job_seeker') {
    occupationLabel = 'Job Seeker';
    worthChecking.push({
      id: 'occ_job_seeker',
      title: 'Job Search Resilience & Wellness Routine',
      description: 'Actively searching for roles takes significant mental energy. Set a daily cutoff time for job applications, take outdoor breathwork walks, and safeguard restful sleep.',
      articleId: 'nourishing-stress-recovery',
      actionText: 'Explore Recovery Tips',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'retired_professional') {
    occupationLabel = 'Retired Professional';
    keepDoing.push({
      id: 'occ_retired_professional',
      title: 'Longevity & Active Mobility Milestones',
      description: 'Retirement is a prime decade for proactive vitality: prioritize bone density scans, cardiovascular fitness, muscle-preserving resistance movement, and social enrichment.',
      articleId: 'bone-joint-longevity',
      actionText: 'Read Longevity Guide',
      actionScreen: 'womens-health',
    });
  } else if (occupation === 'student') {
    occupationLabel = 'Student';
    worthChecking.push({
      id: 'occ_student',
      title: 'Study Ergonomics, Screen Breaks & Nutrition',
      description: 'Long study hours can strain vision, posture, and sleep. Use the 20-20-20 screen rule, drink plenty of water, and nourish your brain with protein-rich meals.',
      articleId: 'healthy-daily-rhythms',
      actionText: 'Daily Health Rhythms',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'stay_at_home') {
    occupationLabel = 'Stay-at-Home Woman';
    keepDoing.push({
      id: 'occ_stay_at_home',
      title: 'Household Energy & Dedicated Self-Care Time',
      description: 'Managing a home is physically and emotionally demanding around the clock. Carve out dedicated time for your own preventive screening appointments and personal rejuvenation.',
      articleId: 'healthy-daily-rhythms',
      actionText: 'Explore Daily Rhythms',
      actionScreen: 'lifestyle',
    });
  }

  // 2. Routine check
  const checkup = answers['q2_checkup'];
  if (checkup === 'within_year') {
    keepDoing.push({
      id: 'routine_good',
      title: 'Routine Health Check Commitment',
      description: 'You had a wellness check within the last 12 months. Proactive baseline checks keep you ahead of asymptomatic changes.',
      articleId: 'preventive-care-matrix',
      actionText: 'View Preventive Matrix',
      actionScreen: 'screening-guide',
    });
  } else if (checkup === '1_to_2_years' || checkup === 'not_sure') {
    worthChecking.push({
      id: 'routine_overdue',
      title: 'Schedule Your Next Routine Wellness Check',
      description: 'It has been 1–2 years since your last routine physical. Scheduling an annual review helps monitor your vitals and general vitality.',
      articleId: 'preventive-care-matrix',
      actionText: 'See What Checks Are Due',
      actionScreen: 'screening-guide',
    });
  } else if (checkup === 'more_than_2_years' || checkup === 'never') {
    discussWithDoctor.push({
      id: 'routine_needed',
      title: 'Connect with a Clinician for a Baseline Wellness Check',
      description: 'Having a comprehensive baseline exam (blood pressure, lipid panel, kidney function, and women’s screenings) is a high-impact self-care milestone.',
      articleId: 'preventive-care-matrix',
      actionText: 'Book with Iwosan',
      actionScreen: 'contact',
    });
  }

  // 3. Blood pressure
  const bp = answers['q3_bp'];
  if (bp === 'within_year') {
    keepDoing.push({
      id: 'bp_tracked',
      title: 'Regular Blood Pressure Awareness',
      description: 'You have tracked your blood pressure within the past year. Knowing your baseline is essential for cardiovascular protection.',
      articleId: 'heart-health-women',
      actionText: 'Read Heart Insights',
      actionScreen: 'lifestyle',
    });
  } else {
    worthChecking.push({
      id: 'bp_check_due',
      title: 'Get a Quick 2-Minute Blood Pressure Reading',
      description: 'Blood pressure can change without noticeable warning signs. You can get a quick cuff check at any pharmacy, clinic, or our conference booth.',
      articleId: 'heart-health-women',
      actionText: 'Enter Numbers Here',
      actionScreen: 'numbers',
    });
  }

  // 4. Blood Sugar
  const sugar = answers['q4_sugar'];
  if (sugar === 'within_year') {
    keepDoing.push({
      id: 'sugar_good',
      title: 'Up-to-Date Blood Sugar Awareness',
      description: 'You have monitored your glucose within the past 6–12 months. Early awareness ensures metabolic resilience.',
      articleId: 'diabetes-prevention',
      actionText: 'Read Glucose Guide',
      actionScreen: 'lifestyle',
    });
  } else {
    worthChecking.push({
      id: 'sugar_check_due',
      title: 'Include Fasting Glucose in Your Next Lab Screen',
      description: 'Fasting glucose or HbA1c is a quick blood test that detects pre-diabetes early, when lifestyle adjustments are 100% effective.',
      articleId: 'diabetes-prevention',
      actionText: 'Explore Diabetes Guide',
      actionScreen: 'lifestyle',
    });
  }

  // 5. Family History
  const history = answers['q5_history'];
  if (history === 'yes_immediate') {
    discussWithDoctor.push({
      id: 'history_immediate',
      title: 'Personalized Risk Review for Family Cardiovascular/Diabetes History',
      description: 'Having parents or siblings with diabetes, hypertension, or heart disease is common. Sharing this with your clinician enables tailored early screening and nutrition strategies.',
      articleId: 'heart-health-women',
      actionText: 'Discuss with Iwosan Doctor',
      actionScreen: 'contact',
    });
  } else if (history === 'yes_extended') {
    worthChecking.push({
      id: 'history_extended',
      title: 'Keep Family Health History in Mind',
      description: 'Extended family history offers helpful context for adopting heart-protective nutrition and staying consistent with annual checkups.',
      articleId: 'heart-health-women',
    });
  } else if (history === 'no_history') {
    keepDoing.push({
      id: 'history_clear',
      title: 'Positive Hereditary Background',
      description: 'No known family history of early heart disease or diabetes. Maintaining your current lifestyle choices reinforces this natural foundation.',
      articleId: 'healthy-micro-habits',
    });
  }

  // 6. Physical Activity
  const activity = answers['q6_activity'];
  if (activity === 'active_150' || activity === 'moderate') {
    keepDoing.push({
      id: 'activity_strong',
      title: 'Active Weekly Movement Routine',
      description: 'Your weekly movement fuels cardiovascular stamina, strengthens bone mineral density, and keeps stress hormones balanced.',
      articleId: 'movement-exercise',
      actionText: 'Strength Tips for Women',
      actionScreen: 'lifestyle',
    });
  } else {
    worthChecking.push({
      id: 'activity_boost',
      title: 'Add Joyful Daily Micro-Walks & Light Movement',
      description: 'Adding 10 to 15 minutes of brisk walking after lunch or dinner improves glucose uptake and boosts daytime energy levels.',
      articleId: 'movement-exercise',
      actionText: 'Movement for Longevity',
      actionScreen: 'lifestyle',
    });
  }

  // 7. Nutrition
  const nutrition = answers['q7_nutrition'];
  if (nutrition === 'daily_most') {
    keepDoing.push({
      id: 'nutrition_rich',
      title: 'Fiber & Micronutrient-Rich Eating',
      description: 'Including fresh vegetables, greens, and fruit in daily meals delivers potassium and antioxidants that directly nurture vascular health.',
      articleId: 'nutrition-habits',
    });
  } else if (nutrition === 'few_times' || nutrition === 'rarely') {
    worthChecking.push({
      id: 'nutrition_add',
      title: 'Add One Extra Portion of Greens or Fresh Fruit Daily',
      description: 'Targeting a colorful plate model with local dark leafy vegetables (ugwu, spinach, waterleaf) supports digestion and hormone regulation.',
      articleId: 'nutrition-habits',
      actionText: 'Read Nutrition Guide',
      actionScreen: 'lifestyle',
    });
  }

  // 8. Sleep
  const sleep = answers['q8_sleep'];
  if (sleep === 'restful') {
    keepDoing.push({
      id: 'sleep_restful',
      title: 'Restorative Sleep & Recovery',
      description: 'Getting 7–9 hours of restful sleep each night optimizes cellular repair, insulin sensitivity, and immune defense.',
      articleId: 'sleep-stress',
    });
  } else if (sleep === 'interrupted' || sleep === 'short') {
    worthChecking.push({
      id: 'sleep_hygiene',
      title: 'Experiment with a 30-Minute Screen-Free Wind Down',
      description: 'Dimming blue lights before bed and keeping your bedroom cool allows natural melatonin to signal deep, restorative sleep phases.',
      articleId: 'sleep-stress',
      actionText: 'Sleep & Stress Guide',
      actionScreen: 'lifestyle',
    });
  } else if (sleep === 'irregular') {
    discussWithDoctor.push({
      id: 'sleep_clinical',
      title: 'Discuss Persistent Sleep Disruptions or Insomnia',
      description: 'Chronic insomnia or broken sleep can be linked to hormonal fluctuations, thyroid balance, or stress. A clinician can provide safe, holistic support.',
      articleId: 'sleep-stress',
      actionText: 'Book a Wellness Visit',
      actionScreen: 'contact',
    });
  }

  // 9. Women's Screening
  const screening = answers['q9_screening'];
  if (screening === 'up_to_date') {
    keepDoing.push({
      id: 'screening_champion',
      title: 'Up-to-Date Cervical & Breast Screenings',
      description: 'Staying current with recommended women’s health screenings is one of the highest acts of personal care and prevention.',
      articleId: 'cervical-cancer-hpv',
      actionText: 'Review Screening Matrix',
      actionScreen: 'screening-guide',
    });
  } else if (screening === 'past_overdue' || screening === 'not_sure') {
    worthChecking.push({
      id: 'screening_overdue',
      title: `Check Recommended Screenings for Your Age (${ageLabel})`,
      description: 'Discover exactly when your next Cervical Pap/HPV test, Mammogram, or Pelvic check is due based on clinical guidelines.',
      articleId: 'preventive-care-matrix',
      actionText: 'Explore Screening Guide',
      actionScreen: 'screening-guide',
    });
  } else if (screening === 'not_discussed') {
    discussWithDoctor.push({
      id: 'screening_initiate',
      title: 'Initiate a Women’s Screening Conversation with a Doctor',
      description: 'Gentle screenings like Pap smears, clinical breast exams, and ultrasound take only minutes and provide lifelong peace of mind.',
      articleId: 'cervical-cancer-hpv',
      actionText: 'Schedule with Iwosan',
      actionScreen: 'contact',
    });
  }

  // 10. Midlife & Perimenopause (specifically tailored for 40–49 age band)
  const is40to49 = answers['q1_age'] === '40_49';
  if (is40to49) {
    // Cycles & LMP
    const irregular = answers['q40_periods_irregular'];
    const lmp = answers['q40_last_period'];
    if (irregular === 'yes_irregular') {
      worthChecking.push({
        id: 'perimeno_irregular',
        title: 'Perimenopausal Cycle Tracking',
        description: 'Cycle length shifts are often the earliest indicator of natural estrogen fluctuations in your 40s. Keeping a simple period diary helps your doctor evaluate patterns.',
        articleId: 'menopause-midlife',
        actionText: 'Midlife Guide',
        actionScreen: 'womens-health',
      });
    } else if (irregular === 'no_regular') {
      keepDoing.push({
        id: 'perimeno_regular',
        title: 'Predictable Cycle Health',
        description: 'Maintaining consistent cycles in your 40s reflects steady ovarian hormonal function.',
        articleId: 'menopause-midlife',
      });
    } else if (irregular === 'stopped') {
      discussWithDoctor.push({
        id: 'perimeno_stopped',
        title: 'Cycle Cessation & Menopause Milestone',
        description: 'If periods have completely stopped, a clinician can confirm your transition phase and check bone density (DEXA) and lipid profiles.',
        articleId: 'menopause-midlife',
        actionText: 'Consult Iwosan Doctor',
        actionScreen: 'contact',
      });
    }

    if (lmp) {
      const isDate = lmp.startsWith('date:') || /^\d{4}-\d{2}-\d{2}$/.test(lmp);
      const formattedDate = isDate
        ? new Date(lmp.replace('date:', '') + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : null;

      if (lmp === 'over_12_months') {
        discussWithDoctor.push({
          id: 'lmp_postmenopausal',
          title: 'Post-Menopause Verification (12+ Months)',
          description: 'Having no period for 12 full months is the clinical milestone of menopause. Prioritizing bone density, cardiovascular lipid profiles, and pelvic strength is recommended.',
          articleId: 'menopause-midlife',
          actionText: 'Schedule Review',
          actionScreen: 'contact',
        });
      } else if (formattedDate) {
        keepDoing.push({
          id: 'lmp_recorded',
          title: `Recorded LMP: ${formattedDate}`,
          description: 'Documenting your Last Menstrual Period date is helpful for accurate gynaecological and hormonal timeline assessment.',
          articleId: 'menopause-midlife',
        });
      }
    }

    // Vasomotor (Hot flushes & night sweats)
    const hotFlushes = answers['q40_hot_flushes'];
    const nightSweats = answers['q40_night_sweats'];
    if (hotFlushes === 'yes_frequent' || nightSweats === 'yes_frequent') {
      discussWithDoctor.push({
        id: 'vasomotor_support',
        title: 'Vasomotor Symptom Relief (Hot Flushes & Night Sweats)',
        description: 'Frequent hot flushes and night sweats are highly treatable. Modern evidence-based options (including HRT and non-hormonal prescription therapies) can quickly restore comfort and sleep.',
        articleId: 'menopause-midlife',
        actionText: 'Discuss Treatment with Iwosan',
        actionScreen: 'contact',
      });
    } else if (hotFlushes === 'mild_occasional' || nightSweats === 'mild_occasional') {
      worthChecking.push({
        id: 'vasomotor_mild',
        title: 'Managing Mild Temperature Changes',
        description: 'Layering breathable natural fabrics, maintaining a cool bedroom, and limiting caffeine or spicy foods helps buffer mild hot flashes.',
        articleId: 'menopause-midlife',
      });
    } else if (hotFlushes === 'no_none' && nightSweats === 'no_none') {
      keepDoing.push({
        id: 'vasomotor_clear',
        title: 'Free of Vasomotor Symptoms',
        description: 'You are currently not experiencing hot flushes or night sweats, supporting steady daily focus and energy.',
        articleId: 'menopause-midlife',
      });
    }

    // Genitourinary & Pelvic Health
    const dryness = answers['q40_vaginal_dryness'];
    const leakage = answers['q40_urinary_leakage'];
    if (dryness === 'yes_discomfort' || leakage === 'yes_leakage_uti') {
      discussWithDoctor.push({
        id: 'gsm_care',
        title: 'Intimate Comfort & Pelvic Floor Support',
        description: 'Genitourinary tissue changes and urinary urgency respond exceptionally well to localized estrogen moisturization and gentle pelvic physiotherapy.',
        articleId: 'menopause-midlife',
        actionText: 'Book Women’s Health Visit',
        actionScreen: 'contact',
      });
    } else if (dryness === 'no_discomfort' && leakage === 'no_symptoms') {
      keepDoing.push({
        id: 'pelvic_healthy',
        title: 'Healthy Pelvic & Tissue Tone',
        description: 'No genitourinary discomfort or bladder issues noted. Continuing regular pelvic floor exercises helps preserve this strength.',
        articleId: 'menopause-midlife',
      });
    }

    // Mood & Sleep & Cognitive
    const mood = answers['q40_anxiety_irritability'];
    const brainFog = answers['q40_memory_concentration'];
    if (mood === 'yes_noticeable') {
      discussWithDoctor.push({
        id: 'perimeno_mood',
        title: 'Emotional Resilience & Hormonal Mood Support',
        description: 'Sudden irritability or heightened anxiety during your 40s is often a neuro-chemical response to estrogen dips. A clinician can provide safe, supportive balance.',
        articleId: 'menopause-midlife',
        actionText: 'Ask Iwosan Clinician',
        actionScreen: 'contact',
      });
    }

    if (brainFog === 'yes_brain_fog') {
      worthChecking.push({
        id: 'brain_fog_support',
        title: 'Navigating Midlife Brain Fog',
        description: 'Word-finding pauses and multitasking fatigue during perimenopause are temporary. Prioritizing magnesium, Omega-3s, and steady sleep brings noticeable clarity.',
        articleId: 'menopause-midlife',
        actionText: 'Read Midlife Guide',
        actionScreen: 'womens-health',
      });
    }

    // HRT Discussion
    const hrt = answers['q40_hrt_discussion'];
    if (hrt === 'yes_active' || hrt === 'discussed_waiting') {
      keepDoing.push({
        id: 'hrt_empowered',
        title: 'Active Menopause & Hormonal Health Awareness',
        description: 'Having informed discussions about menopause therapies with your doctor protects long-term cardiovascular and bone health.',
        articleId: 'menopause-midlife',
      });
    } else if (hrt === 'want_to_learn' || hrt === 'never_discussed') {
      worthChecking.push({
        id: 'hrt_explore',
        title: 'Explore Modern Menopause Therapies (HRT)',
        description: 'Women in their 40s benefit most from early discussions on Hormone Replacement Therapy (HRT) to understand personal benefits and symptom management.',
        articleId: 'menopause-midlife',
        actionText: 'Ask Iwosan About HRT',
        actionScreen: 'contact',
      });
    }
  }

  // 11. Menstrual Health (20–49)
  const heavyBleeding = answers['q2049_bleed_heaviness'];
  const severePain = answers['q2049_period_pain'];
  const largeClots = answers['q2049_large_clots'];
  const bleedAfterSex = answers['q2049_bleed_after_sex'];
  const bleedBetween = answers['q2049_bleed_between'];

  if (heavyBleeding === 'heavy' || largeClots === 'frequent_large') {
    discussWithDoctor.push({
      id: 'menorrhagia_evaluation',
      title: 'Heavy Menstrual Flow & Anemia Screening',
      description: 'Soaking through pads rapidly or passing large clots can lead to chronic iron deficiency. A pelvic ultrasound and ferritin check identify treatable causes like uterine fibroids.',
      articleId: 'menstrual-health',
      actionText: 'Consult Gynaecologist',
      actionScreen: 'contact',
    });
  }

  if (severePain === 'severe') {
    discussWithDoctor.push({
      id: 'dysmenorrhea_support',
      title: 'Debilitating Period Pain (Dysmenorrhea)',
      description: 'Severe cramps that interfere with work or school warrant investigation for endometriosis or adenomyosis; gentle, modern pain relief options are readily available.',
      articleId: 'menstrual-health',
      actionText: 'Book Women’s Consultation',
      actionScreen: 'contact',
    });
  }

  if (bleedAfterSex === 'frequent') {
    discussWithDoctor.push({
      id: 'post_coital_check',
      title: 'Post-Coital Bleeding Evaluation',
      description: 'Repeated bleeding after intimacy should always be checked with a gentle speculum exam and cervical Pap/HPV screening.',
      articleId: 'cervical-cancer-hpv',
      actionText: 'Schedule Cervical Check',
      actionScreen: 'contact',
    });
  } else if (bleedBetween === 'frequent') {
    worthChecking.push({
      id: 'intermenstrual_check',
      title: 'Intermenstrual Bleeding Review',
      description: 'Spotting between periods can be linked to cervical inflammation, polyps, or hormonal shifts; an in-person assessment provides complete clarity.',
      articleId: 'menstrual-health',
    });
  }

  // 12. Fertility, Pregnancy & Reproductive Health (20–50)
  const fibroidsPcos = answers['q2050_fibroids_endo_pcos'];
  const pregComplications = answers['q2050_pregnancy_complications'];
  const tryingPregnancy = answers['q2050_trying_pregnancy'];

  if (fibroidsPcos === 'fibroids' || fibroidsPcos === 'endometriosis' || fibroidsPcos === 'pcos' || fibroidsPcos === 'multiple') {
    worthChecking.push({
      id: 'gynae_condition_care',
      title: 'Active Gynaecological Condition Management',
      description: 'Managing diagnosed fibroids, endometriosis, or PCOS with regular pelvic ultrasounds and hormonal reviews preserves vitality and reproductive options.',
      articleId: 'menstrual-health',
      actionText: 'Read Condition Guide',
      actionScreen: 'womens-health',
    });
  }

  if (pregComplications === 'gestational_diabetes' || pregComplications === 'preeclampsia_htn') {
    discussWithDoctor.push({
      id: 'post_pregnancy_cardiometabolic',
      title: 'Post-Pregnancy Cardiometabolic Monitoring',
      description: 'A history of pre-eclampsia or gestational diabetes calls for annual blood pressure, lipid, and fasting blood sugar monitoring.',
      articleId: 'heart-health-women',
      actionText: 'Book Wellness Review',
      actionScreen: 'contact',
    });
  }

  if (tryingPregnancy === 'yes_trying') {
    keepDoing.push({
      id: 'preconception_optimization',
      title: 'Preconception Planning & Folate Support',
      description: 'Taking 400mcg of folic acid daily and checking baseline rubella, hemoglobin, and thyroid levels provides optimal foundation for pregnancy.',
      articleId: 'reproductive-health',
      actionText: 'Preconception Guide',
      actionScreen: 'womens-health',
    });
  }

  // 13. Breast & Gynaecological Health (20–60+)
  const newLump = answers['q_breast_lump'];
  const nippleDischarge = answers['q_nipple_discharge'];
  const skinChanges = answers['q_nipple_skin_changes'];
  const cervicalScreen = answers['q_last_cervical_screen'];
  const mammogram = answers['q_last_mammogram'];

  if (newLump === 'yes_new_lump' || nippleDischarge === 'spontaneous_bloody' || skinChanges === 'dimpling_puckering' || skinChanges === 'newly_inverted_nipple') {
    discussWithDoctor.push({
      id: 'urgent_breast_evaluation',
      title: 'Prompt Clinical Breast Evaluation Recommended',
      description: 'Any new, firm breast lump, skin dimpling, or spontaneous clear/bloody discharge warrants clinical palpation and an urgent breast ultrasound or mammogram.',
      articleId: 'breast-health',
      actionText: 'Schedule Breast Clinic Visit',
      actionScreen: 'contact',
    });
  }

  if (cervicalScreen === 'more_than_5_years' || cervicalScreen === 'never') {
    discussWithDoctor.push({
      id: 'cervical_screening_due',
      title: 'Cervical Pap Smear / HPV Screening Due',
      description: 'Cervical screening every 3–5 years prevents up to 90% of cervical cancers by detecting precancerous cells years in advance.',
      articleId: 'cervical-cancer-hpv',
      actionText: 'Book Pap / HPV Test',
      actionScreen: 'contact',
    });
  }

  if (mammogram === 'never_over_40' || mammogram === 'over_2_years') {
    worthChecking.push({
      id: 'mammogram_due',
      title: 'Screening Mammogram Due for Age Band',
      description: 'Routine digital mammograms every 1–2 years catch microscopic breast changes long before they can be felt.',
      articleId: 'breast-health',
      actionText: 'Schedule Mammogram',
      actionScreen: 'contact',
    });
  }

  // 14. Bone, Muscle & Mobility (20–60+)
  const minorFracture = answers['q_bone_minor_fracture'];
  const heightLoss = answers['q_height_loss'];
  const boneDensityTest = answers['q_bone_density_test'];

  if (minorFracture === 'minor_fall_fracture' || heightLoss === 'marked_loss' || boneDensityTest === 'yes_low_density') {
    discussWithDoctor.push({
      id: 'bone_density_review',
      title: 'Bone Mineral Density (DEXA) Evaluation',
      description: 'A minor-fall fracture, significant height reduction, or osteopenia highlights the need for bone density testing and medical bone-strengthening therapy.',
      articleId: 'preventive-care-matrix',
      actionText: 'Book DEXA Scan',
      actionScreen: 'contact',
    });
  }

  // 15. Mental & Emotional Health (20–60+)
  const mood = answers['q_current_mood'];
  const anxiety = answers['q_anxious_overwhelmed'];
  const exhaustion = answers['q_exhausted_responsibilities'];
  const stress = answers['q_current_stress'];

  if (mood === 'low' || anxiety === 'often' || exhaustion === 'often' || stress === 'high') {
    worthChecking.push({
      id: 'mental_wellness_support',
      title: 'Emotional Wellbeing & Restorative Support',
      description: 'High daily stress, burnout, and persistent low mood are recognized medical health markers. Dedicated therapy, boundary setting, and mental wellness consultations bring profound relief.',
      articleId: 'sleep-stress',
      actionText: 'Mental Wellness Guide',
      actionScreen: 'lifestyle',
    });
  }

  // 16. Compassionate Immediate Safety Pathway (CRITICAL)
  // For question "Have you had thoughts of hurting yourself or not wanting to be alive?",
  // a "yes" MUST NOT be scored like an ordinary health-risk item.
  // It triggers an immediate, compassionate safety pathway and dedicated support resources.
  const selfHarm = answers['q_self_harm_thoughts'];
  let crisisSupport: CrisisSupportInfo | undefined = undefined;

  if (selfHarm === 'yes') {
    crisisSupport = {
      triggered: true,
      title: 'Immediate Confidential Support & Safety Pathway',
      message: 'You indicated having thoughts of hurting yourself or not wanting to be alive. Your life, safety, and emotional wellbeing are deeply valuable. Please connect with compassionate, trained professionals right away.',
      hotlines: [
        {
          name: 'MANI Mental Health Crisis Line (24/7)',
          number: '+234 809 111 6264',
          description: 'Free, compassionate, confidential mental health counselling',
        },
        {
          name: 'MANI Secondary Crisis Line',
          number: '+234 811 160 1444',
          description: '24/7 toll-free confidential mental health support',
        },
        {
          name: 'Emergency Medical Services',
          number: '112',
          description: 'Toll-free emergency line (112 or 767 in Lagos)',
          isEmergency: true,
        },
        {
          name: 'Iwosan Lagoon Hospitals Urgent Care',
          number: '+234 700 496726',
          description: '24/7 urgent medical & clinical psychiatric care',
        },
      ],
    };
  }

  // Optional numbers incorporation if provided
  if (numbers && numbers.systolic && numbers.diastolic) {
    const bpAnalysis = analyzeBloodPressure(numbers.systolic, numbers.diastolic);
    if (bpAnalysis) {
      if (bpAnalysis.isNormal) {
        keepDoing.push({
          id: 'bp_number_normal',
          title: `Optimal BP Reading (${numbers.systolic}/${numbers.diastolic} mmHg)`,
          description: bpAnalysis.guidance,
          articleId: 'heart-health-women',
        });
      } else {
        discussWithDoctor.push({
          id: 'bp_number_elevated',
          title: `Recorded BP Reading (${numbers.systolic}/${numbers.diastolic} mmHg)`,
          description: bpAnalysis.guidance,
          articleId: 'heart-health-women',
          actionText: 'Consult Iwosan Clinician',
          actionScreen: 'contact',
        });
      }
    }
  }

  // Ensure there is at least one item in each category for balanced, encouraging UX
  if (keepDoing.length === 0) {
    keepDoing.push({
      id: 'keep_going_general',
      title: 'Taking Time for Your Health Awareness Today',
      description: 'Taking 3–5 minutes out of your conference day to reflect on your wellness is the first step in self-advocacy.',
      articleId: 'healthy-micro-habits',
    });
  }

  if (worthChecking.length === 0) {
    worthChecking.push({
      id: 'worth_checking_general',
      title: 'Explore the Women’s Health Library',
      description: 'Review our clinician-written guides on hormone balance, heart health, and preventive milestones at your own pace.',
      articleId: 'preventive-care-matrix',
      actionText: 'Browse Health Hub',
      actionScreen: 'womens-health',
    });
  }

  return {
    keepDoing,
    worthChecking,
    discussWithDoctor,
    crisisSupport,
    ageGroup: ageLabel,
    occupationCategory: occupation ? occupationLabel : undefined,
    completionDate: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  };
}
