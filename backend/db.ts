import { MongoClient, Db, Collection } from 'mongodb';
import { config } from './config';
import {
  getHealthQuestions,
  QUESTION_MAP,
  isSafetyTriggerAnswer,
} from '../src/data/questions';

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

// Dynamically seed sample records from the active form definition in src/data/questions.ts
// so any adjustment to form questions is automatically reflected in seeded records.
function seedInitialConferenceData(forceReset = false) {
  if (fallbackRecords.length > 0 && !forceReset) return;
  if (forceReset) {
    fallbackRecords.length = 0;
  }

  const ageQuestion = QUESTION_MAP['q1_age'];
  const sampleAgeBands =
    ageQuestion && ageQuestion.options.length > 0
      ? ageQuestion.options.map((o) => o.id)
      : ['18_29', '30_39', '40_49', '50_plus'];

  const now = Date.now();
  for (let i = 1; i <= 24; i++) {
    const age = sampleAgeBands[i % sampleAgeBands.length];
    const timestamp = new Date(now - i * 14 * 60 * 1000).toISOString();

    const answers: Record<string, string> = {
      q1_age: age,
    };

    // Get the exact set of questions that a participant in this age band sees on the form
    const formQuestionsForParticipant = getHealthQuestions(answers);

    for (let qIdx = 0; qIdx < formQuestionsForParticipant.length; qIdx++) {
      const q = formQuestionsForParticipant[qIdx];
      if (q.id === 'q1_age') {
        answers[q.id] = age;
        continue;
      }

      if (!q.options || q.options.length === 0) continue;

      // For safety questions (e.g. phq9_self_harm), default to the safe 'doing_well' option
      if (q.isSafetyQuestion || q.id === 'phq9_self_harm') {
        const safeOpt =
          q.options.find((o) => o.type === 'doing_well' || o.id === 'not_at_all' || o.id === 'no') ||
          q.options[0];
        answers[q.id] = safeOpt.id;
        continue;
      }

      // Distribute responses realistically across options (weighted toward doing_well / neutral / worth_checking)
      const doingWellOpts = q.options.filter((o) => o.type === 'doing_well');
      const worthCheckingOpts = q.options.filter((o) => o.type === 'worth_checking');
      const discussOpts = q.options.filter((o) => o.type === 'discuss');

      let chosenId: string;
      const roll = (i + qIdx * 3) % 10;
      if (roll < 5 && doingWellOpts.length > 0) {
        chosenId = doingWellOpts[(i + qIdx) % doingWellOpts.length].id;
      } else if (roll < 8 && worthCheckingOpts.length > 0) {
        chosenId = worthCheckingOpts[(i + qIdx) % worthCheckingOpts.length].id;
      } else if (discussOpts.length > 0 && roll === 9) {
        chosenId = discussOpts[(i + qIdx) % discussOpts.length].id;
      } else {
        chosenId = q.options[(i + qIdx) % q.options.length].id;
      }

      answers[q.id] = chosenId;
    }

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

    // Synchronize seeded conference records so any newly added/updated form questions are present
    if (fallbackRecords.length > 0) {
      const existingCount = await recordsCollection.countDocuments();
      if (existingCount === 0) {
        await recordsCollection.insertMany(fallbackRecords);
        console.log(`[MongoDB] Synchronized ${fallbackRecords.length} initial records into collection.`);
      } else {
        // Ensure initial seeded booth records (HH-1001..HH-1024) in MongoDB have current question mappings
        for (const rec of fallbackRecords) {
          await recordsCollection.updateOne(
            { id: rec.id, source: 'WIMBIZ Conference Booth' },
            { $set: { answers: rec.answers, ageBand: rec.ageBand } },
            { upsert: false }
          );
        }
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
    const ageVal = r.answers?.['q1_age'] || r.ageBand;
    if (ageVal) {
      ageDistribution[ageVal] = (ageDistribution[ageVal] || 0) + 1;
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

    // Answers per question (only counting active form questions in QUESTION_MAP)
    if (r.answers) {
      let recordTriggeredSafety = false;
      for (const [qId, optionId] of Object.entries(r.answers)) {
        if (!QUESTION_MAP[qId]) continue;
        if (!questionResponses[qId]) {
          questionResponses[qId] = {};
        }
        questionResponses[qId][optionId] = (questionResponses[qId][optionId] || 0) + 1;

        if (isSafetyTriggerAnswer(qId, optionId)) {
          recordTriggeredSafety = true;
        }
      }
      if (recordTriggeredSafety) {
        safetyTriggerCount++;
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
  seedInitialConferenceData(true);
  if (isConnectedToMongo && recordsCollection && fallbackRecords.length > 0) {
    try {
      for (const rec of fallbackRecords) {
        await recordsCollection.updateOne(
          { id: rec.id },
          { $set: rec },
          { upsert: true }
        );
      }
    } catch (e) {
      console.error('[MongoDB Seed Sync Error]', e);
    }
  }
}

