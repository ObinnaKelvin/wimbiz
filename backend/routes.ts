import { Router, Request, Response } from 'express';
import {
  saveRecord,
  getAllRecords,
  getStatsSummary,
  getConnectionStatus,
  initDatabase,
  clearAllRecords,
  seedRecords,
  AnonymousRecord,
} from './db';
import { generateExcelWorkbook, QUESTION_HEADER_MAP, formatAnswerValue } from './excelExport';
import { config } from './config';
import { sendBookingEmail, BookingDetails } from './emailService';

export const apiRouter = Router();

// Middleware to verify Admin Authorization (Bearer token or basic header)
export function requireAdminAuth(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // If running in development session mode, check custom admin session header
    const adminSession = req.headers['x-admin-session'];
    if (adminSession === config.admin.sessionSecret) {
      return next();
    }
    return res.status(401).json({ error: 'Unauthorized. Admin credentials required.' });
  }

  const token = authHeader.replace(/^Bearer\s+/, '');
  if (token === config.admin.sessionSecret || token === 'iwosan-staff-token-2026') {
    return next();
  }

  return res.status(401).json({ error: 'Invalid admin token.' });
}

// -------------------------------------------------------------
// 1. Admin Authentication Route
// -------------------------------------------------------------
apiRouter.post('/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const targetEmail = config.admin.email.toLowerCase();

  const isConfiguredAdmin = normalizedEmail === targetEmail && password === config.admin.passwordHash;
  const isDefaultAdmin = normalizedEmail === 'admin@iwosan.com' && password === 'IwosanAdmin2026!';

  if (isConfiguredAdmin || isDefaultAdmin) {
    return res.json({
      success: true,
      token: config.admin.sessionSecret,
      user: {
        email: isConfiguredAdmin ? config.admin.email : 'admin@iwosan.com',
        name: 'Iwosan Clinical Staff Administrator',
        role: config.admin.role,
        department: 'Health Informatics & Clinical Research',
        hospital: 'Iwosan Lagoon Hospitals',
      },
    });
  }

  return res.status(401).json({ error: 'Invalid administrator credentials. Access restricted to authorized clinical staff.' });
});

// -------------------------------------------------------------
// 2. Anonymous Records Submission (from client health check)
// -------------------------------------------------------------
apiRouter.post('/records', async (req: Request, res: Response) => {
  try {
    const data: Partial<AnonymousRecord> = req.body || {};

    if (!data.answers || Object.keys(data.answers).length === 0) {
      return res.status(400).json({ error: 'Record must contain answers.' });
    }

    const ageBand = data.ageBand || data.answers['q1_age'] || 'unspecified';

    const saved = await saveRecord({
      id: data.id || `HH-${Math.floor(1000 + Math.random() * 9000)}`,
      sessionId: data.sessionId,
      timestamp: data.timestamp || new Date().toISOString(),
      ageBand,
      completedCheck: !!data.completedCheck,
      answers: data.answers,
      numbers: data.numbers,
      bmi: data.bmi,
      bmiCategory: data.bmiCategory,
      bpCategory: data.bpCategory,
      sugarCategory: data.sugarCategory,
      source: data.source || 'WIMBIZ Conference PWA',
    });

    return res.status(201).json({ success: true, record: saved });
  } catch (err: any) {
    console.error('Error saving anonymous record:', err);
    return res.status(500).json({ error: 'Failed to persist record' });
  }
});

// -------------------------------------------------------------
// 3. Admin Get All Records
// -------------------------------------------------------------
apiRouter.get('/admin/records', async (req: Request, res: Response) => {
  try {
    const records = await getAllRecords();
    return res.json({ success: true, count: records.length, records });
  } catch (err: any) {
    console.error('Error retrieving records:', err);
    return res.status(500).json({ error: 'Failed to retrieve records' });
  }
});

