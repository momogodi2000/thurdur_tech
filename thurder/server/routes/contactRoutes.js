const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

// POST /api/contacts - Create a new contact message
router.post('/', contactController.createContact);

// GET /api/contacts - Get all contact messages
router.get('/', contactController.getAllContacts);

// GET /api/contacts/:id - Get contact by ID
router.get('/:id', contactController.getContactById);

module.exports = router;