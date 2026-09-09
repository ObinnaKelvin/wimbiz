import { HealthNumbers, SummaryResults, SummaryInsight } from '../types';

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
    return data
      ? JSON.parse(data)
      : {
          sugarType: 'fasting',
          sugarUnit: 'mg/dL',
          height: 165,
          weight: 65,
          unitSystem: 'metric',
        };
  } catch {
    return {
      sugarType: 'fasting',
      sugarUnit: 'mg/dL',
      height: 165,
      weight: 65,
      unitSystem: 'metric',
    };
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
    ageGroup: ageLabel,
    completionDate: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  };
}
