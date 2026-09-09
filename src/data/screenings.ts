import { ScreeningItem } from '../types';

export const SCREENING_GUIDELINES: ScreeningItem[] = [
  {
    id: 'cervical-screen',
    name: 'Cervical Cancer Screening (Pap Smear & HPV DNA)',
    targetAge: 'Age 21 – 65',
    frequency: 'Every 3 to 5 years',
    whyItMatters: 'Detects high-risk HPV and cellular dysplasias years before they can progress to cervical cancer. Cervical cancer is virtually 100% preventable when caught in the precancerous stage.',
    whatToExpect: 'A quick, 2-minute pelvic exam using a speculum. A clinician gently sweeps the surface cells of the cervix. Mild discomfort may occur for a few seconds, but it is brief and safe.',
    doctorQuestions: [
      'Am I due for a Pap smear, high-risk HPV DNA test, or both (co-testing)?',
      'Should I consider the HPV vaccine if I have not received it?',
      'When and how will I receive my laboratory results?'
    ],
    tags: ['All Women 21-65', 'Essential Preventive Care', 'Pap Test', 'HPV']
  },
  {
    id: 'breast-mammogram',
    name: 'Mammography & Clinical Breast Exam',
    targetAge: 'Age 40+ (or 30+ with family history)',
    frequency: 'Every 1 to 2 years',
    whyItMatters: 'Digital mammograms can reveal microcalcifications and tiny lesions up to 2 years before they could ever be felt by hand, dramatically boosting successful treatment outcomes.',
    whatToExpect: 'You stand in front of a specialized low-dose X-ray machine. Each breast is gently compressed between two clear plates for 10–15 seconds to obtain clear imaging.',
    doctorQuestions: [
      'Based on my family history and breast density, when should I schedule my first or next mammogram?',
      'Would a supplemental breast ultrasound be beneficial for dense breast tissue?',
      'How frequently do you recommend clinical breast exams for my age group?'
    ],
    tags: ['Age 40+', 'Early Detection', 'Digital Imaging', 'High-Impact']
  },
  {
    id: 'blood-pressure',
    name: 'Blood Pressure Assessment (Cuff Check)',
    targetAge: 'All adult women (18+)',
    frequency: 'At least once a year (more frequent if elevated)',
    whyItMatters: 'Hypertension is the leading modifiable risk factor for stroke, cardiovascular disease, and kidney disease. It has zero early symptoms, making regular measurement crucial.',
    whatToExpect: 'A comfortable inflatable cuff is placed over your upper arm while you sit quietly for 5 minutes. The measurement takes less than 60 seconds.',
    doctorQuestions: [
      'What is my reading today, and is it within the optimal range for my age (<120/80 mmHg)?',
      'Should I monitor my readings at home or adjust my sodium intake?',
      'Does my reading reflect white-coat tension or true baseline pressure?'
    ],
    tags: ['All Ages', 'Heart & Brain Health', 'Fast & Painless', 'Annual Vital']
  },
  {
    id: 'blood-sugar-hba1c',
    name: 'Fasting Blood Sugar & HbA1c (Diabetes Screen)',
    targetAge: 'Age 35+ (or earlier if family history / overweight)',
    frequency: 'Every 1 to 3 years',
    whyItMatters: 'Identifies pre-diabetes before symptoms occur. Early identification allows 100% lifestyle reversal through nutrition, walking, and stress management.',
    whatToExpect: 'A simple fasting blood draw (usually in the morning after 8 hours of water only) or a quick fingertip glucose check at a health screening booth.',
    doctorQuestions: [
      'Is my blood sugar in the normal, pre-diabetes, or elevated range?',
      'Would checking an HbA1c (3-month average) give us a clearer metabolic picture?',
      'What dietary or movement changes would best support my insulin sensitivity?'
    ],
    tags: ['Metabolic Health', 'Pre-Diabetes Reversible', 'Fasting Test']
  },
  {
    id: 'lipid-profile',
    name: 'Comprehensive Lipid Panel (Cholesterol & Triglycerides)',
    targetAge: 'Age 20+ every 4–5 years; Age 40+ annually',
    frequency: 'Every 1 to 5 years based on individual risk profile',
    whyItMatters: 'Evaluates HDL ("good"), LDL ("bad"), total cholesterol, and triglycerides. Helps calculate your 10-year cardiovascular risk and arterial plaque prevention.',
    whatToExpect: 'A simple blood sample, often combined with your routine annual wellness blood panel.',
    doctorQuestions: [
      'What is my ratio of HDL to LDL cholesterol?',
      'Do my triglycerides indicate any dietary adjustments are needed?',
      'How does my family heart history affect my cholesterol targets?'
    ],
    tags: ['Cardiovascular', 'Cholesterol', 'Arterial Wellness']
  },
  {
    id: 'bone-density-dexa',
    name: 'Bone Mineral Density Scan (DEXA Scan)',
    targetAge: 'Age 50+ (postmenopausal or with fracture risk factors)',
    frequency: 'Every 2 to 3 years postmenopause',
    whyItMatters: 'Osteoporosis thins bones silently. A DEXA scan quantifies your T-score, preventing future hip and spine fractures through targeted calcium, vitamin D, and bone-strengthening therapy.',
    whatToExpect: 'A painless, open, low-radiation scanner where you lie clothed on a cushioned table for about 10 minutes.',
    doctorQuestions: [
      'What is my current T-score (normal, osteopenia, or osteoporosis)?',
      'Am I getting adequate elemental calcium and vitamin D3 for bone preservation?',
      'Which resistance exercises are safest and most effective for my bone strength?'
    ],
    tags: ['Age 50+', 'Bone Health', 'Osteoporosis Prevention', 'Painless']
  },
  {
    id: 'pelvic-ultrasound',
    name: 'Pelvic & Transvaginal Ultrasound',
    targetAge: 'As indicated for pelvic pain, heavy bleeding, or routine gynaecology check',
    frequency: 'As recommended by your gynaecologist',
    whyItMatters: 'Provides high-resolution imaging of the uterus, endometrium, and ovaries. Highly accurate in identifying uterine fibroids, ovarian cysts, polyps, or adenomyosis.',
    whatToExpect: 'An ultrasound probe placed over the lower abdomen (with a full bladder) or a slender transvaginal transducer. Non-invasive with immediate imaging results.',
    doctorQuestions: [
      'Are there any signs of fibroids, endometrial thickening, or ovarian cysts?',
      'Does the ultrasound explain my cycle symptoms or pelvic pressure?',
      'Do we simply observe or pursue medical/surgical intervention?'
    ],
    tags: ['Gynaecology', 'Fibroid Check', 'Cycle Wellness', 'Ultrasound']
  },
  {
    id: 'colorectal-screen',
    name: 'Colorectal Screening (FIT / Stool DNA / Colonoscopy)',
    targetAge: 'Age 45 – 75',
    frequency: 'Annual non-invasive stool test or Colonoscopy every 10 years',
    whyItMatters: 'Colorectal cancer almost always begins as benign polyps. Removing polyps during screening prevents cancer before it can ever start.',
    whatToExpect: 'Either an at-home collection kit for microscopic occult blood/DNA or an outpatient colonoscopy performed under gentle conscious sedation.',
    doctorQuestions: [
      'Which colorectal screening modality (stool test or colonoscopy) fits my lifestyle and risk profile best?',
      'Are there any dietary pre-requisites for this test?'
    ],
    tags: ['Age 45+', 'Polyp Prevention', 'Life-Saving Milestone']
  }
];
