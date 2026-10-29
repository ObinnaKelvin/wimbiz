import { HealthNumbers, SummaryResults, SummaryInsight, CrisisSupportInfo } from '../types';

// Local storage keys for privacy-first client-only persistence
const STORAGE_KEY_ANSWERS = 'iwosan_wellness_answers_v1';
const STORAGE_KEY_ANSWERS_LEGACY = 'iwosan_herhealth_answers_v1';
const STORAGE_KEY_NUMBERS = 'iwosan_wellness_numbers_v1';
const STORAGE_KEY_NUMBERS_LEGACY = 'iwosan_herhealth_numbers_v1';
const STORAGE_KEY_COMPLETED = 'iwosan_wellness_completed_v1';
const STORAGE_KEY_COMPLETED_LEGACY = 'iwosan_herhealth_completed_v1';

export function saveAnswersToLocal(answers: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
  } catch {
    // ignore
  }
}

export function loadAnswersFromLocal(): Record<string, string> {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ANSWERS) || localStorage.getItem(STORAGE_KEY_ANSWERS_LEGACY);
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
    const data = localStorage.getItem(STORAGE_KEY_NUMBERS) || localStorage.getItem(STORAGE_KEY_NUMBERS_LEGACY);
    return data ? JSON.parse(data) : { ...DEFAULT_EMPTY_NUMBERS };
  } catch {
    return { ...DEFAULT_EMPTY_NUMBERS };
  }
}

