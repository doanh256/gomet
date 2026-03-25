import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import swipeRoutes from './routes/swipes.js';
import uploadRoutes from './routes/upload.js';
import datePostRoutes from './routes/datePosts.js';
import dateAppRoutes from './routes/dateApplications.js';
import conversationRoutes from './routes/conversations.js';
import walletRoutes from './routes/wallet.js';
import adminRoutes from './routes/admin.js';
import blockReportRoutes from './routes/blockReport.js';
import passwordResetRoutes from './routes/passwordReset.js';
import venueRoutes from './routes/venues.js';
import movieRoutes from './routes/movies.js';
import eventRoutes from './routes/events.js';
import algorithmRoutes from './routes/algorithms.js';
import mapRoutes from './routes/map.js';
import searchRoutes from './routes/search.js';
import { setupSocket } from './socket.js';

export const prisma = new PrismaClient();

const app = express();
const httpServer = createServer(app);
const isProd = process.env.NODE_ENV === 'production';
const RAILWAY_URL = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : null;
const allowedOrigins = isProd
  ? [
      'https://gomet.vn',
      'https://www.gomet.vn',
      ...(RAILWAY_URL ? [RAILWAY_URL] : []),
    ]
  : ['http://localhost:5173', 'http://localhost:4173'];

const io = new Server(httpServer, {
  cors: { origin: allowedOrigins, credentials: true },
});

// Middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'server', 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', passwordResetRoutes);
app.use('/api/users', blockReportRoutes);
app.use('/api/users', userRoutes);
app.use('/api/swipes', swipeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/date-posts', datePostRoutes);
app.use('/api/date-applications', dateAppRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/algorithms', algorithmRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/search', searchRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
  const debugDistPath = path.resolve(__dirname, '..', 'dist');
  const debugIndexFile = path.join(debugDistPath, 'index.html');
  const debugDistExists = fs.existsSync(debugDistPath);
  const debugIndexExists = fs.existsSync(debugIndexFile);
  let files = [];
  let indexPreview = '';
  if (debugDistExists) {
    files = fs.readdirSync(debugDistPath);
    if (debugIndexExists) indexPreview = fs.readFileSync(debugIndexFile, 'utf8').substring(0, 500);
  }
  res.json({ distPath: debugDistPath, distExists: debugDistExists, indexExists: debugIndexExists, files, indexPreview, cwd: process.cwd(), dirname: __dirname });
});

// Socket.io
setupSocket(io);

// Serve static frontend - always serve dist/ if it exists
const distPath = path.resolve(__dirname, '..', 'dist');
const indexFile = path.join(distPath, 'index.html');
const distExists = fs.existsSync(distPath);
const indexExists = fs.existsSync(indexFile);

console.log('Static files - distPath:', distPath);
console.log('Static files - dist/ exists:', distExists);
console.log('Static files - index.html exists:', indexExists);

if (indexExists) {
  const content = fs.readFileSync(indexFile, 'utf8');
  console.log('Static files - index.html has /assets/ refs:', content.includes('/assets/'));

  // Serve built assets (CSS, JS, images from dist/)
  app.use(express.static(distPath));

  // SPA catch-all - serve dist/index.html for all non-API routes
  app.get('{*path}', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/socket.io')) {
      return next();
    }
    res.sendFile(indexFile);
  });
} else {
  console.log('WARNING: dist/index.html not found. Frontend will not be served.');
  console.log('Run "npm run build" to generate the dist/ folder.');
}

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Gomet API server running on http://localhost:${PORT}`);

  // Start Bot Engine in production
  if (process.env.NODE_ENV === 'production') {
    import('./botEngine.js').then(() => {
      console.log('🤖 Bot Engine started in background');
    }).catch(e => {
      console.log('Bot Engine skipped:', e.message);
    });
  }
});
