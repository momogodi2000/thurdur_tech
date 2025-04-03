const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool for MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'thunder_tech_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Database connected successfully!');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error connecting to MySQL database:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};