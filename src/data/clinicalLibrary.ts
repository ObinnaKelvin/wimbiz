import { Article } from '../types';

export const CLINICAL_ARTICLES: Article[] = [
  // ================= WOMEN'S HEALTH HUB =================
  {
    id: 'breast-health',
    hub: 'womens',
    category: 'Breast health',
    categoryTag: 'Breast health',
    title: "Knowing what's normal for you",
    headline: "Knowing what's normal for you",
    summary:
      "Breast awareness is not about checking for cancer every morning. It's about knowing how your breasts normally look and feel, so that a change stands out...",
    intro:
      "Breast awareness is not about checking for cancer every morning. It's about knowing how your breasts normally look and feel, so that a change stands out...",
    readTime: '4 min read',
    image: '/assets/aistudio/image_a986066b.png',
    reviewerName: 'Dr. A. Okonjo',
    reviewerRole: 'Consultant Breast Surgeon',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed 14 August 2026',
    sections: [
      {
        number: 1,
        title: 'Start with your normal',
        content:
          'Breasts change with your cycle, your age, weight changes and pregnancy. Some lumpiness before your period is common. The useful skill is noticing what is usual for you, at the same time each month if you can — usually a few days after your period ends.',
      },
      {
        number: 2,
        title: 'Changes worth mentioning to a clinician',
        content:
          "Look out for a new lump or thickening that doesn't go away after your period, changes in size or shape of one breast, puckering or dimpling of the skin, nipple changes or discharge, or persistent pain in one area. Remember, most breast changes turn out to be harmless, but getting them checked gives clarity and reassurance.",
      },
      {
        number: 3,
        title: 'Screening is a separate conversation',
        content:
          'Routine breast screening (mammogram) is typically recommended starting around age 40 to 50 depending on individual and family risk factors. Screening looks for changes before they can be felt. Speak to your doctor about your personal timeline.',
      },
    ],
    content: [
      'Breasts change with your cycle, your age, weight changes and pregnancy. Some lumpiness before your period is common. The useful skill is noticing what is usual for you, at the same time each month if you can — usually a few days after your period ends.',
      "Look out for a new lump or thickening that doesn't go away after your period, changes in size or shape of one breast, puckering or dimpling of the skin, nipple changes or discharge, or persistent pain in one area.",
      'Routine breast screening (mammogram) is typically recommended starting around age 40 to 50 depending on individual and family risk factors.',
    ],
    keyTakeaways: [
      'Notice changes, don’t diagnose them. Book a conversation if something is new and stays.',
    ],
    takeawayMessage:
      'Notice changes, don’t diagnose them. Book a conversation if something is new and stays.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'breast-health',
        title: 'When breast screening is usually offered',
        readTime: '3 min read',
      },
      {
        id: 'preventive-care-matrix',
        title: 'What a good routine check includes',
        readTime: '4 min read',
      },
    ],
    tags: ['When breast screening is usually offered', 'Routine checkups'],
    relatedTopic: 'Mammogram & Clinical Breast Exam',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'menstrual-health',
    hub: 'womens',
    category: 'Menstrual health',
    categoryTag: 'Menstrual health',
    title: 'Cycles, pain & what is normal',
    headline: 'Cycles, pain & what is normal',
    summary:
      'Navigating period changes, understanding uterine fibroid symptoms common in African women, and addressing heavy cycles.',
    intro:
      'A menstrual cycle provides a continuous monthly report on your hormonal and metabolic wellbeing. Knowing what is typical helps you recognize when symptoms deserve gentle care.',
    readTime: '4 min read',
    image: '/assets/aistudio/image_425a2223.png',
    reviewerName: 'Dr. Ngozi Adeleke',
    reviewerRole: 'Consultant Gynaecologist & Minimally Invasive Surgeon',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Ikoyi',
    reviewDate: 'Reviewed 20 July 2026',
    sections: [
      {
        number: 1,
        title: 'What a balanced cycle looks like',
        content:
          'A healthy menstrual cycle typically ranges between 21 and 35 days, with bleeding lasting 3 to 7 days. Mild lower abdominal cramping is natural due to prostaglandins, but debilitating pain that forces you to miss work or stay in bed is not something you have to silently accept.',
      },
      {
        number: 2,
        title: 'Recognizing fibroids & heavy bleeding',
        content:
          'Uterine fibroids are non-cancerous muscular growths notably common in women of African descent. If you change pads or tampons every 1–2 hours, pass clots larger than a coin, or feel chronically fatigued, you may have fibroids or secondary iron deficiency anemia.',
      },
      {
        number: 3,
        title: 'Gentle, modern treatment options',
        content:
          'Modern gynaecological care offers gentle, highly effective solutions ranging from medical hormonal balancing and iron therapies to minimally invasive laparoscopic fibroid removal (myomectomy) that preserves fertility.',
      },
    ],
    content: [
      'A healthy menstrual cycle typically ranges between 21 and 35 days.',
      'Uterine fibroids are non-cancerous muscular growths common in women of African descent.',
      'Modern gynaecological care offers gentle, highly effective solutions.',
    ],
    keyTakeaways: [
      'Severe pain or periods requiring hourly pad changes warrant professional evaluation.',
    ],
    takeawayMessage:
      'Debilitating pain and heavy bleeding are not normal things you have to endure. Modern treatments restore comfort and energy.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'reproductive-health',
        title: 'Pelvic health & preconception planning',
        readTime: '3 min read',
      },
      {
        id: 'cervical-cancer-hpv',
        title: 'Cervical screenings & routine checks',
        readTime: '3 min read',
      },
    ],
    tags: ['Cycle tracking', 'Fibroid care', 'Iron levels'],
    relatedTopic: 'Pelvic Ultrasound & Hemoglobin Check',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'menopause-midlife',
    hub: 'womens',
    category: 'Menopause & midlife',
    categoryTag: 'Menopause & midlife',
    title: 'Changes, comfort & midlife support',
    headline: 'Changes, comfort & midlife support',
    summary:
      'Recognizing hormonal transitions, hot flashes, mood shifts, bone health, and nutritional strategies for a vibrant midlife.',
    intro:
      'Midlife and perimenopause represent a powerful transitional chapter. Understanding hormonal shifts empowers you to protect your bones, heart, and vitality.',
    readTime: '4 min read',
    image: '/assets/aistudio/image_69e6584c.png',
    reviewerName: 'Dr. Funmi Oladipo',
    reviewerRole: 'Consultant Reproductive Endocrinologist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Ikeja',
    reviewDate: 'Reviewed 18 June 2026',
    sections: [
      {
        number: 1,
        title: 'Understanding the perimenopause transition',
        content:
          'Perimenopause can begin in your early-to-mid 40s as estrogen and progesterone fluctuate. You might notice cycle irregularities, sudden warmth (hot flushes), sleep disruptions, or unexpected shifts in energy and mood.',
      },
      {
        number: 2,
        title: 'Protecting your bones and heart',
        content:
          'Declining estrogen speeds up bone calcium loss and alters lipid profiles. Introducing regular resistance exercise, dietary calcium, vitamin D3, and scheduling a DEXA bone density scan significantly protects against osteoporosis.',
      },
      {
        number: 3,
        title: 'Personalized relief & modern therapies',
        content:
          'From hormone replacement therapy (HRT) to botanical solutions, cooling sleep strategies, and tailored nutrition, modern medicine offers proven paths to restore comfort and sleep quality.',
      },
    ],
    content: [
      'Perimenopause is the natural transitional phase leading up to menopause.',
      'Declining estrogen speeds up bone calcium loss and alters lipid profiles.',
      'Hormone replacement therapy and non-hormonal lifestyle options restore sleep quality.',
    ],
    keyTakeaways: [
      'Strength training and weight-bearing exercises are essential for maintaining bone density.',
    ],
    takeawayMessage:
      'Midlife changes are natural biological shifts. With timely bone scans and clinical guidance, vitality remains high.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'heart-health-women',
        title: 'Heart health & blood pressure in midlife',
        readTime: '4 min read',
      },
      {
        id: 'movement-exercise',
        title: 'Strength training for bone density',
        readTime: '3 min read',
      },
    ],
    tags: ['Bone health', 'Hormone support', 'Hot flushes'],
    relatedTopic: 'Bone Mineral Density (DEXA) & Lipid Panel',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'reproductive-health',
    hub: 'womens',
    category: 'Reproductive health',
    categoryTag: 'Reproductive health',
    title: 'Fertility, infections & holistic care',
    headline: 'Fertility, infections & holistic care',
    summary:
      'Optimizing fertility, pelvic floor strength, preconception screenings, and reproductive longevity.',
    intro:
      'Reproductive health encompasses physical, hormonal, and emotional vitality across your childbearing years and beyond. Proactive care gives you peace of mind.',
    readTime: '3 min read',
    image: '/assets/aistudio/image_ad6762cc.png',
    reviewerName: 'Dr. Amina Bello',
    reviewerRole: 'Consultant Obstetrician & Fertility Specialist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed 12 May 2026',
    sections: [
      {
        number: 1,
        title: 'Preconception checks & vital markers',
        content:
          'Preconception checkups examine rubella immunity, hepatitis B, hemoglobin genotype (HbSS/HbAS), blood type/Rh factor, thyroid function, and pelvic anatomy to ensure the smoothest pregnancy journey possible.',
      },
      {
        number: 2,
        title: 'Daily pelvic floor strength (Kegels)',
        content:
          'Pelvic floor exercises strengthen the hammock of muscles supporting the bladder, uterus, and bowel, preventing stress urinary incontinence and improving core stability after childbirth.',
      },
      {
        number: 3,
        title: 'Essential nutritional foundations',
        content:
          'Taking 400 mcg of daily folic acid prior to conception significantly reduces the incidence of neural tube defects. Pairing this with balanced iron levels and hydration builds optimal cellular health.',
      },
    ],
    content: [
      'Reproductive health encompasses physical, hormonal, and emotional vitality.',
      'Preconception wellness checks examine rubella, genotype, and thyroid function.',
      'Pelvic floor exercises strengthen the pelvic hammock.',
    ],
    keyTakeaways: [
      'Preconception checkups identify maternal health factors before pregnancy begins.',
    ],
    takeawayMessage:
      'Taking small proactive steps like folic acid and genotype checks lays the foundation for healthy reproductive years.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'menstrual-health',
        title: 'Cycles, pain & what is normal',
        readTime: '4 min read',
      },
      {
        id: 'cervical-cancer-hpv',
        title: 'Cervical health & Pap smears',
        readTime: '3 min read',
      },
    ],
    tags: ['Preconception', 'Pelvic floor', 'Fertility checks'],
    relatedTopic: 'Preconception & Pelvic Screenings',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'cervical-cancer-hpv',
    hub: 'womens',
    category: 'Cervical health',
    categoryTag: 'Cervical health',
    title: 'HPV, smears & prevention',
    headline: 'HPV, smears & prevention',
    summary:
      'Why cervical cancer is nearly 100% preventable with regular screening and the human papillomavirus (HPV) vaccine.',
    intro:
      'Cervical cancer is one of the rare cancers that can be almost completely prevented through routine screening and vaccination.',
    readTime: '3 min read',
    image: '/assets/aistudio/image_ff6d3cc7.png',
    reviewerName: 'Dr. Ayotunde Peters',
    reviewerRole: 'Consultant Obstetrician & Gynaecologist, FWACS',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed 28 April 2026',
    sections: [
      {
        number: 1,
        title: 'How cervical screening protects you',
        content:
          'A Pap smear collects gentle surface cells from the cervix to spot precancerous dysplasia years before any cancer could ever develop. An HPV co-test detects high-risk viral strains directly.',
      },
      {
        number: 2,
        title: 'Recommended screening schedules',
        content:
          'Screening guidelines recommend starting Pap smears at age 21, repeated every 3 years (or every 5 years when combined with high-risk HPV testing between ages 30 and 65).',
      },
      {
        number: 3,
        title: 'The power of HPV vaccination',
        content:
          'The HPV vaccine is remarkably safe and effective at preventing infection from high-risk HPV strains. Women up to age 45 can still derive meaningful protection after discussing with their clinician.',
      },
    ],
    content: [
      'Cervical cancer develops very slowly over 10–15 years, making early detection lifesaving.',
      'Pap smears and HPV tests take under 3 minutes during a gentle pelvic exam.',
      'The HPV vaccine provides powerful, long-lasting immunity.',
    ],
    keyTakeaways: [
      'Cervical cancer is almost completely preventable with regular Pap smears and HPV vaccination.',
    ],
    takeawayMessage:
      'A 3-minute Pap test every 3 to 5 years gives you complete protection against cervical cancer.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'preventive-care-matrix',
        title: 'The woman’s preventive health roadmap',
        readTime: '4 min read',
      },
      {
        id: 'breast-health',
        title: "Knowing what's normal for you",
        readTime: '4 min read',
      },
    ],
    tags: ['Pap smear', 'HPV vaccine', 'Screening intervals'],
    relatedTopic: 'Cervical Pap Smear & HPV DNA Test',
    screenIdTarget: 'screening-guide',
  },
  {
    id: 'preventive-care-matrix',
    hub: 'womens',
    category: 'Preventive care',
    categoryTag: 'Preventive care',
    title: 'Routine checks that matter',
    headline: 'Routine checks that matter',
    summary:
      'A clear chronological checklist of vital screenings from your 20s through your 60s and beyond.',
    intro:
      'Preventive health is an act of empowerment. When you monitor key vitals and screening benchmarks proactively, health challenges can be caught before they disrupt your life.',
    readTime: '4 min read',
    image: '/assets/aistudio/image_a4a9cee3.png',
    reviewerName: 'Dr. Kemi Johnson',
    reviewerRole: 'Chief Medical Director & Preventive Health Specialist',
    reviewerHospital: 'Iwosan Lagoon Hospitals Group',
    reviewDate: 'Reviewed 15 March 2026',
    sections: [
      {
        number: 1,
        title: 'In your 20s and 30s: Foundations',
        content:
          'Focus on annual blood pressure, baseline lipid and blood sugar checks, cervical Pap smears every 3 years, and establishing healthy movement and sleep habits.',
      },
      {
        number: 2,
        title: 'In your 40s: Proactive monitoring',
        content:
          'Add baseline mammograms every 1–2 years, annual fasting blood sugar tests, perimenopause consultations, and comprehensive eye/dental checkups.',
      },
      {
        number: 3,
        title: 'In your 50s and 60+: Longevity protection',
        content:
          'Introduce bone mineral density (DEXA) scans, colorectal cancer screenings, cardiovascular stress assessments, and regular hearing/vision reviews.',
      },
    ],
    content: [
      'In your 20s and 30s: Focus on annual blood pressure, baseline lipid and blood sugar checks.',
      'In your 40s: Add baseline mammograms, regular fasting blood sugar tests.',
      'In your 50s and 60+: Introduce bone mineral density (DEXA) scans.',
    ],
    keyTakeaways: [
      'Track your personal screening calendar based on your current decade.',
    ],
    takeawayMessage:
      'Prevention is always gentler, faster, and more affordable than curative care. Make your birthday month your checkup month.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'heart-health-women',
        title: 'Women’s heart health & blood pressure',
        readTime: '4 min read',
      },
      {
        id: 'breast-health',
        title: "Knowing what's normal for you",
        readTime: '4 min read',
      },
    ],
    tags: ['Annual checkup', 'Screening matrix', 'Decade roadmap'],
    relatedTopic: 'Comprehensive Annual Wellness Package',
    screenIdTarget: 'contact',
  },

  // ================= HEART, DIABETES & LIFESTYLE HUB =================
  {
    id: 'heart-health-women',
    hub: 'lifestyle',
    category: 'Heart health',
    categoryTag: 'Heart health',
    title: 'Blood pressure & everyday habits',
    headline: 'Blood pressure & everyday habits',
    summary:
      'Heart disease manifests differently in women. Learn the subtle cues, blood pressure targets, and preventive strategies.',
    intro:
      'Cardiovascular disease remains the leading health risk for women worldwide, yet women frequently experience subtle signals rather than classic chest pain.',
    readTime: '4 min read',
    image: '/assets/aistudio/image_572b6d90.png',
    reviewerName: 'Dr. Chioma Eze',
    reviewerRole: 'Consultant Cardiologist & Heart Specialist',
    reviewerHospital: 'Iwosan Lagoon Heart Center, Victoria Island',
    reviewDate: 'Reviewed 10 February 2026',
    sections: [
      {
        number: 1,
        title: 'Recognizing subtle female heart cues',
        content:
          'Women are far more likely to experience heart strain as unexplained shortness of breath on stairs, deep fatigue, upper back or jaw tightness, nausea, or dizziness.',
      },
      {
        number: 2,
        title: 'Knowing your blood pressure numbers',
        content:
          'An ideal blood pressure is below 120/80 mmHg. Consistently elevated readings (130/80+ mmHg) place strain on arterial walls and increase lifetime stroke risk.',
      },
      {
        number: 3,
        title: 'Dietary sodium and daily movement',
        content:
          'A diet rich in potassium, leafy vegetables, reduced processed sodium, combined with 30 minutes of daily moderate walking, can lower systolic blood pressure by 5–10 points naturally.',
      },
    ],
    content: [
      'Women may experience heart strain as breathlessness, jaw ache, or deep fatigue.',
      'Target blood pressure is under 120/80 mmHg; check yours at least once a year.',
      'Reduce processed sodium and season with herbs, garlic, ginger, and lemon.',
    ],
    keyTakeaways: [
      'Target blood pressure is under 120/80 mmHg; check yours at least once a year.',
    ],
    takeawayMessage:
      'Knowing your blood pressure numbers is the simplest and most powerful step in protecting your heart.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'movement-exercise',
        title: 'Movement, walking & heart stamina',
        readTime: '3 min read',
      },
      {
        id: 'nutrition-habits',
        title: 'Nourishing food & healthy blood vessels',
        readTime: '3 min read',
      },
    ],
    tags: ['Blood pressure', 'Heart numbers', 'Walking'],
    relatedTopic: 'Blood Pressure & Lipid Profile Screen',
    screenIdTarget: 'numbers',
  },
  {
    id: 'diabetes-prevention',
    hub: 'lifestyle',
    category: 'Diabetes',
    categoryTag: 'Diabetes',
    title: 'Sugar, signs & prevention',
    headline: 'Sugar, signs & prevention',
    summary:
      'What fasting blood glucose numbers mean, insulin resistance signs, and how lifestyle modifications restore metabolic health.',
    intro:
      'Blood sugar balance determines your daytime energy, mood stability, and cardiovascular health. Pre-diabetes is a window of immense opportunity to reverse course.',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=480&q=80',
    reviewerName: 'Dr. Babatunde Alabi',
    reviewerRole: 'Consultant Endocrinologist & Diabetologist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Ikeja',
    reviewDate: 'Reviewed 24 January 2026',
    sections: [
      {
        number: 1,
        title: 'What your fasting numbers mean',
        content:
          'A normal fasting blood sugar is between 70 and 99 mg/dL (3.9 to 5.5 mmol/L). Readings between 100 and 125 mg/dL indicate pre-diabetes, where simple changes can completely reverse elevated sugar.',
      },
      {
        number: 2,
        title: 'Post-meal movement miracle',
        content:
          'Taking a brisk 10-minute walk right after meals allows your large leg muscles to absorb glucose directly from the bloodstream without requiring high insulin spikes.',
      },
      {
        number: 3,
        title: 'Fiber & complex unrefined carbohydrates',
        content:
          'Replacing refined white flour and sweet beverages with fiber-rich complex grains (oats, beans, ofada rice, vegetables) dramatically flattens blood sugar surges.',
      },
    ],
    content: [
      'A normal fasting blood sugar is 70–99 mg/dL (3.9–5.5 mmol/L).',
      'Pre-diabetes is completely reversible with early action.',
      'A 10-minute stroll after lunch or dinner dramatically flattens blood sugar spikes.',
    ],
    keyTakeaways: [
      'A normal fasting blood sugar is 70–99 mg/dL (3.9–5.5 mmol/L).',
    ],
    takeawayMessage:
      'A 10-minute walk after meals and fiber-rich meals help reverse pre-diabetes naturally.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'nutrition-habits',
        title: 'Nourishing your body with balanced meals',
        readTime: '3 min read',
      },
      {
        id: 'heart-health-women',
        title: 'Blood pressure & everyday habits',
        readTime: '4 min read',
      },
    ],
    tags: ['Fasting sugar', 'HbA1c', 'Metabolic health'],
    relatedTopic: 'Fasting Blood Sugar & HbA1c Lab Check',
    screenIdTarget: 'numbers',
  },
  {
    id: 'nutrition-habits',
    hub: 'lifestyle',
    category: 'Nutrition',
    categoryTag: 'Nutrition',
    title: 'Simple food, real life',
    headline: 'Simple food, real life',
    summary:
      'How wholesome, colorful plates, dietary fiber, and smart hydration balance hormones and steady energy.',
    intro:
      'Nutritional wellness is not about extreme deprivation or short-term fad diets. It is about consistently providing your cells with dense micronutrients.',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=480&q=80',
    reviewerName: 'Dr. Folake Sanni',
    reviewerRole: 'Clinical Nutritionist & Wellness Specialist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Ikoyi',
    reviewDate: 'Reviewed 15 February 2026',
    sections: [
      {
        number: 1,
        title: 'The visual healthy plate model',
        content:
          'Fill 50% of your plate with colorful vegetables and dark greens (ugwu, spinach, carrots, cucumber), 25% with lean protein (fish, beans, eggs), and 25% with complex starches (sweet potato, ofada rice, plantain).',
      },
      {
        number: 2,
        title: 'Fiber as a hormone ally',
        content:
          'Fiber binds excess circulating estrogen in the gut, promotes smooth digestion, and keeps blood sugar steady throughout your workday.',
      },
      {
        number: 3,
        title: 'Hydration before caffeine',
        content:
          'Drinking 2 to 2.5 liters of clean water daily clears toxins, prevents afternoon fatigue slumps, and curbs false hunger signals.',
      },
    ],
    content: [
      'Aim to fill half your plate with vibrant vegetables and dark greens.',
      'Prioritize complex carbohydrates with high fiber to avoid insulin spikes.',
      'Drink water consistently throughout the day.',
    ],
    keyTakeaways: [
      'Fill half your plate with colorful vegetables and drink 2+ liters of water daily.',
    ],
    takeawayMessage:
      'Focus on adding colorful greens and water rather than restrictive dieting.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'diabetes-prevention',
        title: 'Sugar, signs & prevention',
        readTime: '4 min read',
      },
      {
        id: 'healthy-micro-habits',
        title: 'Daily micro-habits for vitality',
        readTime: '3 min read',
      },
    ],
    tags: ['Healthy plate', 'Fiber', 'Hydration'],
    relatedTopic: 'Dietary Fiber & Metabolic Support',
    screenIdTarget: 'check',
  },
  {
    id: 'movement-exercise',
    hub: 'lifestyle',
    category: 'Movement',
    categoryTag: 'Movement',
    title: 'Start small, stay steady',
    headline: 'Start small, stay steady',
    summary:
      'Why lifting weights and daily walking are game-changers for women’s metabolic rate, bone health, and posture.',
    intro:
      'Movement is medicine. While brisk walking powers your cardiovascular stamina, strength and resistance training preserve bone density and muscle as you age.',
    readTime: '3 min read',
    image: '/assets/aistudio/image_1a1890e0.png',
    reviewerName: 'Dr. Chidinma Okafor',
    reviewerRole: 'Specialist in Sports & Preventive Medicine',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed 20 January 2026',
    sections: [
      {
        number: 1,
        title: 'Why muscle matters after 30',
        content:
          'After age 30, women naturally lose 3% to 5% of lean muscle per decade unless challenged. Bodyweight squats, bands, and weights keep metabolism brisk and joints protected.',
      },
      {
        number: 2,
        title: 'Bone density stimulation',
        content:
          'Weight-bearing movements signal bone cells to deposit calcium, creating strong hips and spine that prevent osteoporosis in later decades.',
      },
      {
        number: 3,
        title: 'Brisk daily steps',
        content:
          'Aim for 7,000 to 10,000 steps daily. Even three 10-minute walks spread throughout the day deliver equal cardiovascular benefits.',
      },
    ],
    content: [
      'Include 2 sessions of strength/resistance training per week.',
      'Muscle is a metabolically active organ that burns glucose.',
      'Daily steps count: aim for 7,000 to 10,000 steps.',
    ],
    keyTakeaways: [
      'Pair 150 minutes of weekly walking with 2 short strength sessions.',
    ],
    takeawayMessage:
      'Strength training and daily steps are the true anti-aging prescription for women.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'heart-health-women',
        title: 'Blood pressure & everyday habits',
        readTime: '4 min read',
      },
      {
        id: 'sleep-stress',
        title: 'Rest, reset, recover',
        readTime: '3 min read',
      },
    ],
    tags: ['Strength training', 'Walking steps', 'Bone density'],
    relatedTopic: 'Active Lifestyle Guidance',
    screenIdTarget: 'check',
  },
  {
    id: 'sleep-stress',
    hub: 'lifestyle',
    category: 'Sleep & stress',
    categoryTag: 'Sleep & stress',
    title: 'Rest, reset, recover',
    headline: 'Rest, reset, recover',
    summary:
      'The biological impact of chronic stress on women’s hormones and practical micro-habits for deep, healing sleep.',
    intro:
      'Sleep is your body’s nocturnal repair shop. When chronic stress keeps cortisol elevated, restorative sleep is your fastest path back to balance.',
    readTime: '3 min read',
    image: '/assets/aistudio/image_e9ce1814.png',
    reviewerName: 'Dr. Tolu Olusanya',
    reviewerRole: 'Lifestyle Medicine Physician & Stress Specialist',
    reviewerHospital: 'Iwosan Lagoon Hospitals, Victoria Island',
    reviewDate: 'Reviewed 18 January 2026',
    sections: [
      {
        number: 1,
        title: 'The biological price of chronic cortisol',
        content:
          'Persistent high cortisol blocks deep sleep stages, increases abdominal fat retention, and exhausts adrenal reserves. Recognizing when your nervous system is in overdrive is key.',
      },
      {
        number: 2,
        title: 'The 45-minute digital sunset',
        content:
          'Switching off bright phone and laptop screens 45 minutes before sleep allows the pineal gland to release melatonin naturally, facilitating deep restorative sleep.',
      },
      {
        number: 3,
        title: 'The 4-4-6 vagus nerve breath',
        content:
          'Inhaling for 4 seconds, holding for 4, and exhaling for 6 seconds instantly signals your autonomic nervous system to downshift from fight-or-flight into rest-and-digest.',
      },
    ],
    content: [
      'Aim for 7–8 hours of consistent, restful sleep each night.',
      'Practice a screen-free wind-down routine 45 minutes before bed.',
      'Use slow, extended exhales to activate your calming vagus nerve.',
    ],
    keyTakeaways: [
      'Consistent 7–8 hours of restorative sleep regulates hormones and lowers stress.',
    ],
    takeawayMessage:
      'Protect your sleep like an executive meeting. A 45-minute screen-free wind-down transforms your mornings.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'healthy-micro-habits',
        title: 'Daily micro-habits for vitality',
        readTime: '3 min read',
      },
      {
        id: 'movement-exercise',
        title: 'Start small, stay steady',
        readTime: '3 min read',
      },
    ],
    tags: ['Deep sleep', 'Cortisol reset', 'Breathing exercises'],
    relatedTopic: 'Sleep Hygiene & Stress Resilience',
    screenIdTarget: 'check',
  },
  {
    id: 'healthy-micro-habits',
    hub: 'lifestyle',
    category: 'Healthy habits',
    categoryTag: 'Healthy habits',
    title: 'Small steps, kept simple',
    headline: 'Small steps, kept simple',
    summary:
      'Small, manageable daily actions that compound into profound physical health, mental clarity, and longevity.',
    intro:
      'Health transformation is rarely built on extreme overhauls. It is the steady accumulation of small, loving choices repeated day after day.',
    readTime: '3 min read',
    image: '/assets/aistudio/image_27257c44.png',
    reviewerName: 'Dr. Kemi Johnson',
    reviewerRole: 'Chief Medical Director & Preventive Health Lead',
    reviewerHospital: 'Iwosan Lagoon Hospitals Group',
    reviewDate: 'Reviewed 2 February 2026',
    sections: [
      {
        number: 1,
        title: 'Morning hydration & morning light',
        content:
          'Drink a large glass of water within 15 minutes of waking and step outdoors for 5 minutes of natural sunlight to set your master circadian clock and boost daytime alertness.',
      },
      {
        number: 2,
        title: 'Add before subtracting',
        content:
          'Instead of focusing on what foods to restrict, focus on adding one fist of fresh greens, an extra cup of water, or a 10-minute post-meal stroll.',
      },
      {
        number: 3,
        title: 'Tie checkups to your birth month',
        content:
          'Schedule your annual clinical wellness visit and screenings in your birthday month every single year as an intentional gift to your future self.',
      },
    ],
    content: [
      'Consistent micro-habits beat sporadic extreme fitness regimes.',
      'Morning natural light anchors your circadian rhythm.',
      'Focus on adding nourishing foods before restricting.',
    ],
    keyTakeaways: [
      'Small, repeatable daily habits compound into lifelong vitality and longevity.',
    ],
    takeawayMessage:
      'Celebrate tiny consistency. One glass of morning water, 5 minutes of sunlight, and an annual birth-month checkup go a long way.',
    disclaimer:
      'Educational information, not a diagnosis. If a symptom worries you, please speak to a clinician.',
    relatedArticles: [
      {
        id: 'preventive-care-matrix',
        title: 'Routine checks that matter',
        readTime: '4 min read',
      },
      {
        id: 'sleep-stress',
        title: 'Rest, reset, recover',
        readTime: '3 min read',
      },
    ],
    tags: ['Micro-habits', 'Circadian light', 'Birthday checkup'],
    relatedTopic: 'Iwosan Annual Women’s Wellness Check',
    screenIdTarget: 'contact',
  },
];
