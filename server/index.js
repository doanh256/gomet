import express from 'express';
import cors from 'cors';
import path from 'path';
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
import { setupSocket } from './socket.js';

export const prisma = new PrismaClient();

const app = express();
const httpServer = createServer(app);
const isProd = process.env.NODE_ENV === 'production';
const allowedOrigins = isProd
  ? ['https://gomet.vn', 'https://www.gomet.vn']
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Debug endpoint
app.get('/api/debug', async (req, res) => {
  const fs = await import('fs');
  const distPath = path.resolve(__dirname, '..', 'dist');
  const indexFile = path.join(distPath, 'index.html');
  const distExists = fs.existsSync(distPath);
  const indexExists = fs.existsSync(indexFile);
  let files = [];
  let indexPreview = '';
  if (distExists) {
    files = fs.readdirSync(distPath);
    if (indexExists) indexPreview = fs.readFileSync(indexFile, 'utf8').substring(0, 500);
  }
  res.json({ distPath, distExists, indexExists, files, indexPreview, cwd: process.cwd(), dirname: __dirname });
});

// Socket.io
setupSocket(io);

// Serve static frontend in production
if (isProd) {
  const distPath = path.resolve(__dirname, '..', 'dist');
  const indexFile = path.join(distPath, 'index.html');

  // Check if dist exists
  import('fs').then(fs => {
    const exists = fs.existsSync(indexFile);
    console.log('📁 Dist path:', distPath);
    console.log('📁 index.html exists:', exists);
    if (exists) {
      const content = fs.readFileSync(indexFile, 'utf8');
      console.log('📁 index.html has assets:', content.includes('/assets/'));
    }
  });

  // Serve built assets (CSS, JS, images from dist/)
  app.use(express.static(distPath));

  // SPA catch-all - serve dist/index.html for all non-API routes
  app.get('{*path}', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/socket.io')) {
      return next();
    }
    res.sendFile(indexFile);
  });
}

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Gomet API server running on http://localhost:${PORT}`);
});
