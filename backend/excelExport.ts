import * as XLSX from 'xlsx';
import { AnonymousRecord } from './db';
import {
  ALL_HEALTH_QUESTIONS,
  QUESTION_HEADER_MAP as FORM_QUESTION_HEADER_MAP,
  formatQuestionAnswer,
} from '../src/data/questions';

// Re-export dynamic question header map from single source of truth (src/data/questions.ts)
export const QUESTION_HEADER_MAP: Record<string, string> = FORM_QUESTION_HEADER_MAP;

// Friendly formatter for raw option codes to clean readable text directly from current form options
export function formatAnswerValue(qId: string, val?: string): string {
  return formatQuestionAnswer(qId, val);
}

export function generateExcelWorkbook(records: AnonymousRecord[]): Buffer {
  const wb = XLSX.utils.book_new();

  // Dynamically read current form questions in strict category & question order
  const currentQuestions = ALL_HEALTH_QUESTIONS;

  // SHEET 1: All User Responses in Columns and Rows
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
    ...currentQuestions.map((q) => q.title),
  ];

  const dataRows: (string | number)[][] = records.map((record) => {
    const row: (string | number)[] = [
      record.id,
      record.timestamp ? new Date(record.timestamp).toLocaleString('en-GB') : '',
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

    for (const q of currentQuestions) {
      const rawVal =
        q.id === 'q1_age'
          ? record.answers?.['q1_age'] || record.ageBand
          : record.answers?.[q.id];
      row.push(formatAnswerValue(q.id, rawVal));
    }

    return row;
  });

  const wsResponses = XLSX.utils.aoa_to_sheet([headerRow, ...dataRows]);

  // Set column widths for comfortable Excel readability
  wsResponses['!cols'] = [
    { wch: 14 }, // ID
    { wch: 20 }, // Timestamp
    { wch: 16 }, // Completed
    { wch: 16 }, // Systolic
    { wch: 16 }, // Diastolic
    { wch: 14 }, // Glucose
    { wch: 18 }, // Glucose Type
    { wch: 12 }, // Height
    { wch: 12 }, // Weight
    { wch: 10 }, // BMI
    { wch: 20 }, // BMI Category
    ...currentQuestions.map((q) => ({ wch: Math.max(26, Math.min(48, q.title.length + 4)) })),
  ];

  XLSX.utils.book_append_sheet(wb, wsResponses, 'User Responses Data');

  // SHEET 2: Statistical Percentages per Question (mapped to current form questions)
  const statsHeaders: string[] = [
    'Category',
    'Question ID',
    'Question Text',
    'Total Responses',
    'Option Answer',
    'Response Count',
    'Percentage (%)',
  ];

  const statsRows: (string | number)[][] = [];

  for (const q of currentQuestions) {
    const distribution: Record<string, number> = {};
    let totalForQuestion = 0;

    for (const r of records) {
      const ans =
        q.id === 'q1_age'
          ? r.answers?.['q1_age'] || r.ageBand
          : r.answers?.[q.id];
      if (ans && ans !== 'skipped') {
        distribution[ans] = (distribution[ans] || 0) + 1;
        totalForQuestion++;
      }
    }

    if (totalForQuestion === 0) {
      for (const opt of q.options) {
        statsRows.push([
          q.categoryLabel,
          q.id,
          q.title,
          0,
          opt.label,
          0,
          '0.0%',
        ]);
      }
    } else {
      const seenOptionIds = new Set<string>();
      for (const opt of q.options) {
        seenOptionIds.add(opt.id);
        const count = distribution[opt.id] || 0;
        const pct = ((count / totalForQuestion) * 100).toFixed(1) + '%';
        statsRows.push([
          q.categoryLabel,
          q.id,
          q.title,
          totalForQuestion,
          opt.label,
          count,
          pct,
        ]);
      }
      // Include any custom/date answers not in static options list
      for (const [optionId, count] of Object.entries(distribution)) {
        if (!seenOptionIds.has(optionId)) {
          const pct = ((count / totalForQuestion) * 100).toFixed(1) + '%';
          statsRows.push([
            q.categoryLabel,
            q.id,
            q.title,
            totalForQuestion,
            formatAnswerValue(q.id, optionId),
            count,
            pct,
          ]);
        }
      }
    }
  }

  const wsPercentages = XLSX.utils.aoa_to_sheet([statsHeaders, ...statsRows]);
  wsPercentages['!cols'] = [
    { wch: 28 }, // Category
    { wch: 26 }, // Question ID
    { wch: 48 }, // Question Text
    { wch: 16 }, // Total Responses
    { wch: 32 }, // Option Answer
    { wch: 16 }, // Response Count
    { wch: 14 }, // Percentage
  ];

  XLSX.utils.book_append_sheet(wb, wsPercentages, 'Question Percentages');

  // Write and return buffer
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  return buffer;
}

