import { Article } from '../types';

export const CLINICAL_ARTICLES: Article[] = [
  // ================= WOMEN'S HEALTH HUB =================
  {
    id: 'breast-health',
    hub: 'womens',
    category: 'Breast Health',
    title: 'Breast Self-Awareness & Screening Timelines',
    summary: 'Understanding normal breast tissue changes, monthly self-awareness techniques, and when mammograms are recommended.',
    readTime: '3 min read',
    reviewerName: 'Dr. Ayotunde Peters',
    reviewerRole: 'Consultant Obstetrician & Gynaecologist, FWACS',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed: January 2026',
    content: [
      'Breast health awareness is about understanding what is normal for your unique body. Monthly self-checks are best done a few days after your menstrual period ends, when breast tissue is least tender.',
      'Look for subtle visual changes in the mirror (dimpling, skin texture changes, inverted nipples, or unexpected discharge) and gently palpate in circular motions across all four quadrants extending toward the underarm lymph nodes.',
      'Routine screening mammography generally begins at age 40 for women with average risk, repeated every 1 to 2 years. Women with a first-degree family history (mother, sister) should speak with their clinician about beginning screening earlier.',
      'Most breast lumps turn out to be benign cysts or hormonal fibroadenomas, but any new, persistent, or painless firm mass warrants a prompt clinical breast evaluation and ultrasound.'
    ],
    keyTakeaways: [
      'Perform self-awareness checks once a month after your period.',
      'Annual or biennial mammograms are recommended starting at age 40 (or earlier with family history).',
      'Promptly discuss any new skin puckering, nipple changes, or palpable lumps with a clinician.',
      'Over 85% of breast lumps examined clinically are completely benign.'
    ],
    relatedTopic: 'Mammogram & Clinical Breast Exam',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'menstrual-health',
    hub: 'womens',
    category: 'Menstrual',
    title: 'Menstrual Wellbeing, Fibroids & Cycle Balance',
    summary: 'Navigating period changes, understanding uterine fibroid symptoms common in African women, and addressing heavy cycles.',
    readTime: '4 min read',
    reviewerName: 'Dr. Ngozi Adeleke',
    reviewerRole: 'Consultant Gynaecologist & Minimally Invasive Surgeon',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Ikoyi',
    reviewDate: 'Reviewed: February 2026',
    content: [
      'A healthy menstrual cycle typically ranges between 21 and 35 days. While mild cramping is common due to prostaglandins, debilitating pain that forces you to miss work or bed rest is not something you have to endure in silence.',
      'Uterine fibroids are non-cancerous muscular growths in the uterus that are notably prevalent in women of African descent. Many women carry fibroids without symptoms, while others experience heavy bleeding (menorrhagia), pelvic fullness, or frequent urination.',
      'If you need to change pads or tampons every hour, pass clots larger than a coin, or feel chronically fatigued, you may be experiencing iron-deficiency anemia secondary to heavy menstrual flow.',
      'Modern gynaecological care offers gentle, highly effective solutions ranging from medical hormonal balancing and iron supplementation to minimally invasive laparoscopic fibroid removal (myomectomy).'
    ],
    keyTakeaways: [
      'Severe pain or periods requiring hourly pad changes warrant professional evaluation.',
      'Fibroids are extremely common and benign; modern treatments preserve fertility and comfort.',
      'Check your ferritin and hemoglobin levels if you experience heavy flow and fatigue.',
      'Keep a cycle diary or use an app to track cycle length and flow patterns.'
    ],
    relatedTopic: 'Pelvic Ultrasound & Hemoglobin Check',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'menopause-midlife',
    hub: 'womens',
    category: 'Menopause & Midlife',
    title: 'Thriving Through Perimenopause & Menopause',
    summary: 'Recognizing hormonal transitions, hot flashes, mood shifts, bone health, and nutritional strategies for vibrant midlife.',
    readTime: '4 min read',
    reviewerName: 'Dr. Funmi Oladipo',
    reviewerRole: 'Consultant Reproductive Endocrinologist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Ikeja',
    reviewDate: 'Reviewed: January 2026',
    content: [
      'Perimenopause is the natural transitional phase leading up to menopause, often beginning in a woman’s 40s. Estrogen and progesterone fluctuate, which can lead to irregular cycles, sleep disruptions, sudden temperature flashes, and brain fog.',
      'Menopause is officially reached when a woman has gone 12 consecutive months without a menstrual cycle, typically around ages 48 to 52. It marks the start of an empowering new life chapter where proactive health protection becomes paramount.',
      'Declining estrogen speeds up bone calcium loss and alters lipid profiles (increasing LDL cholesterol). Prioritizing resistance training, adequate dietary calcium, vitamin D3, and regular DEXA bone scans protects against osteoporosis and fractures.',
      'Hormone replacement therapy (HRT) and non-hormonal lifestyle options can significantly restore sleep quality and vitality. Discuss your individual benefits and considerations with your gynaecologist.'
    ],
    keyTakeaways: [
      'Perimenopause symptoms can start in your early-to-mid 40s.',
      'Strength training and weight-bearing exercises are essential for maintaining bone density.',
      'DEXA bone density scans and lipid profiles should be checked in midlife.',
      'Holistic therapies, nutrition, and modern hormone support offer personalized relief.'
    ],
    relatedTopic: 'Bone Mineral Density (DEXA) & Lipid Panel',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'reproductive-health',
    hub: 'womens',
    category: 'Reproductive',
    title: 'Reproductive Wellness & Preconception Planning',
    summary: 'Optimizing fertility, pelvic floor strength, preconception screenings, and reproductive longevity.',
    readTime: '3 min read',
    reviewerName: 'Dr. Amina Bello',
    reviewerRole: 'Consultant Obstetrician & Fertility Specialist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed: February 2026',
    content: [
      'Reproductive health encompasses physical, hormonal, and emotional vitality across your childbearing years and beyond. Whether you are actively planning a family, exploring fertility preservation, or maintaining pelvic health, proactive care is empowering.',
      'Preconception wellness checks examine rubella immunity, hepatitis B, hemoglobin genotype (HbSS/HbAS), blood type/Rh factor, thyroid function, and pelvic anatomy to ensure the smoothest pregnancy journey possible.',
      'Pelvic floor exercises (Kegels) strengthen the hammock of muscles supporting the bladder, uterus, and bowel, preventing stress urinary incontinence and improving core stability after childbirth.',
      'Taking 400 mcg of daily folic acid prior to conception significantly reduces the incidence of neural tube defects in developing infants.'
    ],
    keyTakeaways: [
      'Preconception checkups identify maternal health factors before pregnancy begins.',
      'Folic acid supplementation is vital before conception and during the first trimester.',
      'Daily pelvic floor training protects against urinary leakage and supports posture.',
      'Regular gynaecological consultations help address fertility questions early.'
    ],
    relatedTopic: 'Preconception & Pelvic Screenings',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'cervical-cancer-hpv',
    hub: 'womens',
    category: 'Cervical',
    title: 'Cervical Health: Pap Smears & HPV Prevention',
    summary: 'Why cervical cancer is nearly 100% preventable with regular screening and the human papillomavirus (HPV) vaccine.',
    readTime: '3 min read',
    reviewerName: 'Dr. Ayotunde Peters',
    reviewerRole: 'Consultant Obstetrician & Gynaecologist, FWACS',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed: January 2026',
    content: [
      'Cervical cancer is one of the very few cancers that can be almost completely prevented through routine screening and vaccination. It is caused by persistent high-risk strains of the Human Papillomavirus (HPV).',
      'A Pap smear collects gentle surface cells from the cervix to spot precancerous dysplasia years before any cancer could ever develop. An HPV co-test detects the presence of the virus itself.',
      'Screening guidelines recommend starting Pap smears at age 21 or within 3 years of sexual debut, repeated every 3 years (or every 5 years when combined with high-risk HPV testing between ages 30 and 65).',
      'The HPV vaccine is highly effective and recommended for young women and girls, though women up to age 45 can still derive meaningful protection after discussing with their clinician.'
    ],
    keyTakeaways: [
      'Cervical cancer develops very slowly over 10–15 years, making early detection lifesaving.',
      'Pap smears and HPV tests take under 3 minutes during a gentle pelvic exam.',
      'Screening is recommended every 3 to 5 years from age 21 to 65.',
      'The HPV vaccine provides powerful, long-lasting immunity.'
    ],
    relatedTopic: 'Cervical Pap Smear & HPV DNA Test',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'preventive-care-matrix',
    hub: 'womens',
    category: 'Preventive Care',
    title: 'The Woman’s Preventive Health Roadmap by Decade',
    summary: 'A clear chronological checklist of vital screenings from your 20s through your 60s and beyond.',
    readTime: '4 min read',
    reviewerName: 'Dr. Kemi Johnson',
    reviewerRole: 'Chief Medical Director & Preventive Health Specialist',
    reviewerHospital: 'Iwosan Lagoon Hospitals Group',
    reviewDate: 'Reviewed: February 2026',
    content: [
      'Preventive health is an act of self-care and empowerment. When you monitor key vitals and screening benchmarks proactively, health challenges can be managed or eliminated before they disrupt your life.',
      'In your 20s and 30s: Focus on annual blood pressure, baseline lipid and blood sugar checks, cervical Pap smears, STI prevention, and establishing healthy movement and sleep habits.',
      'In your 40s: Add baseline mammograms, regular fasting blood sugar tests, perimenopause consultations, and comprehensive eye/dental checkups.',
      'In your 50s and 60+: Introduce bone mineral density (DEXA) scans, colorectal cancer screenings (colonoscopy or stool DNA), cardiovascular stress assessments, and regular hearing/vision reviews.'
    ],
    keyTakeaways: [
      'Prevention is always gentler, faster, and more affordable than curative care.',
      'Track your personal screening calendar based on your current decade.',
      'Keep a digital or paper copy of your screening results for longitudinal comparison.',
      'Partner with a trusted primary care physician or gynaecologist for annual review.'
    ],
    relatedTopic: 'Comprehensive Annual Wellness Package',
    screenIdTarget: 'contact',
  },

  // ================= HEART, DIABETES & LIFESTYLE HUB =================
  {
    id: 'heart-health-women',
    hub: 'lifestyle',
    category: 'Heart Health',
    title: 'Women’s Heart Health & The Unspoken Signs',
    summary: 'Heart disease manifests differently in women. Learn the subtle cues, blood pressure targets, and preventive strategies.',
    readTime: '4 min read',
    reviewerName: 'Dr. Chioma Eze',
    reviewerRole: 'Consultant Cardiologist & Heart Specialist',
    reviewerHospital: 'Iwosan Lagoon Heart Center, Victoria Island',
    reviewDate: 'Reviewed: January 2026',
    content: [
      'Cardiovascular disease remains the leading health risk for women worldwide, yet women frequently delay seeking care because their symptoms differ significantly from the "classic" crushing chest pain seen in movies.',
      'Women are far more likely to experience subtle cardiovascular signals: unexplained shortness of breath during routine stairs, profound fatigue, upper back/jaw tightness, nausea, or dizziness.',
      'Ideal blood pressure for most adult women is below 120/80 mmHg. Consistently elevated readings (130/80+ mmHg) place strain on arterial walls and increase lifetime stroke and heart disease risks.',
      'A diet rich in potassium, leafy greens, reduced sodium, combined with 30 minutes of daily moderate walking, can lower systolic blood pressure by 5–10 points naturally.'
    ],
    keyTakeaways: [
      'Women may experience heart strain as breathlessness, jaw ache, or deep fatigue.',
      'Target blood pressure is under 120/80 mmHg; check yours at least once a year.',
      'Reduce processed sodium and season with herbs, garlic, ginger, and lemon.',
      'Knowing your numbers (BP, cholesterol, glucose) is the first step in heart protection.'
    ],
    relatedTopic: 'Blood Pressure & Lipid Profile Screen',
    screenIdTarget: 'numbers',
  },
  {
    id: 'nutrition-habits',
    hub: 'lifestyle',
    category: 'Nutrition',
    title: 'Nourishing Your Body: Balanced Nutrition for Vitality',
    summary: 'How wholesome, colorful plates, dietary fiber, and smart hydration balance hormones and steady energy.',
    readTime: '3 min read',
    reviewerName: 'Dr. Folake Sanni',
    reviewerRole: 'Clinical Nutritionist & Wellness Specialist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Ikoyi',
    reviewDate: 'Reviewed: February 2026',
    content: [
      'Nutritional wellness is not about extreme deprivation or short-term fad diets. It is about consistently providing your cells with dense micronutrients, colorful phytochemicals, and gut-loving dietary fiber.',
      'The "Healthy Plate Model" is a wonderful visual guide: Fill 50% of your plate with colorful vegetables and salads (ugwu, spinach, carrots, cucumber, cabbage), 25% with lean protein (fish, poultry, beans, tofu, eggs), and 25% with complex unrefined starches (ofada rice, sweet potatoes, oats, plantain).',
      'Fiber is a woman’s secret ally: it binds excess circulating estrogen in the digestive tract, slows glucose absorption, and promotes satiety.',
      'Aim for 2 to 2.5 liters of clean water daily. Staying hydrated reduces fatigue, supports kidney clearance, and minimizes false hunger signals.'
    ],
    keyTakeaways: [
      'Aim to fill half your plate with vibrant vegetables and dark greens.',
      'Prioritize complex carbohydrates with high fiber to avoid insulin spikes.',
      'Drink water consistently throughout the day before reaching for sugary sodas.',
      'Eat mindfully and slowly to allow fullness hormones (leptin) to register.'
    ],
    relatedTopic: 'Dietary Fiber & Metabolic Support',
    screenIdTarget: 'check',
  },
  {
    id: 'sleep-stress',
    hub: 'lifestyle',
    category: 'Sleep & Stress',
    title: 'Restorative Sleep & Managing Daily Cortisol',
    summary: 'The biological impact of chronic stress on women’s hormones and practical micro-habits for deep, healing sleep.',
    readTime: '3 min read',
    reviewerName: 'Dr. Tolu Olusanya',
    reviewerRole: 'Lifestyle Medicine Physician & Stress Specialist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed: January 2026',
    content: [
      'Modern women often juggle demanding careers, family responsibilities, and social obligations. When stress becomes chronic, cortisol levels stay persistently elevated, promoting belly fat storage, insomnia, and mood exhaustion.',
      'Sleep is the body’s primary nocturnal repair shop. During deep stages of REM and slow-wave sleep, the brain flushes metabolic waste, cellular repair enzymes activate, and emotional memories are processed.',
      'Create a digital sunset: turn off bright screens 45 minutes before sleep to allow your brain’s pineal gland to release natural melatonin.',
      'A 5-minute deep diaphragmatic breathing exercise (inhale 4 seconds, hold 4, exhale 6) immediately switches your nervous system from "fight or flight" into "rest and digest".'
    ],
    keyTakeaways: [
      'Aim for 7–8 hours of consistent, restful sleep each night.',
      'Practice a screen-free wind-down routine 45 minutes before bed.',
      'Use slow, extended exhales to activate your calming vagus nerve.',
      'Consistent sleep schedules regulate morning cortisol and nighttime melatonin.'
    ],
    relatedTopic: 'Sleep Hygiene & Stress Resilience',
    screenIdTarget: 'check',
  },
  {
    id: 'diabetes-prevention',
    hub: 'lifestyle',
    category: 'Diabetes',
    title: 'Understanding Blood Sugar & Reversing Pre-Diabetes',
    summary: 'What fasting blood glucose numbers mean, insulin resistance signs, and how lifestyle modifications restore metabolic health.',
    readTime: '4 min read',
    reviewerName: 'Dr. Babatunde Alabi',
    reviewerRole: 'Consultant Endocrinologist & Diabetologist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Ikeja',
    reviewDate: 'Reviewed: February 2026',
    content: [
      'Type 2 diabetes develops over years through a stage called insulin resistance. When cells become resistant to insulin, the pancreas produces more to force glucose into cells, until it eventually struggles to keep up.',
      'Pre-diabetes is a window of immense opportunity: with targeted movement and balanced meals, elevated glucose can be completely reversed back to normal.',
      'A normal fasting blood sugar level is between 70 and 99 mg/dL (3.9 to 5.5 mmol/L). Fasting readings between 100 and 125 mg/dL indicate pre-diabetes, and 126 mg/dL or higher on two separate tests indicates diabetes.',
      'Taking a brisk 10-minute walk immediately after major meals allows your skeletal muscles to absorb glucose directly from the bloodstream without requiring high insulin surges.'
    ],
    keyTakeaways: [
      'A normal fasting blood sugar is 70–99 mg/dL (3.9–5.5 mmol/L).',
      'Pre-diabetes is completely reversible with early action and lifestyle guidance.',
      'A 10-minute stroll after lunch or dinner dramatically flattens blood sugar spikes.',
      'Test your HbA1c or fasting glucose annually, especially with a family history.'
    ],
    relatedTopic: 'Fasting Blood Sugar & HbA1c Lab Check',
    screenIdTarget: 'numbers',
  },
  {
    id: 'movement-exercise',
    hub: 'lifestyle',
    category: 'Movement',
    title: 'Strength, Aerobics & Movement for Longevity',
    summary: 'Why lifting weights and daily walking are game-changers for women’s metabolic rate, bone health, and posture.',
    readTime: '3 min read',
    reviewerName: 'Dr. Chidinma Okafor',
    reviewerRole: 'Specialist in Sports & Preventive Medicine',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed: January 2026',
    content: [
      'Many women believe cardio (like running or aerobics) is the only exercise that counts. However, resistance and strength training are the true fountain of youth for female physiology.',
      'After age 30, women naturally lose 3% to 5% of lean muscle mass per decade (sarcopenia) unless they actively challenge their muscles with bodyweight exercises, resistance bands, or weights.',
      'Strength training stimulates osteoblasts to lay down new bone mineral density, protecting your hips and spine against osteoporosis.',
      'Aim for 150 minutes of moderate aerobic movement weekly (like brisk walking, swimming, or dancing) paired with 2 sessions of whole-body resistance work.'
    ],
    keyTakeaways: [
      'Include 2 sessions of strength/resistance training per week.',
      'Muscle is a metabolically active organ that burns glucose and balances hormones.',
      'Daily steps count: aim for 7,000 to 10,000 steps through simple lifestyle choices.',
      'Find activities you genuinely enjoy to build lasting, joyful movement habits.'
    ],
    relatedTopic: 'Active Lifestyle Guidance',
    screenIdTarget: 'check',
  },
  {
    id: 'healthy-micro-habits',
    hub: 'lifestyle',
    category: 'Healthy Habits',
    title: 'Daily Micro-Habits for Lifelong Women’s Vitality',
    summary: 'Small, manageable daily actions that compound into profound physical health, mental clarity, and longevity.',
    readTime: '3 min read',
    reviewerName: 'Dr. Kemi Johnson',
    reviewerRole: 'Chief Medical Director & Preventive Health Lead',
    reviewerHospital: 'Iwosan Lagoon Hospitals Group',
    reviewDate: 'Reviewed: February 2026',
    content: [
      'True health transformation is rarely built on drastic, short-lived overhauls. It is the steady accumulation of small, loving choices repeated day after day.',
      'Habit 1: Morning Hydration with sunlight exposure — Drink a large glass of water within 15 minutes of waking and step outside for 5 minutes of natural sunlight to set your circadian clock.',
      'Habit 2: Add, Don’t Just Subtract — Instead of obsessing over what you cannot eat, focus on adding one extra fist-sized portion of dark leafy greens or berries to your plate.',
      'Habit 3: Annual Checkup on your Birthday Month — Tie your annual clinical wellness visit to your birth month so you never miss a vital screening milestone.'
    ],
    keyTakeaways: [
      'Consistent micro-habits beat sporadic extreme fitness regimes.',
      'Morning natural light anchors your circadian rhythm and boosts daytime alertness.',
      'Focus on adding nourishing foods before restricting your favorite meals.',
      'Schedule routine screenings during your birth month as an annual gift to yourself.'
    ],
    relatedTopic: 'Iwosan Annual Women’s Wellness Check',
    screenIdTarget: 'contact',
  },
];
