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
  // Redirect legacy / unresolvable cPanel host to Office 365
  if (host === 'smtp.iwosanwellness.com') {
    return 'smtp.office365.com';
  }
  return host || 'smtp.office365.com';
}

const resolvedSmtpHost = sanitizeSmtpHost(process.env.SMTP_HOST || 'smtp.office365.com');
const isOffice365Host = resolvedSmtpHost === 'smtp.office365.com' || resolvedSmtpHost.includes('office365.com') || resolvedSmtpHost.includes('outlook.com');
const parsedPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
// Office 365 requires port 587 with STARTTLS (secure: false). Port 465 is not supported by Office 365.
const resolvedSmtpPort = isOffice365Host && (!parsedPort || parsedPort === 465) ? 587 : (parsedPort || 587);
const resolvedSmtpSecure = isOffice365Host ? false : (process.env.SMTP_SECURE === 'true' || resolvedSmtpPort === 465);

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
    receivingEmail: process.env.CONCIERGE_RECEIVING_EMAIL || 'okereobinna11@gmail.com',
    ccEmails: process.env.CONCIERGE_CC_EMAILS || 'wellness@iwosanlagoon.life',
    fromAddress: process.env.SMTP_FROM || 'Iwosan Concierge <concierge@iwosanlagoon.life>',
    smtp: {
      host: resolvedSmtpHost,
      port: resolvedSmtpPort,
      secure: resolvedSmtpSecure,
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },
};

