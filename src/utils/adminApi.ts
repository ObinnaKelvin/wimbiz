import { HealthNumbers } from '../types';
import {
  ALL_HEALTH_QUESTIONS,
  formatQuestionAnswer,
  isSafetyTriggerAnswer,
} from '../data/questions';

const ADMIN_TOKEN_KEY = 'iwosan_wellness_admin_token';
const ADMIN_USER_KEY = 'iwosan_wellness_admin_user';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  department: string;
  hospital: string;
}

export interface QuestionAnalyticsItem {
  questionId: string;
  title: string;
  category?: string;
  categoryLabel?: string;
  stepNumber?: number;
  totalResponders: number;
  options: {
    optionId: string;
    label: string;
    type?: string;
    count: number;
    percentage: number;
  }[];
}

export interface AdminDashboardData {
  totalParticipants: number;
  completedChecks: number;
  completionRate: number;
  avgSystolic: number | null;
  avgBmi: number | null;
  safetyTriggerCount: number;
  ageDistribution: Record<string, number>;
  questionResponses: Record<string, Record<string, number>>;
  questionAnalytics: Record<string, QuestionAnalyticsItem>;
  databaseStatus: {
    isConnected: boolean;
    type: 'mongodb' | 'local_fallback';
    dbName: string;
    collectionName?: string;
    totalRecords: number;
    uriMasked: string;
    connectionError?: string | null;
  };
}

export interface ClientAnonymousRecord {
  id: string;
  timestamp: string;
  ageBand: string;
  completedCheck: boolean;
  answers: Record<string, string>;
  numbers?: HealthNumbers;
  bmi?: number;
  bmiCategory?: string;
  bpCategory?: string;
  sugarCategory?: string;
  source?: string;
}

/**
 * Dynamically builds questionAnalytics for every active question on the form
 * from a list of participant records, ensuring 100% alignment with src/data/questions.ts.
 */
export function buildQuestionAnalyticsFromRecords(
  records: ClientAnonymousRecord[]
): Record<string, QuestionAnalyticsItem> {
  const analytics: Record<string, QuestionAnalyticsItem> = {};

  for (const q of ALL_HEALTH_QUESTIONS) {
    const counts: Record<string, number> = {};
    let total = 0;

    for (const r of records) {
      const ans =
        q.id === 'q1_age'
          ? r.answers?.['q1_age'] || r.ageBand
          : r.answers?.[q.id];
      if (ans && ans !== 'skipped') {
        counts[ans] = (counts[ans] || 0) + 1;
        total++;
      }
    }

    const seenOptionIds = new Set<string>();
    const options: QuestionAnalyticsItem['options'] = [];

    for (const opt of q.options) {
      seenOptionIds.add(opt.id);
      const count = counts[opt.id] || 0;
      options.push({
        optionId: opt.id,
        label: opt.label,
        type: opt.type,
        count,
        percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
      });
    }

    for (const [optId, count] of Object.entries(counts)) {
      if (!seenOptionIds.has(optId)) {
        options.push({
          optionId: optId,
          label: formatQuestionAnswer(q.id, optId),
          type: 'neutral',
          count,
          percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
        });
      }
    }

    analytics[q.id] = {
      questionId: q.id,
      title: q.title,
      category: q.category,
      categoryLabel: q.categoryLabel,
      stepNumber: q.stepNumber,
      totalResponders: total,
      options,
    };
  }

  return analytics;
}

// -------------------------------------------------------------
// Authentication Helpers
// -------------------------------------------------------------
export function getStoredAdminToken(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredAdminUser(): AdminUser | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_USER_KEY) || localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAdminSession(token: string, user: AdminUser, remember = true) {
  try {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(ADMIN_TOKEN_KEY, token);
    storage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
}

export function clearAdminSession() {
  try {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
  } catch (e) {
    console.error(e);
  }
}

// -------------------------------------------------------------
// API Calls
// -------------------------------------------------------------
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Login failed. Please check credentials.' };
    }

    setAdminSession(data.token, data.user, true);
    return { success: true, user: data.user };
  } catch (err: any) {
    // If backend is running offline or local mock mode, allow fallback validation for convenience
    if (email.trim().toLowerCase() === 'admin@iwosan.com' && password === 'IwosanAdmin2026!') {
      const mockUser: AdminUser = {
        email: 'admin@iwosan.com',
        name: 'Iwosan Clinical Staff Administrator',
        role: 'Clinical Research Administrator',
        department: 'Health Informatics & Clinical Research',
        hospital: 'Iwosan Lagoon Hospitals',
      };
      setAdminSession('iwosan-staff-token-2026', mockUser, true);
      return { success: true, user: mockUser };
    }
    return { success: false, error: err.message || 'Network error connecting to backend.' };
  }
}

