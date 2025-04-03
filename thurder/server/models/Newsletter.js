const { pool } = require('../config/database');

class Newsletter {
  static async createTable() {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(100) NOT NULL UNIQUE,
          active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      await pool.query(createTableQuery);
      console.log('Newsletter subscribers table initialized successfully');
    } catch (error) {
      console.error('Error creating newsletter subscribers table:', error.message);
      throw error;
    }
  }

  static async subscribe(email) {
    try {
      // Check if email already exists
      const [existingEmails] = await pool.query(
        'SELECT * FROM newsletter_subscribers WHERE email = ?', 
        [email]
      );

      // If email exists but is inactive, reactivate it
      if (existingEmails.length > 0) {
        if (!existingEmails[0].active) {
          await pool.query(
            'UPDATE newsletter_subscribers SET active = TRUE WHERE email = ?',
            [email]
          );
          return { email, message: 'Subscription reactivated successfully!' };
        }
        return { email, message: 'Email already subscribed!' };
      }
      
      // Otherwise, create a new subscription
      const query = 'INSERT INTO newsletter_subscribers (email) VALUES (?)';
      const [result] = await pool.query(query, [email]);
      
      return { id: result.insertId, email, message: 'Subscribed successfully!' };
    } catch (error) {
      console.error('Error subscribing to newsletter:', error.message);
      throw error;
    }
  }

  static async unsubscribe(email) {
    try {
      const query = 'UPDATE newsletter_subscribers SET active = FALSE WHERE email = ?';
      const [result] = await pool.query(query, [email]);
      
      if (result.affectedRows === 0) {
        return { email, message: 'Email not found in subscribers list' };
      }
      
      return { email, message: 'Unsubscribed successfully!' };
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error.message);
      throw error;
    }
  }

  static async getAllActive() {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM newsletter_subscribers WHERE active = TRUE ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      console.error('Error fetching active newsletter subscribers:', error.message);
      throw error;
    }
  }
}

module.exports = Newsletter;