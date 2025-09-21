// Simple HTTP Basic Auth middleware for /api/visits
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || '***REMOVED***';
function basicAuth(req, res, next) {
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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://arthalimi.netlify.app',
    'https://www.arthalimi.netlify.app'
  ],
  credentials: true
}));

// MySQL connection pool with SSL support for Aiven Cloud and CA cert
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_SSL === 'true' ? {
    ca: fs.readFileSync('./ca.pem'),
    rejectUnauthorized: true
  } : undefined
});

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