export async function fetchAdminDashboardStats(): Promise<AdminDashboardData | null> {
  const token = getStoredAdminToken();
  try {
    const res = await fetch('/api/admin/stats', {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'x-admin-session': token || '',
      },
    });

    if (!res.ok) throw new Error('Failed to load stats');
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Could not fetch server stats, building client-side aggregated view:', err);
    const localRecords = loadLocalAnonymousRecords();
    const totalCount = localRecords.length;
    const completedCount = localRecords.filter((r) => r.completedCheck).length;
    let safetyTriggerCount = 0;
    for (const r of localRecords) {
      if (r.answers && Object.entries(r.answers).some(([qId, optId]) => isSafetyTriggerAnswer(qId, optId))) {
        safetyTriggerCount++;
      }
    }
    return {
      totalParticipants: totalCount,
      completedChecks: completedCount,
      completionRate: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
      avgSystolic: null,
      avgBmi: null,
      safetyTriggerCount,
      ageDistribution: {},
      questionResponses: {},
      questionAnalytics: buildQuestionAnalyticsFromRecords(localRecords),
      databaseStatus: {
        isConnected: false,
        type: 'local_fallback',
        dbName: 'local_storage',
        totalRecords: totalCount,
        uriMasked: 'Local Browser Fallback',
      },
    };
  }
}

export async function fetchAdminRecords(): Promise<ClientAnonymousRecord[]> {
  const token = getStoredAdminToken();
  try {
    const res = await fetch('/api/admin/records', {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'x-admin-session': token || '',
      },
    });

    if (!res.ok) throw new Error('Failed to load records');
    const data = await res.json();
    return data.records || [];
  } catch (err) {
    console.warn('Could not fetch server records, checking local store:', err);
    const local = loadLocalAnonymousRecords();
    return local;
  }
}

export async function reconnectDatabase(): Promise<{ success: boolean; status?: AdminDashboardData['databaseStatus']; error?: string }> {
  try {
    const res = await fetch('/api/admin/reconnect-db', { method: 'POST' });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// -------------------------------------------------------------
// Excel Export Trigger (Direct Stream or Client-side Fallback)
// -------------------------------------------------------------
export async function downloadExcelResponses(records?: ClientAnonymousRecord[]) {
  try {
    // Try streaming directly from the server endpoint
    const res = await fetch('/api/admin/export');
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Wellness_Passport_Participant_Responses_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return;
    }
  } catch (e) {
    console.warn('Direct stream export unavailable, generating via client-side XLSX module:', e);
  }

  // Client-side fallback generation with xlsx mapped strictly to ALL_HEALTH_QUESTIONS
  const XLSX = await import('xlsx');
  const sourceRecords = records && records.length > 0 ? records : await fetchAdminRecords();
  const wb = XLSX.utils.book_new();

  const headerRow: string[] = [
    'Participant ID',
    'Date & Time (UTC)',
    'Check Completed?',
    'Systolic BP (mmHg)',
    'Diastolic BP (mmHg)',
    'Blood Glucose',
    'Glucose Type',
    'Height',
    'Weight',
    'BMI',
    'BMI Category',
    ...ALL_HEALTH_QUESTIONS.map((q) => q.title),
  ];

  const dataRows: (string | number)[][] = sourceRecords.map((r) => {
    const row: (string | number)[] = [
      r.id,
      r.timestamp ? new Date(r.timestamp).toLocaleString('en-GB') : '',
      r.completedCheck ? 'Yes' : 'In-Progress',
      r.numbers?.systolic ?? '',
      r.numbers?.diastolic ?? '',
      r.numbers?.bloodSugar ?? '',
      r.numbers?.sugarType ? `${r.numbers.sugarType} (${r.numbers.sugarUnit || 'mg/dL'})` : '',
      r.numbers?.height ? `${r.numbers.height} ${r.numbers.unitSystem === 'imperial' ? 'in' : 'cm'}` : '',
      r.numbers?.weight ? `${r.numbers.weight} ${r.numbers.unitSystem === 'imperial' ? 'lbs' : 'kg'}` : '',
      r.bmi ?? '',
      r.bmiCategory ?? '',
    ];

    for (const q of ALL_HEALTH_QUESTIONS) {
      const rawVal =
        q.id === 'q1_age'
          ? r.answers?.['q1_age'] || r.ageBand
          : r.answers?.[q.id];
      row.push(formatQuestionAnswer(q.id, rawVal));
    }

    return row;
  });

  const wsResponses = XLSX.utils.aoa_to_sheet([headerRow, ...dataRows]);
  XLSX.utils.book_append_sheet(wb, wsResponses, 'User Responses Data');

  // Sheet 2: Question Percentages
  const analyticsMap = buildQuestionAnalyticsFromRecords(sourceRecords);
  const statsHeaders = [
    'Category',
    'Question ID',
    'Question Text',
    'Total Responses',
    'Option Answer',
    'Response Count',
    'Percentage (%)',
  ];
  const statsRows: (string | number)[][] = [];
  for (const q of ALL_HEALTH_QUESTIONS) {
    const item = analyticsMap[q.id];
    if (!item) continue;
    for (const opt of item.options) {
      statsRows.push([
        q.categoryLabel,
        q.id,
        q.title,
        item.totalResponders,
        opt.label,
        opt.count,
        `${opt.percentage.toFixed(1)}%`,
      ]);
    }
  }
  const wsPercentages = XLSX.utils.aoa_to_sheet([statsHeaders, ...statsRows]);
  XLSX.utils.book_append_sheet(wb, wsPercentages, 'Question Percentages');

  XLSX.writeFile(wb, `Wellness_Passport_Responses_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// -------------------------------------------------------------
// Auto-Submit Anonymous Record from User Health Check
// -------------------------------------------------------------
const STORAGE_LOCAL_RECORDS = 'iwosan_wellness_local_records_v1';
const STORAGE_LOCAL_RECORDS_LEGACY = 'iwosan_herhealth_local_records_v1';
const STORAGE_USER_ANON_ID = 'iwosan_wellness_anon_user_id';
const STORAGE_USER_ANON_ID_LEGACY = 'iwosan_herhealth_anon_user_id';

export function getOrCreateAnonymousId(): string {
  try {
    let id = localStorage.getItem(STORAGE_USER_ANON_ID) || localStorage.getItem(STORAGE_USER_ANON_ID_LEGACY);
    if (!id) {
      id = `WP-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem(STORAGE_USER_ANON_ID, id);
    }
    return id;
  } catch {
    return `WP-${Math.floor(1000 + Math.random() * 9000)}`;
  }
}

