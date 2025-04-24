// server.js
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
  user: 'root',
  host: '127.0.0.1',
  database: 'mydatabase',
  password: 'root',
  port: 5432,
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(`Trying login with username: ${username} and password: ${password}`);
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ success: true });
      console.log(`Login successful for user: ${username}`);
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      console.log(`Login failed for user: ${username}`);
    }
  } catch (error) {
    console.log(`Error during login: ${error.message}`);
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ GET all users route
app.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.status(200).json(result.rows);
      console.log('Fetched all users');
    } catch (error) {
      console.log(`Error fetching users: ${error.message}`);
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});