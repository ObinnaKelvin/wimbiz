import * as XLSX from 'xlsx';
import { AnonymousRecord } from './db';

// Question definitions and friendly human-readable labels for headers
export const QUESTION_HEADER_MAP: Record<string, string> = {
  q0_occupation: 'Occupation Category',
  q1_age: 'Age Band',
  q2_checkup: 'Routine Wellness Check',
  q3_bp: 'Blood Pressure Check',
  q4_sugar: 'Blood Sugar Check',
  q5_history: 'Cardiometabolic Family History',
  q6_activity: 'Physical Activity Level',
  q7_nutrition: 'Nutrition & Greens',
  q8_sleep: 'Sleep & Rest',
  q9_screening: 'Women Screening Discussion',

  // 20-49 Menstrual
  q2049_periods_regular: 'Periods Regular (20-49)',
  q2049_cycle_length: 'Cycle Length (days)',
  q2049_bleed_days: 'Bleeding Duration (days)',
  q2049_bleed_heaviness: 'Bleeding Heaviness',
  q2049_period_pain: 'Severe Period Pain',
  q2049_large_clots: 'Large Clots',
  q2049_bleed_between: 'Bleeding Between Periods',
  q2049_bleed_after_sex: 'Bleeding After Sex',
  q2049_period_interference: 'Periods Interfere with Activities',
  q2049_period_changes_2yr: 'Period Changes in Last 2 Years',

  // 20-50 Fertility & Pregnancy
  q2050_trying_pregnancy: 'Currently Trying to Conceive',
  q2050_difficulty_pregnancy: 'Difficulty Becoming Pregnant',
  q2050_miscarriage: 'Miscarriage History',
  q2050_ectopic: 'Ectopic Pregnancy History',
  q2050_pregnancy_complications: 'Pregnancy Complications',
  q2050_fibroids_endo_pcos: 'Fibroids / Endo / PCOS Diagnosis',
  q2050_periods_current_regular: 'Current Period Regularity',
  q2050_pregnancy_count: 'Number of Pregnancies',
  q2050_pregnancy_after_35: 'Pregnancy After Age 35',
  q2050_contraception: 'Current Contraception Method',

  // 40-49 Perimenopause
  q40_periods_irregular: 'Periods Irregular (40-49)',
  q40_hot_flushes: 'Hot Flushes',
  q40_night_sweats: 'Night Sweats',
  q40_sleep_changed: 'Sleep Changed (40-49)',
  q40_anxiety_irritability: 'Anxiety or Irritability',
  q40_memory_concentration: 'Memory / Brain Fog',
  q40_sexual_desire: 'Sexual Desire Changes',
  q40_vaginal_dryness: 'Vaginal Dryness / Discomfort',
  q40_urinary_leakage: 'Urinary Leakage / Recurrent UTIs',
  q40_hrt_discussion: 'HRT / Menopause Discussion',
  q40_last_period: 'Last Menstrual Period Date/Timeframe',

  // 20-60+ Breast & Gynae
  q_breast_self_check: 'Breast Monthly Self-Check',
  q_breast_lump: 'New Breast Lump Noticed',
  q_nipple_discharge: 'Unusual Nipple Discharge',
  q_breast_shape_change: 'Breast Shape / Appearance Change',
  q_nipple_skin_changes: 'Nipple / Skin Dimpling',
  q_last_mammogram: 'Last Mammogram / Imaging',
  q_last_cervical_screen: 'Last Cervical Pap / HPV Test',
  q_hpv_positive: 'Tested Positive for HPV',
  q_abnormal_cervical: 'Abnormal Cervical Screening Result',
  q_family_cancer_history: 'Family History of Gynae/Breast Cancer',

  // 20-60+ Bone & Mobility
  q_bone_minor_fracture: 'Fracture from Minor Fall',
  q_bone_density_test: 'Bone Density Test (DEXA)',
  q_persistent_back_pain: 'Persistent Back Pain',
  q_persistent_joint_pain: 'Persistent Joint Pain',
  q_height_loss: 'Noticeable Height Reduction',
  q_feel_physically_weaker: 'Feel Physically Weaker',
  q_climb_stairs: 'Climb 2 Flights of Stairs',
  q_strength_exercise: 'Strength / Resistance Exercise',
  q_calcium_foods: 'Calcium-Rich Foods Intake',
  q_osteoporosis_dx: 'Osteopenia / Osteoporosis Diagnosis',

  // 20-60+ Mental & Emotional Health
  q_current_mood: 'Current Mood',
  q_anxious_overwhelmed: 'Anxious / Overwhelmed Frequency',
  q_exhausted_responsibilities: 'Exhausted by Responsibilities',
  q_enjoy_activities: 'Enjoying Usual Activities',
  q_feel_lonely: 'Feelings of Loneliness',
  q_have_confidant: 'Trusted Person to Talk To',
  q_current_stress: 'Current Stress Level',
  q_grief_trauma: 'Recent Grief or Trauma',
  q_mental_health_help: 'Sought Mental Health Help',
  q_self_harm_thoughts: 'Thoughts of Self-Harm (Safety Protocol)',
};