export function loadLocalAnonymousRecords(): ClientAnonymousRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_LOCAL_RECORDS) || localStorage.getItem(STORAGE_LOCAL_RECORDS_LEGACY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function submitAnonymousRecord(payload: {
  answers: Record<string, string>;
  numbers?: HealthNumbers;
  completedCheck?: boolean;
}): Promise<void> {
  const anonId = getOrCreateAnonymousId();
  const timestamp = new Date().toISOString();
  const ageBand = payload.answers['q1_age'] || 'unspecified';

  let bmi: number | undefined;
  let bmiCategory: string | undefined;

  if (payload.numbers?.weight && payload.numbers?.height && payload.numbers.height > 0) {
    if (payload.numbers.unitSystem === 'metric') {
      const heightM = payload.numbers.height / 100;
      bmi = Math.round((payload.numbers.weight / (heightM * heightM)) * 10) / 10;
    } else {
      bmi = Math.round(((payload.numbers.weight * 703) / (payload.numbers.height * payload.numbers.height)) * 10) / 10;
    }
    bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy Weight' : bmi < 30 ? 'Elevated Weight' : 'Higher Weight';
  }

  const record: ClientAnonymousRecord = {
    id: anonId,
    timestamp,
    ageBand,
    completedCheck: !!payload.completedCheck,
    answers: payload.answers,
    numbers: payload.numbers,
    bmi,
    bmiCategory,
    source: 'WIMBIZ Conference PWA',
  };

  // 1. Update local storage cache
  try {
    const existing = loadLocalAnonymousRecords();
    const idx = existing.findIndex((r) => r.id === anonId);
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...record };
    } else {
      existing.unshift(record);
    }
    localStorage.setItem(STORAGE_LOCAL_RECORDS, JSON.stringify(existing));
  } catch (e) {
    console.error(e);
  }

  // 2. Submit to backend / MongoDB API asynchronously
  try {
    await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
  } catch (e) {
    // Graceful offline behavior: preserved locally
  }
}

export async function seedDemoRecordsOnServer(): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/seed', { method: 'POST' });
    return res.ok;
  } catch {
    return false;
  }
}
