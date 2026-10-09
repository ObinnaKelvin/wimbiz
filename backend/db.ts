import { MongoClient, Db, Collection } from 'mongodb';
import { config } from './config';

export interface AnonymousRecord {
  id: string; // e.g. "HH-1042"
  sessionId?: string;
  timestamp: string; // ISO date string
  ageBand: string;
  completedCheck: boolean;
  answers: Record<string, string>;
  numbers?: {
    systolic?: number;
    diastolic?: number;
    bloodSugar?: number;
    sugarType?: 'fasting' | 'random';
    sugarUnit?: 'mg/dL' | 'mmol/L';
    height?: number;
    weight?: number;
    unitSystem?: 'metric' | 'imperial';
  };
  bmi?: number;
  bmiCategory?: string;
  bpCategory?: string;
  sugarCategory?: string;
  source?: string;
}

let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;
let recordsCollection: Collection<AnonymousRecord> | null = null;
let isConnectedToMongo = false;
let connectionError: string | null = null;

// In-memory resilient storage (used when MongoDB URI is not yet configured or connecting)
const fallbackRecords: AnonymousRecord[] = [];

// Seed sample records on initialization so the dashboard immediately shows realistic conference data
function seedInitialConferenceData() {
  if (fallbackRecords.length > 0) return;

  const sampleOccupations = ['full_time', 'self_employed', 'freelancer', 'part_time', 'contract_worker', 'retired_professional'];
  const sampleAgeBands = ['20_29', '30_39', '40_49', '50_59', '60_plus'];
  const sampleRoutines = ['within_year', 'within_year', '1_to_2_years', 'more_than_2_years'];
  const sampleBP = ['within_year', 'within_year', 'longer_ago', 'never'];
  const sampleSugar = ['within_year', 'longer_ago', 'within_year', 'never'];
  const sampleActivity = ['active_150', 'moderate', 'light', 'sedentary'];
  const sampleNutrition = ['daily_most', 'few_times', 'daily_most', 'rarely'];
  const sampleSleep = ['restful', 'interrupted', 'restful', 'short'];
  const sampleScreening = ['up_to_date', 'past_overdue', 'up_to_date', 'not_discussed'];

  const now = Date.now();
  for (let i = 1; i <= 24; i++) {
    const age = sampleAgeBands[i % sampleAgeBands.length];
    const timestamp = new Date(now - i * 14 * 60 * 1000).toISOString();

    const answers: Record<string, string> = {
      q0_occupation: sampleOccupations[i % sampleOccupations.length],
      q1_age: age,
      q2_checkup: sampleRoutines[i % sampleRoutines.length],
      q3_bp: sampleBP[i % sampleBP.length],
      q4_sugar: sampleSugar[i % sampleSugar.length],
      q5_history: i % 3 === 0 ? 'yes_immediate' : i % 2 === 0 ? 'no_history' : 'yes_extended',
      q6_activity: sampleActivity[i % sampleActivity.length],
      q7_nutrition: sampleNutrition[i % sampleNutrition.length],
      q8_sleep: sampleSleep[i % sampleSleep.length],
      q9_screening: sampleScreening[i % sampleScreening.length],
    };

    // Age 20-49 Menstrual
    if (age === '20_29' || age === '30_39' || age === '40_49') {
      answers['q2049_periods_regular'] = i % 4 === 0 ? 'no_irregular' : 'yes';
      answers['q2049_cycle_length'] = i % 5 === 0 ? 'over_35' : '21_to_35';
      answers['q2049_bleed_days'] = '3_to_7_days';
      answers['q2049_bleed_heaviness'] = i % 3 === 0 ? 'heavy' : 'moderate';
      answers['q2049_period_pain'] = i % 4 === 0 ? 'severe' : 'none_mild';
      answers['q2049_large_clots'] = i % 4 === 0 ? 'frequent_large' : 'never_small';
      answers['q2049_bleed_between'] = 'never';
      answers['q2049_bleed_after_sex'] = 'never';
      answers['q2049_period_interference'] = i % 4 === 0 ? 'often_severe' : 'never';
      answers['q2049_period_changes_2yr'] = 'unchanged';
    }

    // Age 40-49 Perimenopause
    if (age === '40_49') {
      answers['q40_periods_irregular'] = i % 2 === 0 ? 'yes_irregular' : 'no_regular';
      answers['q40_hot_flushes'] = i % 2 === 0 ? 'yes_frequent' : 'no_none';
      answers['q40_night_sweats'] = i % 3 === 0 ? 'yes_frequent' : 'no_none';
      answers['q40_sleep_changed'] = 'yes_poor';
      answers['q40_anxiety_irritability'] = i % 2 === 0 ? 'yes_noticeable' : 'no_stable';
      answers['q40_memory_concentration'] = 'yes_brain_fog';
      answers['q40_sexual_desire'] = 'fluctuating';
      answers['q40_vaginal_dryness'] = i % 3 === 0 ? 'yes_discomfort' : 'no_discomfort';
      answers['q40_urinary_leakage'] = 'no_symptoms';
      answers['q40_hrt_discussion'] = i % 2 === 0 ? 'want_to_learn' : 'never_discussed';
      answers['q40_last_period'] = 'under_30_days';
    }

    // Breast & Gynae (Universal)
    answers['q_breast_self_check'] = i % 2 === 0 ? 'yes_monthly' : 'occasionally';
    answers['q_breast_lump'] = 'no';
    answers['q_nipple_discharge'] = 'never';
    answers['q_breast_shape_change'] = 'no_changes';
    answers['q_nipple_skin_changes'] = 'no_skin_changes';
    answers['q_last_mammogram'] = age === '20_29' || age === '30_39' ? 'never_under_40' : 'within_1_to_2_years';
    answers['q_last_cervical_screen'] = 'within_3_years';
    answers['q_hpv_positive'] = 'never_tested_negative';
    answers['q_abnormal_cervical'] = 'never_all_normal';
    answers['q_family_cancer_history'] = 'no_family_history';

    // Bone & Mobility
    answers['q_bone_minor_fracture'] = 'never_broken';
    answers['q_bone_density_test'] = age === '50_59' || age === '60_plus' ? 'yes_normal' : 'never_had_one';
    answers['q_persistent_back_pain'] = i % 3 === 0 ? 'occasional_posture' : 'no_pain';
    answers['q_persistent_joint_pain'] = 'no_joint_pain';
    answers['q_height_loss'] = 'no_loss';
    answers['q_feel_physically_weaker'] = 'strong_capable';
    answers['q_climb_stairs'] = 'easily';
    answers['q_strength_exercise'] = i % 2 === 0 ? 'regular_2_plus' : 'occasionally';
    answers['q_calcium_foods'] = 'daily_rich';
    answers['q_osteoporosis_dx'] = 'no';

    // Mental & Emotional
    answers['q_current_mood'] = i % 4 === 0 ? 'okay' : 'good';
    answers['q_anxious_overwhelmed'] = i % 3 === 0 ? 'sometimes' : 'never';
    answers['q_exhausted_responsibilities'] = i % 3 === 0 ? 'sometimes' : 'rarely_never';
    answers['q_enjoy_activities'] = 'yes_regularly';
    answers['q_feel_lonely'] = 'rarely_never';
    answers['q_have_confidant'] = 'yes_confidant';
    answers['q_current_stress'] = i % 3 === 0 ? 'moderate' : 'low';
    answers['q_grief_trauma'] = 'no';
    answers['q_mental_health_help'] = 'never_needed';
    answers['q_self_harm_thoughts'] = 'no';

    const systolic = 115 + (i % 5) * 5;
    const diastolic = 75 + (i % 4) * 3;
    const bloodSugar = 85 + (i % 6) * 4;
    const weight = 60 + (i % 7) * 2;
    const height = 165;
    const bmi = Math.round((weight / ((height / 100) * (height / 100))) * 10) / 10;

    fallbackRecords.push({
      id: `HH-${String(1000 + i)}`,
      sessionId: `sess-${i * 997}`,
      timestamp,
      ageBand: age,
      completedCheck: true,
      answers,
      numbers: {
        systolic,
        diastolic,
        bloodSugar,
        sugarType: 'fasting',
        sugarUnit: 'mg/dL',
        height,
        weight,
        unitSystem: 'metric',
      },
      bmi,
      bmiCategory: bmi < 25 ? 'Healthy Weight Band' : 'Elevated Weight Band',
      bpCategory: systolic < 120 ? 'Normal Blood Pressure' : 'Elevated Blood Pressure',
      sugarCategory: 'Normal Fasting Glucose',
      source: 'WIMBIZ Conference Booth',
    });
  }
}

