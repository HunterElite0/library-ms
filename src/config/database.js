const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  queueLimit: 0
}).promise();

async function connectWithRetry(retries = 10, delay = 30000) {
  for (let i = 0; i < retries; i++) {
    try {
      // Test if connectionn is established successfully
      await pool.query('SELECT 1');
      console.log('Successfully connected to MySQL database');
      return pool;
    } catch (err) {
      // If connection fails, log the error and retry
      if (i === retries - 1) throw err;
      console.log(`Connection attempt ${i + 1} failed. Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

module.exports = {
  dbConnect: connectWithRetry,
  pool,
};
