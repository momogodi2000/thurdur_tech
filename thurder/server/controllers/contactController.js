const Contact = require('../models/Contact');

const contactController = {
  // Create a new contact message
  createContact: async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required: name, email, subject, message' 
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

      // Create contact
      const newContact = await Contact.create({ name, email, subject, message });

      res.status(201).json({
        success: true,
        message: 'Contact message sent successfully',
        data: newContact
      });
    } catch (error) {
      console.error('Error in createContact:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Get all contact messages
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.getAll();
      res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts
      });
    } catch (error) {
      console.error('Error in getAllContacts:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Get contact by ID
  getContactById: async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.getById(id);
      
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: `Contact with id ${id} not found`
        });
      }
      
      res.status(200).json({
        success: true,
        data: contact
      });
    } catch (error) {
      console.error('Error in getContactById:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
};

module.exports = contactController;