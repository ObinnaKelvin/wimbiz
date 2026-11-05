import dotenv from 'dotenv';

dotenv.config();

export interface ServerConfig {
  port: number;
  nodeEnv: string;
  mongo: {
    uri: string;
    dbName: string;
    collectionName: string;
    connectTimeoutMs: number;
  };
  admin: {
    email: string;
    passwordHash: string; // Plain comparison or hashed
    sessionSecret: string;
    role: string;
  };
  email: {
    receivingEmail: string;
    ccEmails: string;
    fromAddress: string;
    resend: {
      apiKey: string;
      fromAddress: string;
    };
    smtp: {
      host: string;
      port: number;
      secure: boolean;
      user: string;
      pass: string;
    };
  };
}

function sanitizeSmtpHost(rawHost: string): string {
  const host = rawHost.trim();
  // Redirect legacy / unresolvable host to verified Iwosan cPanel mail server
  if (host === 'smtp.iwosanwellness.com' || host === 'smtp.office365.com') {
    return 'server343-5.web-hosting.com';
  }
  return host || 'server343-5.web-hosting.com';
}

const resolvedSmtpHost = sanitizeSmtpHost(process.env.SMTP_HOST || 'server343-5.web-hosting.com');
const isOffice365Host = resolvedSmtpHost.includes('office365.com') || resolvedSmtpHost.includes('outlook.com');
const parsedPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
const resolvedSmtpPort = isOffice365Host ? 587 : (parsedPort || 465);
const resolvedSmtpSecure = isOffice365Host ? false : (process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : resolvedSmtpPort === 465);

const detectedResendKey =
  process.env.RESEND_API_KEY?.trim() ||
  (process.env.SMTP_PASS?.trim().startsWith('re_') ? process.env.SMTP_PASS.trim() : '');

export const config: ServerConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongo: {
    uri: process.env.MONGODB_URI || '',
    dbName: process.env.MONGODB_DB_NAME || 'iwosan_herhealth',
    collectionName: 'anonymous_health_records',
    connectTimeoutMs: 5000,
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@iwosan.com',
    passwordHash: process.env.ADMIN_PASSWORD || 'IwosanAdmin2026!',
    sessionSecret: process.env.ADMIN_SESSION_SECRET || 'iwosan-herhealth-wimbiz-secure-admin-session-2026',
    role: 'Clinical Research Administrator',
  },
  email: {
    receivingEmail: process.env.CONCIERGE_RECEIVING_EMAIL || 'hello@iwosanwellness.com',
    ccEmails: process.env.CONCIERGE_CC_EMAILS || 'okereobinna11@gmail.com',
    fromAddress: process.env.RESEND_FROM_EMAIL || process.env.SMTP_FROM || 'Iwosan Concierge <hello@iwosanwellness.com>',
    resend: {
      apiKey: detectedResendKey,
      fromAddress: process.env.RESEND_FROM_EMAIL || process.env.SMTP_FROM || 'Iwosan Concierge <hello@iwosanwellness.com>',
    },
    smtp: {
      host: resolvedSmtpHost,
      port: resolvedSmtpPort,
      secure: resolvedSmtpSecure,
      user: process.env.SMTP_USER || 'hello@iwosanwellness.com',
      pass: process.env.SMTP_PASS || 'sNgS1N3;2V+%6^G0',
    },
  },
};

