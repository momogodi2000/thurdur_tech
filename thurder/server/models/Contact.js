const { pool } = require('../config/database');

class Contact {
  static async createTable() {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          subject VARCHAR(200) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      await pool.query(createTableQuery);
      console.log('Contacts table initialized successfully');
    } catch (error) {
      console.error('Error creating contacts table:', error.message);
      throw error;
    }
  }

  static async create(contactData) {
    try {
      const { name, email, subject, message } = contactData;
      
      const query = `
        INSERT INTO contacts (name, email, subject, message) 
        VALUES (?, ?, ?, ?)
      `;
      
      const [result] = await pool.query(query, [name, email, subject, message]);
      return { id: result.insertId, ...contactData };
    } catch (error) {
      console.error('Error creating contact:', error.message);
      throw error;
    }
  }

  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error(`Error fetching contact with id ${id}:`, error.message);
      throw error;
    }
  }
}

module.exports = Contact;