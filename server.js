const express = require('express');
const path = require('path');
const fs = require('fs');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Database & Seed Init
const { initSchema } = require('./database/db');
const { seedDatabase } = require('./database/seed');

// Security & Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS Middleware (allowing universal cross-device / public access)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request Logging in Dev/Test
app.use((req, res, next) => {
  if (!req.path.startsWith('/css') && !req.path.startsWith('/js') && !req.path.startsWith('/assets')) {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
  }
  next();
});

// Static Client Asset Serving
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// ==========================================
// API ROUTES MOUNTING
// ==========================================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/academics', require('./routes/academicRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/fees', require('./routes/feeRoutes'));
app.use('/api/timetable', require('./routes/timetableRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));

// Institutional System Health & Deployment Readiness Probe
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    system: 'College Management System (Monolith)',
    architecture: 'Single Deployable Unit',
    uptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMB: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
    nodeVersion: process.version
  });
});

// Single Page Application (SPA) Fallback (Path-to-regexp 6+ compatible)
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'API route not found.' });
  }
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Centralized Error Handler
app.use(require('./middleware/errorHandler'));

// Server Startup
async function startServer() {
  try {
    // Ensure DB Schema and seed data are ready
    await initSchema();
    await seedDatabase();

    const server = app.listen(PORT, HOST, () => {
      console.log('================================================================');
      console.log('🎓 APEX COLLEGE MANAGEMENT SYSTEM (MONOLITHIC SINGLE DEPLOYABLE)');
      console.log(`🌐 Server active & listening at: http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
      console.log(`🚀 Ready for public cloud deployment (Render, Railway, Docker)`);
      console.log('================================================================');
    });

    // Graceful Shutdown
    const shutdown = () => {
      console.log('\n🛑 Gracefully shutting down College Management System...');
      server.close(() => {
        console.log('👋 HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;