// Friendly formatter for raw option codes to clean readable text
export function formatAnswerValue(qId: string, val?: string): string {
  if (!val || val === 'skipped') return val === 'skipped' ? 'Skipped' : 'N/A';
  if (val.startsWith('date:')) {
    return val.replace('date:', '');
  }

  // Friendly human readable maps for standard values
  const commonMap: Record<string, string> = {
    // Occupation Category
    full_time: 'Full-Time Employee',
    part_time: 'Part-Time Employee',
    self_employed: 'Self-Employed Woman',
    freelancer: 'Freelancer',
    contract_worker: 'Contract Worker',
    casual_worker: 'Casual Worker',
    unemployed_professional: 'Unemployed Professional',
    job_seeker: 'Job Seeker',
    retired_professional: 'Retired Professional',
    student: 'Student',
    stay_at_home: 'Stay-at-Home Woman',

    // Age
    under_20: 'Under 20',
    '20_29': '20 – 29',
    '30_39': '30 – 39',
    '40_49': '40 – 49',
    '50_59': '50 – 59',
    '60_plus': '60+',

    // Routines
    within_year: 'Within last year',
    '1_to_2_years': '1 – 2 years ago',
    more_than_2_years: 'More than 2 years ago',
    never: 'Never',
    not_sure: 'Not sure',

    // General answers
    yes: 'Yes',
    no: 'No',
    active_150: 'Very active (150+ min/wk)',
    moderate: 'Moderately active (60-140 min/wk)',
    light: 'Light movement',
    sedentary: 'Mostly sedentary',
    daily_most: 'Daily with most meals',
    few_times: 'Few times a week',
    rarely: 'Rarely',
    restful: 'Restful & restorative',
    interrupted: 'Interrupted / Restless',
    short: 'Short (< 6 hours)',
    irregular: 'Irregular sleep',
    up_to_date: 'Up to date',
    past_overdue: 'Past overdue',
    not_discussed: 'Not discussed yet',

    // Menstrual
    '21_to_35': '21 – 35 days',
    under_21: '< 21 days',
    over_35: '> 35 days',
    '3_to_7_days': '3 to 7 days',
    under_3_days: '< 3 days',
    '8_days_or_more': '8+ days',
    heavy: 'Heavy',
    frequent_large: 'Frequent large clots',
    severe: 'Severe debilitating',
    none_mild: 'None or mild',

    // Mental
    good: 'Good',
    okay: 'Okay',
    low: 'Low',
    sometimes: 'Sometimes',
    often: 'Often',
    high: 'High',
  };

  return commonMap[val] || val.replace(/_/g, ' ');
}