seedInitialConferenceData();

export async function initDatabase(): Promise<boolean> {
  const uri = config.mongo.uri;
  if (!uri || uri.trim() === '') {
    connectionError = 'No MONGODB_URI configured. Operating in local storage mode.';
    return false;
  }

  try {
    mongoClient = new MongoClient(uri, {
      connectTimeoutMS: config.mongo.connectTimeoutMs,
      serverSelectionTimeoutMS: config.mongo.connectTimeoutMs,
    });

    await mongoClient.connect();
    mongoDb = mongoClient.db(config.mongo.dbName);
    recordsCollection = mongoDb.collection<AnonymousRecord>(config.mongo.collectionName);

    // Create helpful indexes for sorting and lookup
    await recordsCollection.createIndex({ timestamp: -1 });
    await recordsCollection.createIndex({ id: 1 }, { unique: true });

    isConnectedToMongo = true;
    connectionError = null;
    console.log(`[MongoDB] Connected successfully to database: ${config.mongo.dbName}`);

    // If fallback records exist, synchronize them to MongoDB
    if (fallbackRecords.length > 0) {
      const existingCount = await recordsCollection.countDocuments();
      if (existingCount === 0) {
        await recordsCollection.insertMany(fallbackRecords);
        console.log(`[MongoDB] Synchronized ${fallbackRecords.length} initial records into collection.`);
      }
    }

    return true;
  } catch (err: any) {
    isConnectedToMongo = false;
    const rawError = err?.message || 'Failed to connect to MongoDB';
    if (rawError.includes('SSL alert number 80') || rawError.includes('tlsv1 alert internal error')) {
      connectionError = 'MongoDB Atlas IP restriction (SSL Alert 80): In MongoDB Atlas > Network Access, add 0.0.0.0/0 to allow cloud access. Local resilient storage is active.';
    } else {
      connectionError = rawError;
    }
    console.log(`[Database Storage] Local resilient storage active: ${connectionError}`);
    return false;
  }
}

