// Simple HTTP Basic Auth middleware for /api/visits.
// Credentials are read per request (dotenv is loaded further down) and there is
// no built-in login: without ADMIN_USER and ADMIN_PASS the analytics endpoint stays locked.
function basicAuth(req, res, next) {
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;
  if (!ADMIN_USER || !ADMIN_PASS) {
    return res.status(503).send('Analytics login is disabled: set ADMIN_USER and ADMIN_PASS.');
  }
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Analytics"');
    return res.status(401).send('Authentication required.');
  }
  const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  if (user === ADMIN_USER && pass === ADMIN_PASS) return next();
  res.set('WWW-Authenticate', 'Basic realm="Analytics"');
  return res.status(401).send('Invalid credentials.');
}
// Express server for analytics backend

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import fs from 'fs';

console.log('[Startup] Backend starting...');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://arthalimi.com',
    'https://www.arthalimi.com'
  ],
  credentials: true
}));


// MySQL connection pool with error handling
let pool;
try {
  let sslConfig = undefined;
  if (process.env.DB_SSL === 'true') {
    try {
      sslConfig = {
        ca: fs.readFileSync('./ca.pem'),
        rejectUnauthorized: true
      };
    } catch (sslErr) {
      console.error('[Startup] Failed to read ca.pem for SSL:', sslErr);
      process.exit(1);
    }
  }
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: sslConfig
  });
  console.log('[Startup] MySQL pool created successfully.');
} catch (err) {
  console.error('[Startup] Error creating MySQL pool:', err);
  process.exit(1);
}

// POST /api/visit - record a new visit
app.post('/api/visit', async (req, res) => {
  try {
    const { country, timestamp, page } = req.body;
    if (!country || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await pool.query(
      'INSERT INTO visits (country, timestamp, page) VALUES (?, ?, ?)',
      [country, timestamp, page || null]
    );
    res.status(201).json({ message: 'Visit recorded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/visits - fetch analytics data (protected)
app.get('/api/visits', basicAuth, async (req, res) => {
  try {
    // Example: fetch all visits (for demo, aggregate on frontend)
    const [rows] = await pool.query('SELECT * FROM visits');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Analytics backend running');
});

app.listen(PORT, () => {
  console.log(`Analytics backend listening on port ${PORT}`);
});

  // Keep-alive: ping the backend every 5 minutes to prevent Render spin-down

  const KEEP_ALIVE_INTERVAL = 5 * 60 * 1000; // 5 minutes in ms
  const SELF_URL = process.env.KEEP_ALIVE_URL || 'https://arti-analytics.onrender.com';

  function keepAlive() {
    fetch(SELF_URL)
      .then(res => res.text())
      .then(text => console.log(`[KeepAlive] Pinged self: ${text}`))
      .catch(err => console.error('[KeepAlive] Error pinging self:', err));
  }

  setInterval(keepAlive, KEEP_ALIVE_INTERVAL);
