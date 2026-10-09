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
}

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
};
