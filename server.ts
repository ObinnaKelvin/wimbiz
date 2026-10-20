import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { apiRouter } from './backend/routes';
import { initDatabase } from './backend/db';

dotenv.config();

// Guard Node.js console against [vite] noise in server logs
const origNodeError = console.error;
const origNodeWarn = console.warn;
console.error = function (...args: any[]) {
  if (args.some((arg) => typeof arg === 'string' && (arg.includes('[vite]') || arg.includes('vite:')))) return;
  return origNodeError.apply(console, args as any);
};
console.warn = function (...args: any[]) {
  if (args.some((arg) => typeof arg === 'string' && (arg.includes('[vite]') || arg.includes('vite:')))) return;
  return origNodeWarn.apply(console, args as any);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // JSON and form parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Initialize MongoDB connection asynchronously with local resilient storage
  initDatabase().catch(() => {
    // Graceful in-memory and local storage active
  });

  // Mount backend API routes on /api
  app.use('/api', apiRouter);

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Wellness Passport Backend',
      timestamp: new Date().toISOString(),
    });
  });

  // Dev mode vs Production mode
  if (process.env.NODE_ENV !== 'production') {
    const customLogger = {
      hasWarned: false,
      info: () => {},
      warn: () => {},
      warnOnce: () => {},
      error: () => {},
      clearScreen: () => {},
      hasErrorLogged: () => false,
    };
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
      logLevel: 'silent',
      customLogger,
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built dist directory
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Wellness Passport] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