export function clearAllHealthData() {
  try {
    localStorage.removeItem(STORAGE_KEY_ANSWERS);
    localStorage.removeItem(STORAGE_KEY_ANSWERS_LEGACY);
    localStorage.removeItem(STORAGE_KEY_NUMBERS);
    localStorage.removeItem(STORAGE_KEY_NUMBERS_LEGACY);
    localStorage.removeItem(STORAGE_KEY_COMPLETED);
    localStorage.removeItem(STORAGE_KEY_COMPLETED_LEGACY);
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
  if (age === '18_29' || age === '20_29') ageLabel = '18 – 29';
  else if (age === '30_39') ageLabel = '30 – 39';
  else if (age === '40_49') ageLabel = '40 – 49';
  else if (age === '50_plus' || age === '50_59' || age === '60_plus') ageLabel = '50+';

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
      articleId: 'mental-health-mindfulness',
      actionText: 'Read Burnout Recovery Guide',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'freelancer') {
    occupationLabel = 'Freelancer';
    worthChecking.push({
      id: 'occ_freelancer',
      title: 'Independent Professional Ergonomics & Rest',
      description: 'Independent client work requires intentional physical boundaries: set dedicated work hours, stretch to prevent wrist and neck strain, and maintain consistent meal times.',
      articleId: 'healthy-micro-habits',
      actionText: 'Read Daily Rhythms',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'contract_worker') {
    occupationLabel = 'Contract Worker';
    worthChecking.push({
      id: 'occ_contract_worker',
      title: 'Project Transitions & Steady Vitality',
      description: 'Contract timelines can bring sprint cycles and transition periods. Keeping a steady hydration, movement, and sleep routine maintains your resilience between deliverables.',
      articleId: 'mindfulness-daily-peace',
      actionText: 'Read Mindfulness Guide',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'casual_worker') {
    occupationLabel = 'Casual Worker';
    worthChecking.push({
      id: 'occ_casual_worker',
      title: 'Adaptive Rhythms & Regular Checkups',
      description: 'With varying shift hours, anchor your days with fixed sleep cues and balanced meals, and ensure you keep up with annual wellness checkups.',
      articleId: 'healthy-micro-habits',
      actionText: 'Read Daily Rhythms',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'unemployed_professional') {
    occupationLabel = 'Unemployed Professional';
    worthChecking.push({
      id: 'occ_unemployed_professional',
      title: 'Nervous System Care & Self-Compassion',
      description: 'Professional transitions can be emotionally demanding. Prioritizing daily gentle walking, nervous system grounding, and supportive social connection preserves your health and optimism.',
      articleId: 'mindfulness-daily-peace',
      actionText: 'Nervous System Recovery',
      actionScreen: 'lifestyle',
    });
  } else if (occupation === 'job_seeker') {
    occupationLabel = 'Job Seeker';
    worthChecking.push({
      id: 'occ_job_seeker',
      title: 'Job Search Resilience & Wellness Routine',
      description: 'Actively searching for roles takes significant mental energy. Set a daily cutoff time for job applications, take outdoor breathwork walks, and safeguard restful sleep.',
      articleId: 'mental-health-mindfulness',
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

  // 7. Nutrition & Hydration
  const plateColor = answers['q_nutrition_plate_colors'];
  const animalProtein = answers['q_nutrition_animal_protein'];
  const dietType = answers['q_nutrition_diet_type'];
  const fibre = answers['q_nutrition_fibre'];
  const water = answers['q_nutrition_water'];
  const cookingOil = answers['q_nutrition_cooking_oil'];
  const legacyNutrition = answers['q7_nutrition'];

  // Plate diversity & colorful meals
  if (plateColor === 'always' || legacyNutrition === 'daily_most') {
    keepDoing.push({
      id: 'nutrition_rich',
      title: 'Diverse, Colorful Meal Plates',
      description: 'Regularly including a vibrant rainbow of vegetables, legumes, whole grains, and healthy fats delivers antioxidants and phytonutrients that protect vascular and cellular health.',
      articleId: 'nutrition-habits',
    });
  } else if (plateColor === 'sometimes' || plateColor === 'rarely' || legacyNutrition === 'few_times' || legacyNutrition === 'rarely') {
    worthChecking.push({
      id: 'nutrition_add',
      title: 'Build a More Colorful Plate Model',
      description: 'Adding an extra serving of deep leafy greens (such as ugwu, spinach, or waterleaf), legumes, or colorful vegetables enhances your antioxidant shield and gut microbiome vitality.',
      articleId: 'nutrition-habits',
      actionText: 'Read Nutrition Guide',
      actionScreen: 'lifestyle',
    });
  }

  // Dietary Fibre intake
  if (fibre === 'a_lot_25_30g') {
    keepDoing.push({
      id: 'fibre_optimal',
      title: 'Optimal Daily Fibre Intake (25–30g)',
      description: 'Reaching 25–30g of daily dietary fibre actively regulates postprandial glucose, lowers LDL cholesterol, and maintains digestive balance.',
      articleId: 'nutrition-habits',
    });
  } else if (fibre === 'not_so_much_less_25g' || fibre === 'no_fibre') {
    worthChecking.push({
      id: 'fibre_boost',
      title: 'Gradually Increase Daily Dietary Fibre',
      description: 'Most women benefit from reaching 25–30g of daily fibre. Simple additions like oats, beans, chia seeds, and whole vegetables steadily improve metabolic balance.',
      articleId: 'nutrition-habits',
      actionText: 'Explore Fibre Tips',
      actionScreen: 'lifestyle',
    });
  }

  // Daily Hydration
  if (water === '4_5_bottles_75cl' || water === '2_3_bottles_75cl') {
    keepDoing.push({
      id: 'water_healthy',
      title: 'Sufficient Daily Hydration',
      description: 'Drinking 2–4+ bottles of water daily supports kidney clearance, steady energy, blood pressure regulation, and cognitive focus.',
      articleId: 'nutrition-habits',
    });
  } else if (water === 'less_than_2_bottles_75cl') {
    worthChecking.push({
      id: 'water_increase',
      title: 'Increase Daily Water Hydration',
      description: 'Consuming less than 1.5 litres of water can lead to subtle dehydration, afternoon fatigue, and urinary tract vulnerability. Aim to carry a refillable water bottle.',
      articleId: 'nutrition-habits',
      actionText: 'Read Hydration Tips',
      actionScreen: 'lifestyle',
    });
  }

  // Healthy Cooking Fats
  if (cookingOil === 'unsaturated_fats') {
    keepDoing.push({
      id: 'oil_heart_healthy',
      title: 'Heart-Healthy Unsaturated Cooking Oils',
      description: 'Cooking primarily with unsaturated fats (such as olive, canola, sunflower, or avocado oil) protects your blood vessel lining and HDL cholesterol levels.',
      articleId: 'heart-health-women',
    });
  } else if (cookingOil === 'saturated_fats') {
    worthChecking.push({
      id: 'oil_swap_guide',
      title: 'Heart-Friendly Cooking Oil Swaps',
      description: 'High intake of saturated cooking fats can elevate arterial LDL cholesterol. Consider swapping some saturated fats with cold-pressed olive or vegetable oils.',
      articleId: 'heart-health-women',
      actionText: 'Read Heart Health Guide',
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

  // 9. Avoidance of Toxic Substances
  const toxic = answers['q_toxic_substances'];
  if (toxic === 'no_smoke' || toxic === 'none') {
    keepDoing.push({
      id: 'toxic_none',
      title: 'Smoke-Free Cellular Health',
      description: 'Living smoke-free directly protects your arterial walls, lung function, vocal cords, and long-term cellular longevity.',
      articleId: 'avoidance-toxic-substances',
      actionText: 'Read Toxin Guide',
      actionScreen: 'lifestyle',
    });
  } else if (toxic === 'vape_shisha') {
    worthChecking.push({
      id: 'toxic_vape_shisha',
      title: 'Vaping & Shisha Harm-Reduction Support',
      description: 'Vaping and shisha expose delicate lung tissue and vascular endothelium to heated aerosols and toxic flavorants. Gradual reduction protects cardiovascular elasticity.',
      articleId: 'avoidance-toxic-substances',
      actionText: 'Read Toxin Guide',
      actionScreen: 'lifestyle',
    });
  } else if (toxic === 'cigarettes_daily' || toxic === 'smoke_or_vape') {
    discussWithDoctor.push({
      id: 'toxic_smoking_cessation',
      title: 'Cardiovascular & Lung Protection Support',
      description: 'Regular cigarette smoking significantly accelerates arterial stiffness and cardiovascular risk for women. Our clinicians offer warm, evidence-based, compassionate cessation support.',
      articleId: 'avoidance-toxic-substances',
      actionText: 'Speak with an Iwosan Clinician',
      actionScreen: 'contact',
    });
  } else if (toxic === 'occasional_alcohol') {
    keepDoing.push({
      id: 'toxic_moderate',
      title: 'Conscious & Moderate Lifestyle Habits',
      description: 'Maintaining moderation supports liver metabolism, hormonal balance, and deep sleep architecture.',
      articleId: 'avoidance-toxic-substances',
      actionText: 'Read Toxin Guide',
      actionScreen: 'lifestyle',
    });
  } else if (toxic === 'regular_alcohol') {
    worthChecking.push({
      id: 'toxic_alcohol_reduction',
      title: 'Consider Alcohol-Free Reset Days',
      description: 'Regular alcohol consumption can subtly increase resting blood pressure, breast cancer risk, and sleep fragmentation. Incorporating alcohol-free days brings quick vitality gains.',
      articleId: 'avoidance-toxic-substances',
      actionText: 'Read Toxin Guide',
      actionScreen: 'lifestyle',
    });
  }

  // Specific alcohol evaluation
  const alcohol = answers['q_alcohol'];
  if (alcohol === 'more_than_two_a_day') {
    discussWithDoctor.push({
      id: 'alcohol_high_intake_support',
      title: 'Proactive Alcohol Moderation Support',
      description: 'Consuming more than 2 drinks daily places noticeable metabolic load on liver function, blood pressure regulation, and deep sleep. Speaking with our wellness team provides compassionate, evidence-based reduction steps.',
      articleId: 'avoidance-toxic-substances',
      actionText: 'Speak with an Iwosan Clinician',
      actionScreen: 'contact',
    });
  } else if (alcohol === 'one_a_day') {
    worthChecking.push({
      id: 'alcohol_daily_moderation',
      title: 'Incorporate Alcohol-Free Days',
      description: 'Daily alcohol intake can subtly elevate resting blood pressure and interrupt deep REM sleep cycles. Introducing 3–4 alcohol-free days per week promotes cellular rejuvenation and metabolic ease.',
      articleId: 'avoidance-toxic-substances',
      actionText: 'Read Toxin Guide',
      actionScreen: 'lifestyle',
    });
  } else if (alcohol === 'social_drinker') {
    if (toxic !== 'none' && toxic !== 'occasional_alcohol') {
      keepDoing.push({
        id: 'alcohol_social',
        title: 'Mindful Social Alcohol Consumption',
        description: 'Keeping alcohol consumption to occasional social settings aligns with liver-protective and cardiovascular health guidelines.',
        articleId: 'avoidance-toxic-substances',
        actionText: 'Read Toxin Guide',
        actionScreen: 'lifestyle',
      });
    }
  } else if (alcohol === 'no') {
    if (toxic !== 'none') {
      keepDoing.push({
        id: 'alcohol_zero',
        title: 'Alcohol-Free Cellular Vitality',
        description: 'Abstaining from alcohol supports liver detoxification pathways, restful sleep cycles, and optimal cardiovascular wellness.',
        articleId: 'avoidance-toxic-substances',
        actionText: 'Read Toxin Guide',
        actionScreen: 'lifestyle',
      });
    }
  }

  // 10. Midlife & Perimenopause (specifically tailored for 40–49 age band)
  const is40to49 = answers['q1_age'] === '40_49';
  if (is40to49) {
    // Vasomotor (Hot flushes)
    const hotFlushes = answers['q40_hot_flushes'];
    if (hotFlushes === 'yes_frequent') {
      discussWithDoctor.push({
        id: 'vasomotor_support',
        title: 'Vasomotor Symptom Relief (Hot Flushes)',
        description: 'Frequent hot flushes are highly treatable. Modern evidence-based options (including HRT and non-hormonal prescription therapies) can quickly restore comfort and sleep.',
        articleId: 'menopause-midlife',
        actionText: 'Discuss Treatment with Iwosan',
        actionScreen: 'contact',
      });
    } else if (hotFlushes === 'mild_occasional') {
      worthChecking.push({
        id: 'vasomotor_mild',
        title: 'Managing Mild Temperature Changes',
        description: 'Layering breathable natural fabrics, maintaining a cool bedroom, and limiting caffeine or spicy foods helps buffer mild hot flashes.',
        articleId: 'menopause-midlife',
      });
    } else if (hotFlushes === 'no_none') {
      keepDoing.push({
        id: 'vasomotor_clear',
        title: 'Free of Vasomotor Symptoms',
        description: 'You are currently not experiencing hot flushes, supporting steady daily focus and energy.',
        articleId: 'menopause-midlife',
      });
    }

    // Genitourinary & Pelvic Health
    const leakage = answers['q40_urinary_leakage'];
    if (leakage === 'yes_leakage_uti') {
      discussWithDoctor.push({
        id: 'gsm_care',
        title: 'Pelvic Floor & Bladder Support',
        description: 'Genitourinary tissue changes and urinary urgency respond exceptionally well to targeted medical care and gentle pelvic physiotherapy.',
        articleId: 'menopause-midlife',
        actionText: 'Book Women’s Health Visit',
        actionScreen: 'contact',
      });
    } else if (leakage === 'no_symptoms') {
      keepDoing.push({
        id: 'pelvic_healthy',
        title: 'Healthy Pelvic & Tissue Tone',
        description: 'No urinary leakage or discomfort noted. Continuing regular pelvic floor exercises helps preserve this strength.',
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

    // Sexual desire & Intimacy (General Women's Health)
    const sexualDesire = answers['q40_sexual_desire'];
    if (sexualDesire === 'yes_reduced') {
      discussWithDoctor.push({
        id: 'libido_support',
        title: 'Intimacy, Hormonal Balance & Libido Support',
        description: 'Shifts in sexual desire during midlife are very common and biologically linked to shifting estrogen, testosterone, and sleep quality. Supportive hormonal and holistic care can help.',
        articleId: 'menopause-midlife',
        actionText: 'Discuss with Clinician',
        actionScreen: 'contact',
      });
    } else if (sexualDesire === 'fluctuating') {
      worthChecking.push({
        id: 'libido_fluctuating',
        title: 'Hormonal Rhythms & Intimacy Wellness',
        description: 'Fluctuating desire often aligns with natural monthly hormonal peaks and fatigue levels. Open communication and gentle pacing support healthy intimacy.',
        articleId: 'menopause-midlife',
      });
    } else if (sexualDesire === 'no_unchanged') {
      keepDoing.push({
        id: 'libido_healthy',
        title: 'Steady Intimacy & Libido',
        description: 'Maintaining consistent libido and intimacy is a positive sign of hormonal and emotional equilibrium.',
        articleId: 'menopause-midlife',
      });
    }
  }

  // 11. Menstrual Health (18–49)
  const periodChanges = answers['q2049_period_changes_2yr'];
  if (periodChanges === 'heavier_more_painful') {
    discussWithDoctor.push({
      id: 'menstrual_changes_review',
      title: 'Menstrual Flow & Cycle Pattern Changes',
      description: 'Noticeable increases in period heaviness or cramping can signal developing fibroids or hormonal shifts; a pelvic checkup can provide tailored relief.',
      articleId: 'menstrual-health',
      actionText: 'Consult Gynaecologist',
      actionScreen: 'contact',
    });
  } else if (periodChanges === 'irregular_timing' || periodChanges === 'lighter_less_frequent') {
    worthChecking.push({
      id: 'menstrual_tracking',
      title: 'Cycle Rhythm & Timing Observation',
      description: 'Recent shifts in cycle timing or flow duration are great topics for your next routine wellness checkup.',
      articleId: 'menstrual-health',
      actionText: 'Read Menstrual Guide',
      actionScreen: 'womens-health',
    });
  } else if (periodChanges === 'unchanged') {
    keepDoing.push({
      id: 'menstrual_steady',
      title: 'Consistent Menstrual Rhythm',
      description: 'Predictable and stable menstrual cycles reflect balanced ovarian and endocrine function.',
      articleId: 'menstrual-health',
    });
  }

  // 12. Fertility, Pregnancy & Reproductive Health (18–49)
  const fibroidsPcos = answers['q2050_fibroids_endo_pcos'];

  if (fibroidsPcos === 'fibroids' || fibroidsPcos === 'endometriosis' || fibroidsPcos === 'pcos' || fibroidsPcos === 'multiple') {
    worthChecking.push({
      id: 'gynae_condition_care',
      title: 'Active Gynaecological Condition Management',
      description: 'Managing diagnosed fibroids, endometriosis, or PMOS with regular pelvic ultrasounds and hormonal reviews preserves vitality and reproductive options.',
      articleId: 'menstrual-health',
      actionText: 'Read Condition Guide',
      actionScreen: 'womens-health',
    });
  } else if (fibroidsPcos === 'none') {
    keepDoing.push({
      id: 'gynae_clear',
      title: 'Clear Gynaecological Profile',
      description: 'No history of fibroids, endometriosis, or PMOS noted. Continuing annual checkups supports ongoing reproductive wellness.',
      articleId: 'reproductive-health',
    });
  }

  // General Women's Health - Detailed Symptom Evaluation (All Ages)
  const cycleDays = answers['q_cycle_days'];
  const severePeriodPain = answers['q_severe_period_pain'];
  const bleedingBetween = answers['q_bleeding_between_periods'];
  const painIntercourse = answers['q_pain_sexual_intercourse'];
  const periodInterference = answers['q_periods_interfere_activities'];
  const difficultyPregnant = answers['q_difficulty_getting_pregnant'];
  const weightPerception = answers['q_weight_perception'];
  const chinHair = answers['q_chin_hair'];

  // Cycle Length
  if (cycleDays === '21_to_35_days') {
    keepDoing.push({
      id: 'cycle_regular_normal',
      title: 'Healthy Cycle Duration (21–35 Days)',
      description: 'Your menstrual cycle length falls comfortably within the standard biological range, reflecting balanced ovulatory and hormonal pacing.',
      articleId: 'menstrual-health',
    });
  } else if (cycleDays === 'less_than_21_days' || cycleDays === 'more_than_35_days') {
    worthChecking.push({
      id: 'cycle_duration_review',
      title: 'Cycle Regularity & Hormone Pacing Review',
      description: 'Cycles shorter than 21 days or longer than 35 days often indicate anovulatory cycles, thyroid fluctuations, or PMOS / ovarian patterns. Discussing cycle tracking with a gynaecologist can restore balance.',
      articleId: 'menstrual-health',
      actionText: 'Read Menstrual Guide',
      actionScreen: 'womens-health',
    });
  }

  // Dysmenorrhea & Activity Interference
  if (severePeriodPain === 'severe_disabling' || periodInterference === 'often_miss_work') {
    discussWithDoctor.push({
      id: 'severe_dysmenorrhea_review',
      title: 'Severe Period Pain & Disruption Support',
      description: 'Severe cramping that interrupts work, sleep, or daily responsibilities is not something you must simply endure. It warrants dedicated screening for endometriosis, adenomyosis, or fibroids.',
      articleId: 'menstrual-health',
      actionText: 'Book Gynaecological Review',
      actionScreen: 'contact',
    });
  } else if (severePeriodPain === 'no_mild' && (periodInterference === 'never' || periodInterference === 'rarely')) {
    keepDoing.push({
      id: 'period_comfort_good',
      title: 'Manageable Menstrual Comfort',
      description: 'Experiencing minimal pain and maintaining daily productivity during menstruation indicates favorable pelvic health and hormonal comfort.',
      articleId: 'menstrual-health',
    });
  }

  // Intermenstrual Bleeding
  if (bleedingBetween === 'frequently' || bleedingBetween === 'after_sex_postmenopausal') {
    discussWithDoctor.push({
      id: 'intermenstrual_bleeding_check',
      title: 'Intermenstrual or Post-Coital Spotting Evaluation',
      description: 'Bleeding between periods or after intercourse warrants a gentle speculum exam and pelvic ultrasound to check the cervix and endometrial lining.',
      articleId: 'cervical-cancer-hpv',
      actionText: 'Speak with an Iwosan Clinician',
      actionScreen: 'contact',
    });
  }

  // Dyspareunia (Pain during intercourse)
  if (painIntercourse === 'frequent_deep_pain') {
    discussWithDoctor.push({
      id: 'dyspareunia_support',
      title: 'Pelvic Comfort & Gynaecological Review',
      description: 'Persistent discomfort or deep pain during intercourse can stem from pelvic floor tightness, localized tissue dryness, fibroids, or endometriosis. Compassionate medical care can provide meaningful relief.',
      articleId: 'reproductive-health',
      actionText: 'Consult Women’s Health Specialist',
      actionScreen: 'contact',
    });
  } else if (painIntercourse === 'occasional_dryness') {
    worthChecking.push({
      id: 'intimacy_dryness_care',
      title: 'Vaginal Moisture & Hormonal Balance',
      description: 'Intermittent dryness is very common with stress, contraceptive use, or shifting estrogen. Clinician-recommended moisturizers and gentle therapies quickly restore comfort.',
      articleId: 'reproductive-health',
      actionText: 'Explore Women’s Health Guide',
      actionScreen: 'womens-health',
    });
  }

  // Fertility Difficulty
  if (difficultyPregnant === 'significant_difficulty') {
    discussWithDoctor.push({
      id: 'fertility_evaluation_support',
      title: 'Comprehensive Reproductive & Fertility Assessment',
      description: 'Facing difficulty getting pregnant can be emotionally demanding. Early investigations of ovulation reserve, tubal patency, and pelvic anatomy provide clear, proactive paths forward.',
      articleId: 'reproductive-health',
      actionText: 'Connect with Fertility Team',
      actionScreen: 'contact',
    });
  }

  // Chin Hair (Hirsutism / PMOS Sign)
  if (chinHair === 'noticeable_coarse' || chinHair === 'frequent_spreading') {
    worthChecking.push({
      id: 'hirsutism_hormonal_balance',
      title: 'Androgen & Hormonal Profile Review',
      description: 'Coarse hair growth under the chin is often linked to elevated androgens or insulin resistance (frequently seen in PMOS). Blood hormone tests and metabolic support offer targeted management.',
      articleId: 'menstrual-health',
      actionText: 'Learn about PMOS Care',
      actionScreen: 'womens-health',
    });
  }

  // Weight Perception
  if (weightPerception === 'obese') {
    worthChecking.push({
      id: 'metabolic_weight_management',
      title: 'Metabolic & Cardiometabolic Wellness Review',
      description: 'Carrying significant excess weight places additional stress on joints, vascular endothelium, and insulin receptors. A physician-led metabolic plan can help protect long-term vitality.',
      articleId: 'nutrition-hydration',
      actionText: 'Read Nutrition Guide',
      actionScreen: 'lifestyle',
    });
  } else if (weightPerception === 'normal_weight') {
    keepDoing.push({
      id: 'weight_balance_healthy',
      title: 'Healthy Weight Perception & Metabolic Ease',
      description: 'Maintaining a stable, healthy weight perception supports cardiovascular longevity, reproductive health, and steady daily vitality.',
      articleId: 'nutrition-hydration',
    });
  }

  // 13. Breast & Gynaecological Health (18–50+)
  const selfCheck = answers['q_breast_self_check'];
  const cervicalScreen = answers['q_last_cervical_screen'];
  const mammogram = answers['q_last_mammogram'];

  if (selfCheck === 'yes_monthly') {
    keepDoing.push({
      id: 'breast_self_awareness_habit',
      title: 'Proactive Monthly Breast Awareness',
      description: 'Checking your breasts monthly helps you know what is normal for you and spot subtle changes early.',
      articleId: 'breast-health',
    });
  } else if (selfCheck === 'rarely_never' || selfCheck === 'not_sure_how') {
    worthChecking.push({
      id: 'breast_self_check_guide',
      title: 'Learn the 2-Minute Breast Self-Awareness Routine',
      description: 'Breast self-awareness is simple and empowering. Our clinician guide explains how to feel comfortable checking your tissue.',
      articleId: 'breast-health',
      actionText: 'View Breast Guide',
      actionScreen: 'womens-health',
    });
  }

  if (cervicalScreen === 'within_3_years') {
    keepDoing.push({
      id: 'cervical_screen_current',
      title: 'Up-to-Date Cervical Screening',
      description: 'Staying current with routine cervical Pap or HPV screening provides exceptional lifelong protection.',
      articleId: 'cervical-cancer-hpv',
    });
  } else if (cervicalScreen === 'more_than_5_years' || cervicalScreen === 'never') {
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
  } else if (mammogram === 'within_1_to_2_years') {
    keepDoing.push({
      id: 'mammogram_current',
      title: 'Current Breast Imaging / Mammogram',
      description: 'You are up to date with breast screening recommendations for your life stage.',
      articleId: 'breast-health',
    });
  }

  // 14. Bone, Muscle & Mobility (18–50+)
  const boneDensityTest = answers['q_bone_density_test'];
  const strength = answers['q_strength_exercise'];

  if (boneDensityTest === 'yes_low_density') {
    discussWithDoctor.push({
      id: 'bone_density_review',
      title: 'Bone Mineral Density Support',
      description: 'Diagnosed osteopenia or bone thinning highlights the need for active bone protective therapy, calcium/D3, and resistance movement.',
      articleId: 'preventive-care-matrix',
      actionText: 'Book DEXA Scan',
      actionScreen: 'contact',
    });
  }

  if (strength === 'regular_2_plus') {
    keepDoing.push({
      id: 'strength_routine_strong',
      title: 'Regular Strength or Cardio Exercise Habit',
      description: 'Engaging in regular exercise 2+ times weekly actively preserves bone density, cardiovascular fitness, metabolic rate, and muscle mass.',
      articleId: 'movement-exercise',
    });
  } else if (strength === 'cardio_only') {
    worthChecking.push({
      id: 'strength_cardio_balance',
      title: 'Combine Cardio with Resistance Movements',
      description: 'Cardio is wonderful for cardiovascular health. Adding gentle bodyweight squats, resistance bands, or light weights twice a week strengthens bones and metabolism.',
      articleId: 'movement-exercise',
      actionText: 'Explore Movement Tips',
      actionScreen: 'lifestyle',
    });
  } else if (strength === 'none') {
    worthChecking.push({
      id: 'strength_start_guide',
      title: 'Incorporate Regular Strength or Cardio Exercise',
      description: 'Adding enjoyable brisk walks, light cardio, or bodyweight exercises twice a week provides vital cardiovascular and bone mineral stimulation.',
      articleId: 'movement-exercise',
      actionText: 'Explore Movement Tips',
      actionScreen: 'lifestyle',
    });
  }

  // 15. Social Connectedness & Relationship
  const loved = answers['q_social_loved'];
  const familySupport = answers['q_social_family_support'];
  const friends = answers['q_social_friends'];
  const workEnv = answers['q_social_work_environment'];
  const teamWork = answers['q_social_team_work'];
  const socializing = answers['q_social_socializing'];
  const positiveEnergy = answers['q_social_positive_energy'];

  const socialAnswers = [
    loved,
    familySupport,
    friends,
    workEnv,
    teamWork,
    socializing,
    positiveEnergy,
  ].filter(Boolean);

  if (socialAnswers.length > 0) {
    const alwaysCount = socialAnswers.filter((v) => v === 'always').length;
    const neverCount = socialAnswers.filter((v) => v === 'never').length;
    const sometimesCount = socialAnswers.filter((v) => v === 'sometimes').length;

    if (alwaysCount >= 4 && neverCount === 0) {
      keepDoing.push({
        id: 'social_strong',
        title: 'Strong Social Support & Vibrant Connections',
        description:
          'Feeling loved, having good family and friend support, and thriving in positive team environments provides vital biological resilience and emotional grounding.',
        articleId: 'healthy-micro-habits',
      });
    } else if (neverCount >= 2 || (loved === 'never' && familySupport === 'never')) {
      worthChecking.push({
        id: 'social_connection_care',
        title: 'Nurture Community, Support Networks & Workplace Harmony',
        description:
          'Navigating relationships, family dynamics, or workplace tension without reassuring anchors can elevate chronic stress. Connecting with trusted circles, mentors, or wellness counselors brings restorative balance.',
        articleId: 'mental-health-mindfulness',
        actionText: 'Read Support Guide',
        actionScreen: 'lifestyle',
      });
    } else if (sometimesCount >= 3 || neverCount === 1) {
      worthChecking.push({
        id: 'social_balance_care',
        title: 'Deepen Social Connections & Relational Energy',
        description:
          'Investing intentional moments into supportive friendships, hospitable work boundaries, and positive personal spaces helps sustain everyday vitality and emotional buffer.',
        articleId: 'mental-health-mindfulness',
        actionText: 'Explore Mindful Habits',
        actionScreen: 'lifestyle',
      });
    }
  } else {
    // Legacy fallback check
    const lonely = answers['q_feel_lonely'];
    const confidant = answers['q_have_confidant'];

    if (lonely === 'rarely_never' && confidant === 'yes_confidant') {
      keepDoing.push({
        id: 'social_strong',
        title: 'Strong Social Support & Meaningful Connection',
        description: 'Having a trusted confidant and feeling closely connected to your circle provides vital psychological and cardiovascular resilience.',
        articleId: 'healthy-micro-habits',
      });
    } else if (lonely === 'often' || confidant === 'no_one') {
      worthChecking.push({
        id: 'social_connection_care',
        title: 'Prioritize Meaningful Community & Support Networks',
        description: 'Navigating busy life seasons without a safe confidant can feel isolating. Connecting with supportive groups or wellness counsellors brings valuable emotional grounding.',
        articleId: 'mental-health-mindfulness',
        actionText: 'Read Support Guide',
        actionScreen: 'lifestyle',
      });
    }
  }

  // 16. Mental Health & Mindfulness (PHQ-9 screening protocol)
  const phqKeys = [
    'phq1_interest',
    'phq2_depressed',
    'phq3_sleep',
    'phq4_tired',
    'phq5_appetite',
    'phq6_self_worth',
    'phq7_concentration',
    'phq8_psychomotor',
    'phq9_self_harm',
  ];

  let phqScore = 0;
  let phqAnsweredCount = 0;

  phqKeys.forEach((key) => {
    const val = answers[key];
    if (val) {
      phqAnsweredCount++;
      if (val === 'several_days') phqScore += 1;
      else if (val === 'more_than_half') phqScore += 2;
      else if (val === 'nearly_every_day') phqScore += 3;
    }
  });

  const legacyMood = answers['q_current_mood'];
  const legacyAnxiety = answers['q_anxious_overwhelmed'];
  const legacyExhaustion = answers['q_exhausted_responsibilities'];
  const legacyStress = answers['q_current_stress'];
  const legacyJoy = answers['q_enjoy_activities'];

  if (phqAnsweredCount > 0) {
    if (phqScore <= 4) {
      keepDoing.push({
        id: 'mental_resilience_strong',
        title: 'Positive Emotional Baseline & Mindful Wellbeing',
        description: 'Your screening responses reflect a grounded emotional baseline and psychological resilience. Maintaining regular mindfulness, sleep hygiene, and personal boundaries nurtures this healthy balance.',
        articleId: 'mindfulness-daily-peace',
        actionText: 'Read Mindfulness Guide',
        actionScreen: 'lifestyle',
      });
    } else if (phqScore <= 9) {
      worthChecking.push({
        id: 'mental_wellness_mild',
        title: 'Gentle Restorative Strategies for Emotional Fatigue',
        description: 'Experiencing intermittent low energy or mild emotional strain is common during demanding life seasons. Gentle daily movement, restorative sleep routines, and dedicated mindfulness breaks can bring relief.',
        articleId: 'mental-health-mindfulness',
        actionText: 'Mental Wellness Guide',
        actionScreen: 'lifestyle',
      });
    } else {
      discussWithDoctor.push({
        id: 'mental_wellness_clinical',
        title: 'Proactive Clinical Support for Emotional Wellbeing',
        description: 'Your responses indicate noticeable mood strain, persistent fatigue, or low spirits. Speaking with a compassionate healthcare professional or counselor provides personalized strategies and effective care.',
        articleId: 'mental-health-mindfulness',
        actionText: 'Connect with Iwosan Wellness',
        actionScreen: 'contact',
      });
    }
  } else if (legacyMood || legacyAnxiety || legacyStress) {
    if (legacyMood === 'good' && (legacyAnxiety === 'never' || legacyAnxiety === 'sometimes') && (legacyStress === 'low' || legacyStress === 'moderate')) {
      keepDoing.push({
        id: 'mental_resilience_strong',
        title: 'Positive Emotional Baseline & Grounded Mindset',
        description: 'Experiencing consistent daily joy, manageable stress levels, and grounded emotional energy actively protects vascular health and cellular immunity.',
        articleId: 'mindfulness-daily-peace',
        actionText: 'Read Mindfulness Guide',
        actionScreen: 'lifestyle',
      });
    } else if (legacyMood === 'low' || legacyAnxiety === 'often' || legacyExhaustion === 'often' || legacyStress === 'high' || legacyJoy === 'rarely_not_at_all') {
      worthChecking.push({
        id: 'mental_wellness_support',
        title: 'Emotional Wellbeing & Restorative Support',
        description: 'High daily stress, burnout, and persistent low mood are recognized medical health markers. Dedicated therapy, boundary setting, and mental wellness consultations bring profound relief.',
        articleId: 'mental-health-mindfulness',
        actionText: 'Mental Wellness Guide',
        actionScreen: 'lifestyle',
      });
    }
  }

  // 17. Compassionate Immediate Safety Pathway (CRITICAL)
  // For question "Thoughts that you would be better off dead, or hurting yourself?",
  // an affirmative answer MUST NOT be scored like an ordinary health-risk item.
  // It triggers an immediate, compassionate safety pathway and dedicated support resources.
  const selfHarm = answers['phq9_self_harm'] || answers['q_self_harm_thoughts'];
  let crisisSupport: CrisisSupportInfo | undefined = undefined;

  if (
    selfHarm &&
    selfHarm !== 'not_at_all' &&
    selfHarm !== 'no' &&
    selfHarm !== 'skipped' &&
    selfHarm !== 'prefer_not'
  ) {
    crisisSupport = {
      triggered: true,
      title: 'Immediate Confidential Support & Safety Pathway',
      message: 'You indicated having thoughts that you would be better off dead, or hurting yourself. Your life, safety, and emotional wellbeing are deeply valuable. Please connect with compassionate, trained professionals right away.',
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