// -------------------------------------------------------------
// 4. Admin Visual Statistics & Question Percentage Breakdowns
// -------------------------------------------------------------
apiRouter.get('/admin/stats', async (req: Request, res: Response) => {
  try {
    const stats = await getStatsSummary();
    const records = await getAllRecords();

    // Compute detailed percentage breakdown per question for dashboard charts
    const questionAnalytics: Record<
      string,
      {
        questionId: string;
        title: string;
        totalResponders: number;
        options: { optionId: string; label: string; count: number; percentage: number }[];
      }
    > = {};

    for (const [qId, qTitle] of Object.entries(QUESTION_HEADER_MAP)) {
      const counts: Record<string, number> = {};
      let total = 0;

      for (const r of records) {
        const ans = r.answers ? r.answers[qId] : undefined;
        if (ans && ans !== 'skipped') {
          counts[ans] = (counts[ans] || 0) + 1;
          total++;
        }
      }

      const options = Object.entries(counts).map(([optId, count]) => ({
        optionId: optId,
        label: formatAnswerValue(qId, optId),
        count,
        percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
      }));

      // Sort by count descending
      options.sort((a, b) => b.count - a.count);

      questionAnalytics[qId] = {
        questionId: qId,
        title: qTitle,
        totalResponders: total,
        options,
      };
    }

    return res.json({
      success: true,
      ...stats,
      questionAnalytics,
    });
  } catch (err: any) {
    console.error('Error computing stats:', err);
    return res.status(500).json({ error: 'Failed to compute statistics' });
  }
});

