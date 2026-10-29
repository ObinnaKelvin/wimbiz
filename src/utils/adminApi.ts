import { HealthNumbers } from '../types';

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
  totalResponders: number;
  options: {
    optionId: string;
    label: string;
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
    return null;
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

  // Client-side fallback generation with xlsx
  const XLSX = await import('xlsx');
  const sourceRecords = records && records.length > 0 ? records : await fetchAdminRecords();
  const wb = XLSX.utils.book_new();

  const OCCUPATION_MAP: Record<string, string> = {
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
  };

  const flatRows = sourceRecords.map((r) => ({
    'Participant ID': r.id,
    'Timestamp (UTC)': r.timestamp,
    'Occupation Category': r.answers?.['q0_occupation'] ? (OCCUPATION_MAP[r.answers['q0_occupation']] || r.answers['q0_occupation']) : 'N/A',
    'Age Band': r.ageBand || r.answers?.['q1_age'] || 'N/A',
    'Check Completed': r.completedCheck ? 'Yes' : 'In-Progress',
    'Systolic BP (mmHg)': r.numbers?.systolic ?? '',
    'Diastolic BP (mmHg)': r.numbers?.diastolic ?? '',
    'Blood Glucose': r.numbers?.bloodSugar ?? '',
    'Glucose Type': r.numbers?.sugarType ?? '',
    'Height (cm/in)': r.numbers?.height ?? '',
    'Weight (kg/lbs)': r.numbers?.weight ?? '',
    'BMI (kg/m²)': r.bmi ?? '',
    'BMI Category': r.bmiCategory ?? '',
    ...r.answers,
  }));

  const ws = XLSX.utils.json_to_sheet(flatRows);
  XLSX.utils.book_append_sheet(wb, ws, 'User Responses Data');

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