export function generateExcelWorkbook(records: AnonymousRecord[]): Buffer {
  const wb = XLSX.utils.book_new();

  // SHEET 1: All User Responses in Columns and Rows
  const questionKeys = Object.keys(QUESTION_HEADER_MAP);

  const headerRow: string[] = [
    'Participant ID',
    'Date & Time (UTC)',
    'Age Band',
    'Check Completed?',
    'Systolic BP (mmHg)',
    'Diastolic BP (mmHg)',
    'Blood Glucose',
    'Glucose Type',
    'Height',
    'Weight',
    'BMI',
    'BMI Category',
    ...questionKeys.map((k) => QUESTION_HEADER_MAP[k]),
  ];

  const dataRows: (string | number)[][] = records.map((record) => {
    const row: (string | number)[] = [
      record.id,
      record.timestamp ? new Date(record.timestamp).toLocaleString('en-GB') : '',
      formatAnswerValue('q1_age', record.ageBand || record.answers?.['q1_age']),
      record.completedCheck ? 'Yes' : 'In-Progress',
      record.numbers?.systolic ?? '',
      record.numbers?.diastolic ?? '',
      record.numbers?.bloodSugar ?? '',
      record.numbers?.sugarType ? `${record.numbers.sugarType} (${record.numbers.sugarUnit || 'mg/dL'})` : '',
      record.numbers?.height ? `${record.numbers.height} ${record.numbers.unitSystem === 'imperial' ? 'in' : 'cm'}` : '',
      record.numbers?.weight ? `${record.numbers.weight} ${record.numbers.unitSystem === 'imperial' ? 'lbs' : 'kg'}` : '',
      record.bmi ?? '',
      record.bmiCategory ?? '',
    ];

    for (const qKey of questionKeys) {
      const val = record.answers ? record.answers[qKey] : undefined;
      row.push(formatAnswerValue(qKey, val));
    }

    return row;
  });

  const wsResponses = XLSX.utils.aoa_to_sheet([headerRow, ...dataRows]);

  // Set column widths for comfortable Excel readability
  wsResponses['!cols'] = [
    { wch: 14 }, // ID
    { wch: 20 }, // Timestamp
    { wch: 12 }, // Age Band
    { wch: 16 }, // Completed
    { wch: 16 }, // Systolic
    { wch: 16 }, // Diastolic
    { wch: 14 }, // Glucose
    { wch: 16 }, // Glucose Type
    { wch: 12 }, // Height
    { wch: 12 }, // Weight
    { wch: 10 }, // BMI
    { wch: 20 }, // BMI Category
    ...questionKeys.map(() => ({ wch: 24 })),
  ];

  XLSX.utils.book_append_sheet(wb, wsResponses, 'User Responses Data');

  // SHEET 2: Statistical Percentages per Question
  const statsHeaders: string[] = [
    'Question ID',
    'Question Topic',
    'Total Responses',
    'Option Answer',
    'Response Count',
    'Percentage (%)',
  ];

  const statsRows: (string | number)[][] = [];

  for (const qKey of questionKeys) {
    const questionTitle = QUESTION_HEADER_MAP[qKey];
    const distribution: Record<string, number> = {};
    let totalForQuestion = 0;

    for (const r of records) {
      const ans = r.answers ? r.answers[qKey] : undefined;
      if (ans && ans !== 'skipped') {
        distribution[ans] = (distribution[ans] || 0) + 1;
        totalForQuestion++;
      }
    }

    if (totalForQuestion === 0) {
      statsRows.push([qKey, questionTitle, 0, 'No responses yet', 0, '0.0%']);
    } else {
      for (const [optionId, count] of Object.entries(distribution)) {
        const pct = ((count / totalForQuestion) * 100).toFixed(1) + '%';
        statsRows.push([
          qKey,
          questionTitle,
          totalForQuestion,
          formatAnswerValue(qKey, optionId),
          count,
          pct,
        ]);
      }
    }
  }

  const wsPercentages = XLSX.utils.aoa_to_sheet([statsHeaders, ...statsRows]);
  wsPercentages['!cols'] = [
    { wch: 22 },
    { wch: 32 },
    { wch: 16 },
    { wch: 28 },
    { wch: 16 },
    { wch: 14 },
  ];

  XLSX.utils.book_append_sheet(wb, wsPercentages, 'Question Percentages');

  // Write and return buffer
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  return buffer;
}