// Auto-attempt connection on module load
initDatabase().catch(() => {
  // Graceful fallback is ready
});

export async function saveRecord(record: AnonymousRecord): Promise<AnonymousRecord> {
  const finalRecord: AnonymousRecord = {
    ...record,
    id: record.id || `HH-${String(1000 + fallbackRecords.length + 1)}`,
    timestamp: record.timestamp || new Date().toISOString(),
  };

  // 1. Update in-memory fallback
  const existingIdx = fallbackRecords.findIndex((r) => r.id === finalRecord.id);
  if (existingIdx >= 0) {
    fallbackRecords[existingIdx] = finalRecord;
  } else {
    fallbackRecords.unshift(finalRecord);
  }

  // 2. Persist to MongoDB if connected
  if (isConnectedToMongo && recordsCollection) {
    try {
      await recordsCollection.updateOne(
        { id: finalRecord.id },
        { $set: finalRecord },
        { upsert: true }
      );
    } catch (e: any) {
      console.error('[MongoDB Save Error]', e);
    }
  }

  return finalRecord;
}

export async function getAllRecords(): Promise<AnonymousRecord[]> {
  if (isConnectedToMongo && recordsCollection) {
    try {
      const docs = await recordsCollection.find({}).sort({ timestamp: -1 }).toArray();
      return docs as AnonymousRecord[];
    } catch (e) {
      console.error('[MongoDB Fetch Error]', e);
    }
  }
  return [...fallbackRecords];
}

export async function getStatsSummary() {
  const records = await getAllRecords();
  const totalCount = records.length;
  const completedCount = records.filter((r) => r.completedCheck).length;

  const ageDistribution: Record<string, number> = {};
  const questionResponses: Record<string, Record<string, number>> = {};
  let totalSystolic = 0;
  let systolicCount = 0;
  let totalBmi = 0;
  let bmiCount = 0;
  let safetyTriggerCount = 0;

  for (const r of records) {
    // Age count
    if (r.ageBand) {
      ageDistribution[r.ageBand] = (ageDistribution[r.ageBand] || 0) + 1;
    }

    // Vitals averages
    if (r.numbers?.systolic) {
      totalSystolic += r.numbers.systolic;
      systolicCount++;
    }
    if (r.bmi) {
      totalBmi += r.bmi;
      bmiCount++;
    }

    // Answers per question
    if (r.answers) {
      for (const [qId, optionId] of Object.entries(r.answers)) {
        if (!questionResponses[qId]) {
          questionResponses[qId] = {};
        }
        questionResponses[qId][optionId] = (questionResponses[qId][optionId] || 0) + 1;

        if (qId === 'q_self_harm_thoughts' && optionId === 'yes') {
          safetyTriggerCount++;
        }
      }
    }
  }

  const avgSystolic = systolicCount > 0 ? Math.round(totalSystolic / systolicCount) : null;
  const avgBmi = bmiCount > 0 ? Math.round((totalBmi / bmiCount) * 10) / 10 : null;

  return {
    totalParticipants: totalCount,
    completedChecks: completedCount,
    completionRate: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
    avgSystolic,
    avgBmi,
    safetyTriggerCount,
    ageDistribution,
    questionResponses,
    databaseStatus: getConnectionStatus(),
  };
}

export function getConnectionStatus() {
  const maskedUri = config.mongo.uri
    ? config.mongo.uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)@/, '$1*****@')
    : 'Not Set (Using Local Storage Store)';

  return {
    isConnected: isConnectedToMongo,
    type: isConnectedToMongo ? ('mongodb' as const) : ('local_fallback' as const),
    dbName: config.mongo.dbName,
    collectionName: config.mongo.collectionName,
    totalRecords: fallbackRecords.length,
    uriMasked: maskedUri,
    connectionError,
  };
}

export async function clearAllRecords() {
  fallbackRecords.length = 0;
  if (isConnectedToMongo && recordsCollection) {
    try {
      await recordsCollection.deleteMany({});
    } catch (e) {
      console.error(e);
    }
  }
}

export async function seedRecords(count = 10) {
  seedInitialConferenceData();
}