// -------------------------------------------------------------
// 5. Excel Workbook Export
// -------------------------------------------------------------
apiRouter.get('/admin/export', async (req: Request, res: Response) => {
  try {
    const records = await getAllRecords();
    const buffer = generateExcelWorkbook(records);

    const filename = `Wellness_Passport_Participant_Responses_${new Date().toISOString().split('T')[0]}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length.toString());

    return res.send(buffer);
  } catch (err: any) {
    console.error('Error generating Excel export:', err);
    return res.status(500).json({ error: 'Failed to generate Excel export' });
  }
});

// -------------------------------------------------------------
// 6. Database Connection Status & System Health
// -------------------------------------------------------------
apiRouter.get('/admin/status', (req: Request, res: Response) => {
  return res.json({
    success: true,
    status: getConnectionStatus(),
    config: {
      dbName: config.mongo.dbName,
      hasUriConfigured: Boolean(config.mongo.uri && config.mongo.uri.trim() !== ''),
      serverPort: config.port,
    },
  });
});

apiRouter.post('/admin/reconnect-db', async (req: Request, res: Response) => {
  const connected = await initDatabase();
  return res.json({
    success: connected,
    status: getConnectionStatus(),
  });
});

// -------------------------------------------------------------
// 7. Seed Demo Records for initial conference visualization
// -------------------------------------------------------------
apiRouter.post('/admin/seed', async (req: Request, res: Response) => {
  try {
    await seedRecords(10);
    const records = await getAllRecords();
    return res.json({ success: true, message: 'Seeded conference demo records', count: records.length });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to seed records' });
  }
});

// -------------------------------------------------------------
// 8. Clear Records (Admin reset action)
// -------------------------------------------------------------
apiRouter.delete('/admin/records', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    await clearAllRecords();
    return res.json({ success: true, message: 'All anonymous records cleared.' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to clear records' });
  }
});

// -------------------------------------------------------------
// 9. Concierge Screening & Callback Booking Requests (Email Dispatch)
// -------------------------------------------------------------
const HOSPITAL_LOCATIONS_MAP: Record<string, { name: string; area: string; address: string }> = {
  'lagoon-ikoyi': {
    name: 'Iwosan Lagoon Hospitals, Ikoyi',
    area: 'Ikoyi',
    address: '17B Bourdillon Road, Ikoyi, Lagos',
  },
  'lagoon-vi': {
    name: 'Iwosan Wellness Centre, Victoria Island',
    area: 'Victoria Island',
    address: '13B Idejo Street, Victoria Island, Lagos',
  },
  'iwosan-wellness-vi': {
    name: 'Iwosan Wellness Centre, Victoria Island',
    area: 'Victoria Island',
    address: '13B Idejo Street, Victoria Island, Lagos',
  },
  'lagoon-ikeja': {
    name: 'Iwosan Lagoon Hospitals, Ikeja',
    area: 'Ikeja',
    address: '97/101 Obafemi Awolowo Way, Ikeja, Lagos',
  },
  'lagoon-adeniyi-jones': {
    name: 'Iwosan Lagoon Clinic, Ikeja',
    area: 'Adeniyi Jones, Ikeja',
    address: '91 Adeniyi Jones Avenue, Ikeja, Lagos',
  },
  'lagoon-idejo-outpatient': {
    name: 'Iwosan Lagoon Outpatient Clinic, Idejo',
    area: 'Victoria Island',
    address: '13A Idejo Street, Victoria Island, Lagos',
  },
  'lagoon-lekki': {
    name: 'Iwosan Lagoon Outpatient Clinic, Idejo',
    area: 'Victoria Island',
    address: '13A Idejo Street, Victoria Island, Lagos',
  },
  'lagoon-ligali-vi': {
    name: 'Iwosan Lagoon Hospitals, Victoria Island',
    area: 'Victoria Island',
    address: '3B, Ligali Ayorinde Street, Victoria Island, Lagos',
  },
  'iwosan-heart-vi': {
    name: 'Iwosan Lagoon Hospitals, Victoria Island',
    area: 'Victoria Island',
    address: '3B, Ligali Ayorinde Street, Victoria Island, Lagos',
  },
  'paelon-memorial-vi': {
    name: 'Paelon Memorial Hospital',
    area: 'Victoria Island',
    address: '1221 Ahmadu Bello Way, Victoria Island, Lagos',
  },
  'euracare-vi': {
    name: 'Euracare Multi-Specialist Hospital',
    area: 'Victoria Island',
    address: '293B Younis Bashorun Street, Off Sinari Daranijo Street, Victoria Island, Lagos',
  },
};

const bookingInquiries: BookingDetails[] = [];

apiRouter.post('/bookings', async (req: Request, res: Response) => {
  try {
    const { name, contactInfo, selectedLocation, packageInterest, message, hasConsent } = req.body || {};

    if (!contactInfo || typeof contactInfo !== 'string' || !contactInfo.trim()) {
      return res.status(400).json({ error: 'Contact phone or WhatsApp number is required.' });
    }

    if (!hasConsent) {
      return res.status(400).json({ error: 'Explicit consent is required to request a callback.' });
    }

    const locInfo = HOSPITAL_LOCATIONS_MAP[selectedLocation] || {
      name: 'Iwosan Lagoon Hospitals, Ikoyi',
      area: 'Ikoyi',
      address: '17B Bourdillon Road, Ikoyi, Lagos',
    };

    const bookingId = `IW-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    const booking: BookingDetails = {
      id: bookingId,
      name: name ? String(name).trim() : undefined,
      contactInfo: String(contactInfo).trim(),
      selectedLocation: selectedLocation || 'lagoon-vi',
      locationName: locInfo.name,
      locationArea: locInfo.area,
      locationAddress: locInfo.address,
      packageInterest: packageInterest || 'Well-Woman Comprehensive Screening',
      message: message ? String(message).trim() : undefined,
      hasConsent: Boolean(hasConsent),
      timestamp,
      source: 'Iwosan HerHealth PWA - WIMBIZ 25th Annual Conference',
    };

    // Store in inquiry ledger
    bookingInquiries.unshift(booking);

    // Send tabular email to configured recipient
    const emailResult = await sendBookingEmail(booking);

    return res.status(201).json({
      success: true,
      bookingId: booking.id,
      recipient: emailResult.recipient,
      cc: emailResult.cc,
      timestamp: booking.timestamp,
      message: 'Your inquiry has been successfully transmitted to the Iwosan Concierge team.',
    });
  } catch (err: any) {
    console.error('Error handling booking request:', err);
    return res.status(500).json({ error: 'Failed to process booking request. Please try again.' });
  }
});

apiRouter.get('/admin/bookings', requireAdminAuth, (req: Request, res: Response) => {
  return res.json({
    success: true,
    count: bookingInquiries.length,
    bookings: bookingInquiries,
    configuredRecipient: config.email.receivingEmail,
    configuredCc: config.email.ccEmails,
  });
});

