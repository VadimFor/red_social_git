const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: '192.168.18.87',
  database: 'mydatabase',
  password: 'root',
  port: 5432,
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Connected to DB:', res.rows[0]);
  } catch (err) {
    console.error('❌ Connection error:', err);
  }
})();