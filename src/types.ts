export type ScreenId =
  | 'welcome'
  | 'dashboard'
  | 'privacy'
  | 'check'
  | 'numbers'
  | 'summary'
  | 'womens-health'
  | 'lifestyle'
  | 'screening-guide'
  | 'contact'
  | 'about'
  | 'admin'
  | 'article';

export type QuestionCategory =
  | 'OCCUPATION'
  | 'AGE'
  | 'ROUTINE CHECK'
  | 'BLOOD PRESSURE'
  | 'BLOOD SUGAR'
  | 'FAMILY HISTORY'
  | 'GENERAL WOMENS HEALTH'
  | 'NUTRITION'
  | 'EXERCISE'
  | 'SLEEP AND REST'
  | 'SOCIAL CONNECTEDNESS AND RELATIONSHIP'
  | 'MENTAL HEALTH AND MINDFULNESS'
  | 'AVOIDANCE OF TOXIC SUBSTANCES';

export interface QuestionOption {
  id: string;
  label: string;
  detail?: string;
  type: 'doing_well' | 'worth_checking' | 'discuss' | 'neutral';
}

export interface Question {
  id: string;
  category: QuestionCategory;
  categoryLabel: string;
  stepNumber: number;
  totalSteps: number;
  title: string;
  whyWeAsk: string;
  options: QuestionOption[];
  skipText?: string;
  hasDatePicker?: boolean;
  datePickerLabel?: string;
  isSafetyQuestion?: boolean;
}

export interface HealthNumbers {
  systolic?: number;
  diastolic?: number;
  bloodSugar?: number;
  sugarType: 'fasting' | 'random';
  sugarUnit: 'mg/dL' | 'mmol/L';
  height?: number; // in cm or inches depending on unit
  weight?: number; // in kg or lbs depending on unit
  unitSystem: 'metric' | 'imperial';
}

export interface ArticleSection {
  number: number;
  title: string;
  content: string;
}

export interface RelatedArticleRef {
  id: string;
  title: string;
  readTime: string;
}

export interface Article {
  id: string;
  hub: 'womens' | 'lifestyle';
  category: string;
  categoryTag?: string;
  title: string;
  headline?: string;
  summary: string;
  readTime: string;
  image?: string;
  reviewerName: string;
  reviewerRole: string;
  reviewerHospital: string;
  reviewDate: string;
  intro?: string;
  sections?: ArticleSection[];
  content: string[];
  keyTakeaways: string[];
  takeawayMessage?: string;
  disclaimer?: string;
  relatedTopic?: string;
  relatedArticles?: RelatedArticleRef[];
  tags?: string[];
  screenIdTarget?: ScreenId;
}

export interface ScreeningItem {
  id: string;
  name: string;
  targetAge: string;
  frequency: string;
  whyItMatters: string;
  whatToExpect: string;
  doctorQuestions: string[];
  tags: string[];
}

export interface SummaryInsight {
  id: string;
  title: string;
  description: string;
  articleId?: string;
  actionText?: string;
  actionScreen?: ScreenId;
  relatedHub?: 'womens' | 'lifestyle' | 'screening-guide' | 'numbers' | 'contact';
}

export interface CrisisSupportInfo {
  triggered: boolean;
  title: string;
  message: string;
  hotlines: { name: string; number: string; description: string; isEmergency?: boolean }[];
}

export interface SummaryResults {
  keepDoing: SummaryInsight[];
  worthChecking: SummaryInsight[];
  discussWithDoctor: SummaryInsight[];
  crisisSupport?: CrisisSupportInfo;
  ageGroup?: string;
  occupationCategory?: string;
  completionDate: string;
}

export interface IwosanLocation {
  id: string;
  name: string;
  address: string;
  area: string;
  phone: string;
  hours: string;
  specialties: string[];
  mapLink: string;
}

export type HospitalLocation = IwosanLocation;

