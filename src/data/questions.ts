import { Question, QuestionCategory, QuestionOption } from '../types';

export const CORE_HEALTH_QUESTIONS: Question[] = [
  {
    id: 'q0_occupation',
    category: 'OCCUPATION',
    categoryLabel: 'Occupation & Work',
    stepNumber: 1,
    totalSteps: 10,
    title: 'What category do you fall under?',
    whyWeAsk: 'Understanding your work rhythm and daily structure helps tailor lifestyle, occupational ergonomics, and preventive screening recommendations to fit your life.',
    options: [
      { id: 'full_time', label: 'Full-Time Employee', detail: 'Works for an employer on a full-time schedule.', type: 'neutral' },
      { id: 'part_time', label: 'Part-Time Employee', detail: 'Works fewer hours than a full-time employee.', type: 'neutral' },
      { id: 'self_employed', label: 'Self-Employed Woman', detail: 'Works for herself rather than as an employee.', type: 'neutral' },
      { id: 'freelancer', label: 'Freelancer', detail: 'Offers professional services to multiple clients independently.', type: 'neutral' },
      { id: 'contract_worker', label: 'Contract Worker', detail: 'Works under a fixed-term or project-based contract.', type: 'neutral' },
      { id: 'casual_worker', label: 'Casual Worker', detail: 'Works irregularly or when needed.', type: 'neutral' },
      { id: 'unemployed_professional', label: 'Unemployed Professional', detail: 'Has professional skills but is currently without employment.', type: 'neutral' },
      { id: 'job_seeker', label: 'Job Seeker', detail: 'Actively looking for employment.', type: 'neutral' },
      { id: 'retired_professional', label: 'Retired Professional', detail: 'Has retired from her primary career.', type: 'neutral' },
      { id: 'student', label: 'Student', detail: 'Currently pursuing an education or professional qualification.', type: 'neutral' },
      { id: 'stay_at_home', label: 'Stay-at-Home Woman', detail: 'Primarily manages household responsibilities and may or may not engage in paid work', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q1_age',
    category: 'AGE',
    categoryLabel: 'Age Band',
    stepNumber: 1,
    totalSteps: 9,
    title: 'Which age band are you in?',
    whyWeAsk: 'Women experience distinct hormonal and physiological milestones across life stages. Your age band helps tailor personalized screening timelines (such as mammograms and bone density) without needing your exact date of birth.',
    options: [
      { id: '18_29', label: '18 – 29', detail: 'Social connectedness, mental health, cervical & reproductive wellness', type: 'neutral' },
      { id: '30_39', label: '30 – 39', detail: 'Cardiovascular screening, cervical checks & fertility/fibroid care', type: 'neutral' },
      { id: '40_49', label: '40 – 49', detail: 'Mammography entry, perimenopause & metabolic checks', type: 'neutral' },
      { id: '50_plus', label: '50+', detail: 'Menopause vitality, bone health, heart & colorectal checks', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q2_checkup',
    category: 'ROUTINE CHECK',
    categoryLabel: 'Routine Check',
    stepNumber: 2,
    totalSteps: 9,
    title: 'When did you last have a routine wellness check?',
    whyWeAsk: 'Routine preventive checkups allow doctors to detect subtle shifts in blood pressure, kidney function, and metabolic markers before symptoms appear.',
    options: [
      { id: 'within_year', label: 'Within the last year', detail: 'Great proactive care routine', type: 'doing_well' },
      { id: '1_to_2_years', label: '1 – 2 years ago', detail: 'A wellness checkup may be due soon', type: 'worth_checking' },
      { id: 'more_than_2_years', label: 'More than 2 years ago', detail: 'Recommended to reconnect with a clinician', type: 'discuss' },
      { id: 'never', label: 'Never had one', detail: 'A gentle first health check is a powerful step', type: 'discuss' },
      { id: 'not_sure', label: 'Not sure', detail: 'Unsure of past records', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_last_cervical_screen',
    category: 'ROUTINE CHECK',
    categoryLabel: 'Routine Check',
    stepNumber: 3,
    totalSteps: 10,
    title: 'When was your last cervical screening/Pap or HPV test?',
    whyWeAsk: 'Cervical Pap smears and HPV DNA testing can prevent up to 90% of cervical cancers by detecting precancerous cells early.',
    options: [
      { id: 'within_3_years', label: 'Within the last 3 years', detail: 'Up to date with cervical wellness guidelines', type: 'doing_well' },
      { id: '3_to_5_years', label: '3 to 5 years ago', detail: 'Screening update may be due soon', type: 'worth_checking' },
      { id: 'more_than_5_years', label: 'More than 5 years ago', detail: 'Overdue for a routine 5-minute swab', type: 'discuss' },
      { id: 'never', label: 'Never had a Pap or HPV test', detail: 'A gentle first test provides invaluable lifelong protection', type: 'discuss' },
      { id: 'not_sure', label: 'Not sure of last screening date', detail: 'Easy to schedule with Iwosan', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q3_bp',
    category: 'BLOOD PRESSURE',
    categoryLabel: 'Blood Pressure',
    stepNumber: 3,
    totalSteps: 9,
    title: 'Have you had your blood pressure checked recently?',
    whyWeAsk: 'High blood pressure rarely causes symptoms early on. An annual measurement is one of the simplest and most vital ways to protect your heart, brain, and kidneys.',
    options: [
      { id: 'within_year', label: 'Within the last year', detail: 'Excellent annual baseline tracking', type: 'doing_well' },
      { id: 'never', label: 'Never', detail: 'A quick check at our booth or clinic is recommended', type: 'discuss' },
      { id: 'not_sure', label: 'Not sure', detail: 'Easy to get done at any pharmacy or clinic', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q4_sugar',
    category: 'BLOOD SUGAR',
    categoryLabel: 'Blood Sugar',
    stepNumber: 4,
    totalSteps: 9,
    title: 'Have you had your blood sugar checked recently?',
    whyWeAsk: 'Fasting glucose or HbA1c testing identifies insulin resistance and pre-diabetes early, when simple dietary and movement shifts can completely reverse the trajectory.',
    options: [
      { id: 'within_year', label: 'Within the last 6–12 months', detail: 'Regular metabolic monitoring', type: 'doing_well' },
      { id: 'longer_than_12_months', label: 'Longer than 12 months', detail: 'Metabolic checkup due for updated numbers', type: 'worth_checking' },
      { id: 'not_sure_or_never', label: 'Not Sure/Never', detail: 'Can be added during your next routine test', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q5_history',
    category: 'FAMILY HISTORY',
    categoryLabel: 'Family History',
    stepNumber: 5,
    totalSteps: 9,
    title: 'Is there a family history of diabetes, high blood pressure, or heart disease?',
    whyWeAsk: 'Knowing if immediate relatives (parents, siblings) manage cardiovascular or metabolic conditions helps clinicians suggest earlier or more tailored screening schedules.',
    options: [
      { id: 'yes_immediate', label: 'Yes (parents or siblings)', detail: 'Highlights valuable preventive conversations to have with your doctor', type: 'discuss' },
      { id: 'no_history', label: 'No known history', detail: 'Continues standard age-based screening guidelines', type: 'doing_well' },
      { id: 'not_sure', label: 'Not sure / Prefer not to say', detail: 'We respect your privacy at all times', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_nutrition_plate_colors',
    category: 'NUTRITION',
    categoryLabel: 'Nutrition',
    stepNumber: 7,
    totalSteps: 10,
    title: 'How colorful is your food plate - Carbohydrates, protein, vegetables, legumes, fats, nuts and grains.',
    whyWeAsk: 'A colorful plate full of diverse plant compounds, healthy fats, and quality proteins provides essential phytonutrients and supports gut and metabolic vitality.',
    options: [
      { id: 'always', label: 'Always', type: 'doing_well' },
      { id: 'sometimes', label: 'Sometimes/occasionally', type: 'worth_checking' },
      { id: 'rarely', label: 'Rarely', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_nutrition_animal_protein',
    category: 'NUTRITION',
    categoryLabel: 'Nutrition',
    stepNumber: 7,
    totalSteps: 10,
    title: 'How often do you take animal protein?',
    whyWeAsk: 'Balancing animal protein with wholesome plant-based proteins supports heart health, digestive rhythm, and renal wellbeing.',
    options: [
      { id: 'daily', label: 'Daily', type: 'neutral' },
      { id: '2_3_times_week', label: '2-3 times a week', type: 'doing_well' },
      { id: 'never', label: 'Never', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_nutrition_diet_type',
    category: 'NUTRITION',
    categoryLabel: 'Nutrition',
    stepNumber: 7,
    totalSteps: 10,
    title: 'What type of diet do you practice?',
    whyWeAsk: 'Nutritional patterns like Mediterranean and DASH diets are clinically proven to improve arterial elasticity and metabolic balance.',
    options: [
      { id: 'mediterranean', label: 'Mediterranean', type: 'doing_well' },
      { id: 'dash', label: 'DASH (Dietary Approaches to Stop Hypertension)', type: 'doing_well' },
      { id: 'vegan_vegetarian', label: 'Vegan/Vegetarian', type: 'doing_well' },
      { id: 'pescatarian', label: 'Pescatarian', type: 'doing_well' },
      { id: 'ketogenic', label: 'Ketogenic', type: 'neutral' },
      { id: 'low_fat', label: 'Low-fat diet', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_nutrition_fibre',
    category: 'NUTRITION',
    categoryLabel: 'Nutrition',
    stepNumber: 7,
    totalSteps: 10,
    title: 'How much fibre do you consume daily?',
    whyWeAsk: 'Aiming for 25–30g of daily dietary fibre from legumes, vegetables, and grains optimizes gut microbiome health, stabilizes blood sugar, and lowers LDL cholesterol.',
    options: [
      { id: 'a_lot_25_30g', label: 'A lot – about 25-30g', type: 'doing_well' },
      { id: 'not_so_much_less_25g', label: 'Not so much – less than 25g', type: 'worth_checking' },
      { id: 'no_fibre', label: 'I don’t take fibre', type: 'discuss' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_nutrition_water',
    category: 'NUTRITION',
    categoryLabel: 'Nutrition',
    stepNumber: 7,
    totalSteps: 10,
    title: 'How much water do you consume daily?',
    whyWeAsk: 'Adequate hydration regulates blood pressure, boosts energy, promotes kidney function, and keeps skin and mucosal tissues supple.',
    options: [
      { id: '4_5_bottles_75cl', label: '4- 5 bottles of 75cl water', type: 'doing_well' },
      { id: '2_3_bottles_75cl', label: '2-3 bottles of 75cl water', type: 'doing_well' },
      { id: 'less_than_2_bottles_75cl', label: 'Less than 2 bottles of 75cl water', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_nutrition_cooking_oil',
    category: 'NUTRITION',
    categoryLabel: 'Nutrition',
    stepNumber: 7,
    totalSteps: 10,
    title: 'What type of oil do you cook with?',
    whyWeAsk: 'Unsaturated oils like olive, avocado, and canola protect cardiovascular arteries, whereas excess saturated fats elevate circulating LDL cholesterol.',
    options: [
      { id: 'unsaturated_fats', label: 'Unsaturated fats', type: 'doing_well' },
      { id: 'saturated_fats', label: 'Saturated fats', type: 'worth_checking' },
      { id: 'dont_know', label: 'I don’t know', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q6_activity',
    category: 'EXERCISE',
    categoryLabel: 'Exercise',
    stepNumber: 8,
    totalSteps: 10,
    title: 'How active are you in a typical week?',
    whyWeAsk: 'Regular physical activity strengthens your heart, preserves bone density, reduces hormonal anxiety, and improves insulin sensitivity across all decades.',
    options: [
      { id: 'active_150', label: 'Very active (150+ minutes of brisk movement/exercise)', detail: 'Meets and exceeds clinical cardiovascular targets', type: 'doing_well' },
      { id: 'moderate', label: 'Moderately active (60–140 minutes/week)', detail: 'Solid foundation to build upon with small daily walks', type: 'doing_well' },
      { id: 'light', label: 'Light movement (some walking/household activity)', detail: 'Adding short 10-minute movement breaks brings big benefits', type: 'worth_checking' },
      { id: 'sedentary', label: 'Mostly sedentary (desk work, minimal movement)', detail: 'Gentle, enjoyable movement routines can make a world of difference', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q8_sleep',
    category: 'SLEEP AND REST',
    categoryLabel: 'Sleep and Rest',
    stepNumber: 8,
    totalSteps: 9,
    title: 'How is your sleep on most nights?',
    whyWeAsk: 'Deep sleep allows cellular repair, hormone balance (growth hormone, estrogen, cortisol), and mental recharge. Chronic disrupted sleep impacts heart health and glucose regulation.',
    options: [
      { id: 'restful', label: 'Restful & restorative (7–9 hours)', detail: 'Optimal recovery and hormonal rhythm', type: 'doing_well' },
      { id: 'interrupted', label: 'Frequently interrupted or restless', detail: 'Worth exploring wind-down routines or checking room temperature', type: 'worth_checking' },
      { id: 'short', label: 'Less than 6 hours regularly', detail: 'Sleep deficit can subtly elevate stress hormones and appetite', type: 'worth_checking' },
      { id: 'irregular', label: 'Irregular sleep schedules / Insomnia', detail: 'A healthcare professional can offer supportive sleep hygiene advice', type: 'discuss' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_toxic_substances',
    category: 'AVOIDANCE OF TOXIC SUBSTANCES',
    categoryLabel: 'Avoidance of Toxic Substances',
    stepNumber: 9,
    totalSteps: 10,
    title: 'Do you smoke?',
    whyWeAsk: 'Avoiding tobacco, vaping, and shisha protects cardiovascular endothelium, preserves lung function, and significantly reduces cancer risks.',
    options: [
      { id: 'vape_shisha', label: 'Yes – I vape and do shisha', type: 'worth_checking' },
      { id: 'cigarettes_daily', label: 'Yes – 1-2 packets of cigarettes daily', type: 'discuss' },
      { id: 'no_smoke', label: 'No, I don’t', type: 'doing_well' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_alcohol',
    category: 'AVOIDANCE OF TOXIC SUBSTANCES',
    categoryLabel: 'Avoidance of Toxic Substances',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Do you drink alcohol?',
    whyWeAsk: 'Understanding your alcohol habits helps provide clear insights on liver recovery, restful sleep, and cardiovascular wellbeing.',
    options: [
      { id: 'social_drinker', label: 'Yes – social drinker', type: 'doing_well' },
      { id: 'one_a_day', label: 'Yes – 1 drink a day', type: 'worth_checking' },
      { id: 'more_than_two_a_day', label: 'Yes – more than 2 drinks a day', type: 'discuss' },
      { id: 'no', label: 'No', type: 'doing_well' },
    ],
    skipText: 'Skip this question',
  },
];

export const PERIMENOPAUSE_40_49_QUESTIONS: Question[] = [
  {
    id: 'q40_hot_flushes',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 10,
    totalSteps: 20,
    title: 'Have you experienced hot flushes?',
    whyWeAsk: 'Hot flushes are sudden surges of intense heat, facial reddening, and perspiration caused by neuro-hormonal thermoregulatory resetting in the brain.',
    options: [
      { id: 'yes_frequent', label: 'Yes, frequently or intensely', detail: 'Sudden waves of warmth and perspiration', type: 'discuss' },
      { id: 'mild_occasional', label: 'Occasionally or mild', detail: 'Infrequent, manageable temperature surges', type: 'worth_checking' },
      { id: 'no_none', label: 'No, never experienced them', detail: 'No vasomotor symptoms at present', type: 'doing_well' },
      { id: 'not_sure', label: 'Not sure', detail: 'Unsure if symptoms are hormonal', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q40_sleep_changed',
    category: 'SLEEP AND REST',
    categoryLabel: 'Sleep and Rest',
    stepNumber: 11,
    totalSteps: 20,
    title: 'Has your sleep changed?',
    whyWeAsk: 'Progesterone promotes natural relaxation. Declining progesterone in your 40s often causes early morning waking (2 AM – 4 AM) or difficulty falling asleep.',
    options: [
      { id: 'yes_poor', label: 'Yes, waking frequently or difficulty falling asleep', detail: 'Noticeable shift in sleep continuity and depth', type: 'worth_checking' },
      { id: 'lighter_sleep', label: 'Sleep feels lighter or less refreshed', detail: 'Waking with lower morning energy', type: 'worth_checking' },
      { id: 'no_good_sleep', label: 'No, sleeping soundly and deeply', detail: '7–8 hours of restorative rest', type: 'doing_well' },
      { id: 'irregular_sleep', label: 'Irregular sleep patterns', detail: 'Varies substantially from night to night', type: 'discuss' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q40_sexual_desire',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 14,
    totalSteps: 20,
    title: 'Has your sexual desire changed?',
    whyWeAsk: 'Hormonal adjustments (estrogen and free testosterone) combined with sleep disruption can alter intimacy desire. Clinicians offer gentle, supportive solutions.',
    options: [
      { id: 'yes_reduced', label: 'Yes, noticeable drop in libido or desire', detail: 'Common biological change during midlife transition', type: 'discuss' },
      { id: 'fluctuating', label: 'Fluctuating or slight changes', detail: 'Desire varies across different months', type: 'worth_checking' },
      { id: 'no_unchanged', label: 'No noticeable change', detail: 'Desire remains consistent', type: 'doing_well' },
      { id: 'prefer_not', label: 'Prefer not to answer', detail: 'Respecting your personal privacy', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q40_urinary_leakage',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 15,
    totalSteps: 20,
    title: 'Have you experienced urinary leakage or recurrent UTIs?',
    whyWeAsk: 'Lower estrogen thins urethral tissues, and pelvic floor tone can shift. Pelvic physiotherapy and localized medical care effectively restore control.',
    options: [
      { id: 'yes_leakage_uti', label: 'Yes, leakage with cough/exercise or recurrent UTIs', detail: 'Pelvic floor therapy & medical care can resolve this', type: 'discuss' },
      { id: 'occasional_urgency', label: 'Occasional urgency or slight leaks', detail: 'Mild pelvic floor tone changes', type: 'worth_checking' },
      { id: 'no_symptoms', label: 'No urinary symptoms', detail: 'Strong bladder control and pelvic tone', type: 'doing_well' },
      { id: 'not_sure', label: 'Not sure', detail: 'Unsure of cause', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
];

export const MENSTRUAL_20_49_QUESTIONS: Question[] = [
  {
    id: 'q2049_period_changes_2yr',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Have your periods changed significantly in the last two years?',
    whyWeAsk: 'Recent changes in heaviness, cycle length, or cramping can signal hormonal shifts, developing fibroids, or thyroid adaptation.',
    options: [
      { id: 'unchanged', label: 'No, periods remain consistent', detail: 'Stable cycle pattern', type: 'doing_well' },
      { id: 'heavier_more_painful', label: 'Yes, became noticeably heavier or more painful', detail: 'Ultrasound check for fibroids recommended', type: 'discuss' },
      { id: 'lighter_less_frequent', label: 'Yes, became lighter or less frequent', detail: 'Hormonal or ovarian transition sign', type: 'worth_checking' },
      { id: 'irregular_timing', label: 'Yes, cycle timing has become unpredictable', detail: 'Baseline hormone review recommended', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
];

export const PREGNANCY_20_50_QUESTIONS: Question[] = [
  {
    id: 'q2050_fibroids_endo_pcos',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Have you ever been diagnosed with fibroids, endometriosis or PMOS?',
    whyWeAsk: 'Fibroids, endometriosis, and PMOS are prevalent in women of African descent; personalized therapies preserve fertility and comfort.',
    options: [
      { id: 'none', label: 'No, none diagnosed', detail: 'No known gynaecological conditions', type: 'doing_well' },
      { id: 'fibroids', label: 'Yes, Uterine Fibroids', detail: 'Benign growths; ultrasound monitoring advised', type: 'worth_checking' },
      { id: 'endometriosis', label: 'Yes, Endometriosis', detail: 'Targeted pain management and specialist surgical care', type: 'discuss' },
      { id: 'pcos', label: 'Yes, Polyendocrine Metabolic Ovarian Syndrome (PMOS)', detail: 'Metabolic and hormonal support strategies', type: 'discuss' },
      { id: 'multiple', label: 'Yes, more than one of these conditions', detail: 'Comprehensive gynaecological management advised', type: 'discuss' },
      { id: 'not_sure', label: 'Not sure / Unsure of diagnosis', detail: 'A pelvic check can provide clarity', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
];

export const BREAST_GYNAE_QUESTIONS: Question[] = [
  {
    id: 'q_breast_self_check',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Do you regularly check or notice changes in your breasts?',
    whyWeAsk: 'Monthly breast self-awareness allows you to notice subtle changes in tissue feel or skin texture early.',
    options: [
      { id: 'yes_monthly', label: 'Yes, regularly (monthly self-check)', detail: 'Excellent proactive breast awareness habit', type: 'doing_well' },
      { id: 'occasionally', label: 'Occasionally or when I remember', detail: 'Helpful start; consistent monthly timing is ideal', type: 'worth_checking' },
      { id: 'rarely_never', label: 'Rarely or never', detail: 'Our clinician guide explains how to do a 2-minute check', type: 'worth_checking' },
      { id: 'not_sure_how', label: 'Not sure what to look or feel for', detail: 'Explore our Breast Health guide in one tap', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_last_mammogram',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'When was your last mammogram/breast imaging?',
    whyWeAsk: 'Screening mammograms begin at age 40 (earlier with family risk) and catch microscopic breast changes years before a lump forms.',
    options: [
      { id: 'within_1_to_2_years', label: 'Within the last 1–2 years', detail: 'Up to date with breast imaging', type: 'doing_well' },
      { id: 'over_2_years', label: 'More than 2 years ago', detail: 'A routine screening mammogram is due', type: 'worth_checking' },
      { id: 'never_under_40', label: 'Never had one (under 40 years old)', detail: 'Standard guidelines entry at age 40 unless high risk', type: 'neutral' },
      { id: 'never_over_40', label: 'Never had one (40 or older)', detail: 'Recommended to schedule your baseline mammogram', type: 'discuss' },
      { id: 'had_ultrasound_only', label: 'Had breast ultrasound only', detail: 'Great dense-tissue screening', type: 'doing_well' },
    ],
    skipText: 'Skip this question',
  },
];

export const GENERAL_WOMENS_HEALTH_ALL_AGES_QUESTIONS: Question[] = [
  {
    id: 'q_cycle_days',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'How many days is your usual cycle?',
    whyWeAsk: 'A menstrual cycle is measured from day one of a period to day one of the next. Typical cycles range from 21 to 35 days.',
    options: [
      { id: '21_to_35_days', label: '21–35 days (Regular)', detail: 'Normal healthy cycle duration', type: 'doing_well' },
      { id: 'less_than_21_days', label: 'Fewer than 21 days (Short / Frequent)', detail: 'Frequent periods worth discussing with a doctor', type: 'worth_checking' },
      { id: 'more_than_35_days', label: 'More than 35 days (Long / Infrequent)', detail: 'Extended cycle may indicate delayed ovulation', type: 'worth_checking' },
      { id: 'irregular_no_cycle', label: 'Irregular / No periods (Menopause or variable)', detail: 'Unpredictable timing or postmenopausal stage', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_severe_period_pain',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Do you experience severe period pain?',
    whyWeAsk: 'Significant menstrual cramping (dysmenorrhea) can be associated with endometriosis, adenomyosis, or fibroids, and effective relief is available.',
    options: [
      { id: 'no_mild', label: 'No, or mild manageable cramping', detail: 'Comfortable menstrual cycle', type: 'doing_well' },
      { id: 'moderate', label: 'Moderate pain relieved by over-the-counter medication', detail: 'Manageable with pain relief', type: 'worth_checking' },
      { id: 'severe_disabling', label: 'Severe pain requiring bed rest or strong medication', detail: 'Specialist gynaecological evaluation strongly advised', type: 'discuss' },
      { id: 'not_applicable', label: 'Not applicable (no periods / postmenopausal)', detail: 'Not currently menstruating', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_bleeding_between_periods',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Do you bleed between periods?',
    whyWeAsk: 'Bleeding between expected periods or after intercourse warrants assessment for cervical changes, polyps, or hormonal variations.',
    options: [
      { id: 'never', label: 'No, never', detail: 'No intermenstrual bleeding', type: 'doing_well' },
      { id: 'rare_spotting', label: 'Rarely / Light spotting around ovulation only', detail: 'Benign mid-cycle hormonal spotting', type: 'doing_well' },
      { id: 'frequently', label: 'Yes, frequent spotting between periods', detail: 'Pelvic and cervical examination recommended', type: 'discuss' },
      { id: 'after_sex_postmenopausal', label: 'Yes, after intercourse or postmenopausal bleeding', detail: 'Prompt clinical evaluation advised', type: 'discuss' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_pain_sexual_intercourse',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Do you experience pain during sexual intercourse?',
    whyWeAsk: 'Discomfort during intercourse can arise from vaginal dryness, pelvic floor muscle tightness, fibroids, or endometriosis. Compassionate medical support helps restore comfort.',
    options: [
      { id: 'never', label: 'No, never', detail: 'Comfortable intimacy', type: 'doing_well' },
      { id: 'occasional_dryness', label: 'Occasionally, mainly due to dryness', detail: 'Moisturizers or hormonal therapies can help', type: 'worth_checking' },
      { id: 'frequent_deep_pain', label: 'Yes, frequently or deep pelvic pain', detail: 'Doctor review recommended for pelvic floor or tissue evaluation', type: 'discuss' },
      { id: 'prefer_not', label: 'Prefer not to say / Not active', detail: 'Respecting your personal privacy', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_periods_interfere_activities',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Do your periods interfere with your work or normal activities?',
    whyWeAsk: 'Menstruation should not cause missed work days or prevent you from engaging in daily life. Severe disruption warrants clinical review.',
    options: [
      { id: 'never', label: 'No, never interferes with my schedule', detail: 'Normal daily functioning during periods', type: 'doing_well' },
      { id: 'rarely', label: 'Occasionally, but manageable with mild adjustments', detail: 'Minor manageable impact', type: 'doing_well' },
      { id: 'often_miss_work', label: 'Yes, frequently miss work or stay in bed 1–2 days', detail: 'Significant impact; clinical management available', type: 'discuss' },
      { id: 'not_applicable', label: 'Not applicable (no longer menstruating)', detail: 'Not currently menstruating', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_difficulty_getting_pregnant',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Have you ever experienced difficulty getting pregnant?',
    whyWeAsk: 'Understanding your fertility journey helps tailor screenings for ovulation health, tubal wellness, and uterine health.',
    options: [
      { id: 'never_tried', label: 'Never tried / Not planning to conceive', detail: 'Not currently seeking pregnancy', type: 'neutral' },
      { id: 'conceived_easily', label: 'No difficulty / Conceived without delay', detail: 'Smooth reproductive history', type: 'doing_well' },
      { id: 'mild_delay', label: 'Took over 6–12 months of trying', detail: 'Mild delay; routine fertility advice helpful', type: 'worth_checking' },
      { id: 'significant_difficulty', label: 'Yes, experienced long-term difficulty or sought fertility care', detail: 'Specialist fertility guidance available at Iwosan', type: 'discuss' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_weight_perception',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Will you consider yourself to be of Normal weight, Overweight or Obese?',
    whyWeAsk: 'Body weight and adipose distribution influence metabolic markers, cardiovascular health, and estrogen balance.',
    options: [
      { id: 'normal_weight', label: 'Normal / Healthy weight', detail: 'Balanced metabolic baseline', type: 'doing_well' },
      { id: 'slightly_overweight', label: 'Slightly overweight', detail: 'Gentle lifestyle tweaks can optimize metabolic ease', type: 'worth_checking' },
      { id: 'obese', label: 'Obese / Significantly above healthy weight', detail: 'Medical lifestyle and metabolic review recommended', type: 'discuss' },
      { id: 'underweight', label: 'Underweight', detail: 'Nutritional and bone density support advised', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_chin_hair',
    category: 'GENERAL WOMENS HEALTH',
    categoryLabel: "General Women's Health",
    stepNumber: 0,
    totalSteps: 0,
    title: 'Do you have hair growing under your chin?',
    whyWeAsk: 'Excess or coarse facial hair (hirsutism) can be an indicator of androgen sensitivity or Polyendocrine Metabolic Ovarian Syndrome (PMOS).',
    options: [
      { id: 'none', label: 'No, none at all', detail: 'No excess facial hair', type: 'doing_well' },
      { id: 'few_strands', label: 'A few stray fine hairs (occasional plucking)', detail: 'Normal common variation', type: 'doing_well' },
      { id: 'noticeable_coarse', label: 'Yes, noticeable coarse dark hair growth', detail: 'Hormonal and androgen screening recommended', type: 'worth_checking' },
      { id: 'frequent_spreading', label: 'Yes, significant thick hair needing frequent shaving/removal', detail: 'Clinical evaluation for PMOS / hormone balance advised', type: 'discuss' },
    ],
    skipText: 'Skip this question',
  },
];

export const BONE_MOBILITY_QUESTIONS: Question[] = [
  {
    id: 'q_bone_density_test',
    category: 'EXERCISE',
    categoryLabel: 'Exercise',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Have you ever had a bone density test?',
    whyWeAsk: 'DEXA scans are non-invasive 10-minute scans that measure bone mineral density in your spine and hips to prevent future fractures.',
    options: [
      { id: 'yes_normal', label: 'Yes, within the last 2–3 years (Normal result)', detail: 'Up to date with bone assessment', type: 'doing_well' },
      { id: 'yes_low_density', label: 'Yes, diagnosed with osteopenia or osteoporosis', detail: 'Bone protective treatment & calcium/D3 advised', type: 'discuss' },
      { id: 'never_had_one', label: 'Never had a bone density test', detail: 'Recommended at menopause transition or age 50+', type: 'worth_checking' },
      { id: 'not_sure', label: 'Not sure what this test is', detail: 'Explore our bone health guidelines in one tap', type: 'neutral' },
    ],
    skipText: 'Skip this question',
  },
  {
    id: 'q_strength_exercise',
    category: 'EXERCISE',
    categoryLabel: 'Exercise',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Do you do regular strength or cardio exercise?',
    whyWeAsk: 'Lifting weights, resistance bands, or bodyweight exercises (squats, push-ups) 2–3 times a week stimulates bone growth and protects metabolism.',
    options: [
      { id: 'regular_2_plus', label: 'Yes, 2 or more times per week', detail: 'Meets WHO bone & muscle strengthening targets', type: 'doing_well' },
      { id: 'occasionally', label: 'Occasionally / Once a week', detail: 'Solid start; increasing to 2–3 days adds big benefits', type: 'worth_checking' },
      { id: 'cardio_only', label: 'Walk or cardio only, no strength training', detail: 'Adding resistance training protects bone mass', type: 'worth_checking' },
      { id: 'none', label: 'No regular exercise currently', detail: 'Starting with simple bodyweight movements is great', type: 'worth_checking' },
    ],
    skipText: 'Skip this question',
  },
];

const SOCIAL_RESPONSE_OPTIONS: QuestionOption[] = [
  { id: 'always', label: 'Always', type: 'doing_well' },
  { id: 'sometimes', label: 'Sometimes', type: 'worth_checking' },
  { id: 'never', label: 'Never', type: 'discuss' },
];

export const SOCIAL_CONNECTEDNESS_QUESTIONS: Question[] = [
  {
    id: 'q_social_loved',
    category: 'SOCIAL CONNECTEDNESS AND RELATIONSHIP',
    categoryLabel: 'Social Connectedness and Relationship',
    stepNumber: 0,
    totalSteps: 0,
    title: 'I feel loved',
    whyWeAsk: 'Feeling emotionally supported and cherished is strongly linked to lower cardiovascular stress and greater emotional resilience.',
    options: SOCIAL_RESPONSE_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'q_social_family_support',
    category: 'SOCIAL CONNECTEDNESS AND RELATIONSHIP',
    categoryLabel: 'Social Connectedness and Relationship',
    stepNumber: 0,
    totalSteps: 0,
    title: 'I have good family support',
    whyWeAsk: 'A supportive family environment provides a foundational emotional anchor through life transitions and challenges.',
    options: SOCIAL_RESPONSE_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'q_social_friends',
    category: 'SOCIAL CONNECTEDNESS AND RELATIONSHIP',
    categoryLabel: 'Social Connectedness and Relationship',
    stepNumber: 0,
    totalSteps: 0,
    title: 'I have good friends around me who wish me well',
    whyWeAsk: 'Authentic friendships and positive community connections promote long-term cognitive and emotional health.',
    options: SOCIAL_RESPONSE_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'q_social_work_environment',
    category: 'SOCIAL CONNECTEDNESS AND RELATIONSHIP',
    categoryLabel: 'Social Connectedness and Relationship',
    stepNumber: 0,
    totalSteps: 0,
    title: 'My office environment and culture are hospitable and conducive',
    whyWeAsk: 'Workplace culture and psychological safety directly influence chronic stress levels, sleep quality, and daily vitality.',
    options: SOCIAL_RESPONSE_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'q_social_team_work',
    category: 'SOCIAL CONNECTEDNESS AND RELATIONSHIP',
    categoryLabel: 'Social Connectedness and Relationship',
    stepNumber: 0,
    totalSteps: 0,
    title: 'I love working with my team',
    whyWeAsk: 'Collaborative, respectful team dynamics reduce occupational burnout and enhance daytime satisfaction.',
    options: SOCIAL_RESPONSE_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'q_social_socializing',
    category: 'SOCIAL CONNECTEDNESS AND RELATIONSHIP',
    categoryLabel: 'Social Connectedness and Relationship',
    stepNumber: 0,
    totalSteps: 0,
    title: 'I love socializing',
    whyWeAsk: 'Social engagement stimulates endorphins, neuroplasticity, and a sense of shared belonging.',
    options: SOCIAL_RESPONSE_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'q_social_positive_energy',
    category: 'SOCIAL CONNECTEDNESS AND RELATIONSHIP',
    categoryLabel: 'Social Connectedness and Relationship',
    stepNumber: 0,
    totalSteps: 0,
    title: 'I have positive energy and I love positive vibes',
    whyWeAsk: 'Cultivating optimism and positive emotional energy supports immune function, hormonal balance, and vitality.',
    options: SOCIAL_RESPONSE_OPTIONS,
    skipText: 'Skip this question',
  },
];

const PHQ9_OPTIONS: QuestionOption[] = [
  { id: 'not_at_all', label: 'Not at all', type: 'doing_well' },
  { id: 'several_days', label: 'Several days', type: 'worth_checking' },
  { id: 'more_than_half', label: 'More than half the days', type: 'discuss' },
  { id: 'nearly_every_day', label: 'Nearly every day', type: 'discuss' },
];

const PHQ9_SAFETY_OPTIONS: QuestionOption[] = [
  { id: 'not_at_all', label: 'Not at all', type: 'doing_well' },
  { id: 'several_days', label: 'Several days', type: 'discuss' },
  { id: 'more_than_half', label: 'More than half the days', type: 'discuss' },
  { id: 'nearly_every_day', label: 'Nearly every day', type: 'discuss' },
];

export const MENTAL_HEALTH_QUESTIONS: Question[] = [
  {
    id: 'phq1_interest',
    category: 'MENTAL HEALTH AND MINDFULNESS',
    categoryLabel: 'Mental health and Mindfulness',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Little interest or pleasure in doing things?',
    whyWeAsk: 'Losing interest or pleasure in daily activities (anhedonia) is a core biological indicator of emotional burnout or mood shifts that responds well to gentle support.',
    options: PHQ9_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'phq2_depressed',
    category: 'MENTAL HEALTH AND MINDFULNESS',
    categoryLabel: 'Mental health and Mindfulness',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Feeling down, depressed or hopeless?',
    whyWeAsk: 'Persistent sadness or feeling low affects vitality, cardiovascular rhythm, and immunity. Checking in provides compassionate baseline awareness.',
    options: PHQ9_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'phq3_sleep',
    category: 'MENTAL HEALTH AND MINDFULNESS',
    categoryLabel: 'Mental health and Mindfulness',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Trouble falling or staying asleep, or sleeping too much?',
    whyWeAsk: 'Sleep patterns and emotional regulation share neurochemical pathways. Disrupted sleep can reflect underlying nervous system strain.',
    options: PHQ9_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'phq4_tired',
    category: 'MENTAL HEALTH AND MINDFULNESS',
    categoryLabel: 'Mental health and Mindfulness',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Feeling tired or having little energy?',
    whyWeAsk: 'Chronic fatigue can stem from emotional exhaustion, hormonal transitions, or nutrient depletion. Recognizing low energy is the first step toward replenishment.',
    options: PHQ9_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'phq5_appetite',
    category: 'MENTAL HEALTH AND MINDFULNESS',
    categoryLabel: 'Mental health and Mindfulness',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Poor appetite or overeating?',
    whyWeAsk: 'Appetite shifts frequently accompany stress and mood fluctuations due to brain-gut signalling changes.',
    options: PHQ9_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'phq6_self_worth',
    category: 'MENTAL HEALTH AND MINDFULNESS',
    categoryLabel: 'Mental health and Mindfulness',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Feeling bad about yourself, or that you have let others down?',
    whyWeAsk: 'Excessive guilt or feelings of inadequacy often arise during burnout or depression, particularly among women carrying heavy responsibilities.',
    options: PHQ9_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'phq7_concentration',
    category: 'MENTAL HEALTH AND MINDFULNESS',
    categoryLabel: 'Mental health and Mindfulness',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Trouble concentrating on reading or work tasks?',
    whyWeAsk: 'Cognitive fatigue and difficulty focusing are very common when the mind is carrying elevated stress or low mood.',
    options: PHQ9_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'phq8_psychomotor',
    category: 'MENTAL HEALTH AND MINDFULNESS',
    categoryLabel: 'Mental health and Mindfulness',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Moving or speaking slowly, or being fidgety and restless?',
    whyWeAsk: 'Psychomotor changes (slowing down or agitation) reflect how emotional strain directly translates into physical nervous system rhythms.',
    options: PHQ9_OPTIONS,
    skipText: 'Skip this question',
  },
  {
    id: 'phq9_self_harm',
    category: 'MENTAL HEALTH AND MINDFULNESS',
    categoryLabel: 'Mental health and Mindfulness',
    stepNumber: 0,
    totalSteps: 0,
    title: 'Thoughts that you would be better off dead, or hurting yourself?',
    whyWeAsk: 'Your safety, life, and emotional wellbeing matter deeply. If you are experiencing dark thoughts, immediate compassionate, confidential support is available right now.',
    isSafetyQuestion: true,
    options: PHQ9_SAFETY_OPTIONS,
    skipText: 'Skip this question',
  },
];

export const MENTAL_EMOTIONAL_QUESTIONS: Question[] = MENTAL_HEALTH_QUESTIONS;

export const CATEGORY_ORDER: QuestionCategory[] = [
  'OCCUPATION',
  'AGE',
  'ROUTINE CHECK',
  'BLOOD PRESSURE',
  'BLOOD SUGAR',
  'FAMILY HISTORY',
  'GENERAL WOMENS HEALTH',
  'NUTRITION',
  'EXERCISE',
  'SLEEP AND REST',
  'SOCIAL CONNECTEDNESS AND RELATIONSHIP',
  'MENTAL HEALTH AND MINDFULNESS',
  'AVOIDANCE OF TOXIC SUBSTANCES',
];

const QUESTION_ORDER_WITHIN_CATEGORY: Record<string, number> = {
  // Preserved categories
  q0_occupation: 1,
  q1_age: 1,
  q2_checkup: 1,
  q_last_cervical_screen: 2,
  q3_bp: 1,
  q4_sugar: 1,
  q5_history: 1,

  // General Women's Health
  q2049_period_changes_2yr: 1,
  q_cycle_days: 2,
  q_severe_period_pain: 3,
  q_bleeding_between_periods: 4,
  q_periods_interfere_activities: 5,
  q_pain_sexual_intercourse: 6,
  q2050_fibroids_endo_pcos: 7,
  q_difficulty_getting_pregnant: 8,
  q_chin_hair: 9,
  q_weight_perception: 10,
  q_breast_self_check: 11,
  q40_urinary_leakage: 12,
  q40_hot_flushes: 13,
  q40_sexual_desire: 14,
  q_last_mammogram: 15,

  // Nutrition
  q_nutrition_plate_colors: 1,
  q_nutrition_animal_protein: 2,
  q_nutrition_diet_type: 3,
  q_nutrition_fibre: 4,
  q_nutrition_water: 5,
  q_nutrition_cooking_oil: 6,

  // Exercise
  q6_activity: 1,
  q_strength_exercise: 2,
  q_bone_density_test: 3,

  // Sleep and Rest
  q8_sleep: 1,
  q40_sleep_changed: 2,

  // Social Connectedness and Relationship
  q_social_loved: 1,
  q_social_family_support: 2,
  q_social_friends: 3,
  q_social_work_environment: 4,
  q_social_team_work: 5,
  q_social_socializing: 6,
  q_social_positive_energy: 7,

  // Mental health and Mindfulness
  phq1_interest: 1,
  phq2_depressed: 2,
  phq3_sleep: 3,
  phq4_tired: 4,
  phq5_appetite: 5,
  phq6_self_worth: 6,
  phq7_concentration: 7,
  phq8_psychomotor: 8,
  phq9_self_harm: 9,

  // Avoidance of Toxic Substances
  q_toxic_substances: 1,
  q_alcohol: 2,
};

export function getHealthQuestions(answers?: Record<string, string>): Question[] {
  const age = answers?.['q1_age'] || '18_29';

  const rawQuestions: Question[] = [...CORE_HEALTH_QUESTIONS];

  const is18to49 = ['18_29', '20_29', '30_39', '40_49'].includes(age || '');
  const is40Plus = ['40_49', '50_plus', '50_59', '60_plus'].includes(age || '');
  const is18to50Plus = ['18_29', '20_29', '30_39', '40_49', '50_plus', '50_59', '60_plus'].includes(age || '');

  // General Women's Health (All Age Ranges)
  rawQuestions.push(...GENERAL_WOMENS_HEALTH_ALL_AGES_QUESTIONS);

  // 1. Menstrual Health (18–49)
  if (is18to49) {
    rawQuestions.push(...MENSTRUAL_20_49_QUESTIONS);
  }

  // 2. Reproductive & Pregnancy Health (18–49)
  if (is18to49) {
    rawQuestions.push(...PREGNANCY_20_50_QUESTIONS);
  }

  // 3. Midlife & Perimenopause (40+)
  if (is40Plus) {
    rawQuestions.push(...PERIMENOPAUSE_40_49_QUESTIONS);
  }

  // 4. Breast & Gynaecological Health (40–49 and 50+ for mammogram; self-check for all)
  if (is18to50Plus) {
    const breastQuestions = is40Plus
      ? BREAST_GYNAE_QUESTIONS
      : BREAST_GYNAE_QUESTIONS.filter((q) => q.id !== 'q_last_mammogram');
    rawQuestions.push(...breastQuestions);
  }

  // 5. Bone, Muscle & Mobility (18–50+)
  if (is18to50Plus) {
    rawQuestions.push(...BONE_MOBILITY_QUESTIONS);
  }

  // 6. Social Connectedness & Relationship (18–50+)
  if (is18to50Plus) {
    rawQuestions.push(...SOCIAL_CONNECTEDNESS_QUESTIONS);
  }

  // 7. Mental & Emotional Health (18–50+)
  if (is18to50Plus) {
    rawQuestions.push(...MENTAL_HEALTH_QUESTIONS);
  }

  // Strict Category Sequence:
  // Preserved categories first in order: Occupation & Work, Age Band, Routine Check, Blood Pressure, Blood Sugar, Family History.
  // Followed by lifestyle categories: Nutrition -> Exercise -> Sleep and Rest -> Social Connectedness and Relationship -> Mental health and Mindfulness -> Avoidance of Toxic Substances.
  // Questions in one category are completely answered before questions in the next category follow.
  const categoryOrderMap = new Map(CATEGORY_ORDER.map((cat, idx) => [cat, idx]));

  const sortedQuestions = [...rawQuestions].sort((a, b) => {
    const orderA = categoryOrderMap.get(a.category) ?? 999;
    const orderB = categoryOrderMap.get(b.category) ?? 999;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    const prioA = QUESTION_ORDER_WITHIN_CATEGORY[a.id] ?? 50;
    const prioB = QUESTION_ORDER_WITHIN_CATEGORY[b.id] ?? 50;
    return prioA - prioB;
  });

  const total = sortedQuestions.length;
  return sortedQuestions.map((q, idx) => ({
    ...q,
    stepNumber: idx + 1,
    totalSteps: total,
  }));
}

export const HEALTH_QUESTIONS = getHealthQuestions();
