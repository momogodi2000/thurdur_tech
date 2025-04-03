const Newsletter = require('../models/Newsletter');

const newsletterController = {
  // Subscribe to newsletter
  subscribe: async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate email
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email is required' 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid email format' 
        });
      }

      // Subscribe email
      const result = await Newsletter.subscribe(email);

      res.status(201).json({
        success: true,
        message: result.message,
        data: { email: result.email }
      });
    } catch (error) {
      console.error('Error in subscribe:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Unsubscribe from newsletter
  unsubscribe: async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate email
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email is required' 
        });
      }

      // Unsubscribe email
      const result = await Newsletter.unsubscribe(email);

      res.status(200).json({
        success: true,
        message: result.message,
        data: { email: result.email }
      });
    } catch (error) {
      console.error('Error in unsubscribe:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Get all active subscribers
  getAllSubscribers: async (req, res) => {
    try {
      const subscribers = await Newsletter.getAllActive();
      res.status(200).json({
        success: true,
        count: subscribers.length,
        data: subscribers
      });
    } catch (error) {
      console.error('Error in getAllSubscribers:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
};

module.exports = newsletterController;