const express = require('express');
const newsletterController = require('../controllers/newsletterController');

const router = express.Router();

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', newsletterController.subscribe);

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', newsletterController.unsubscribe);

// GET /api/newsletter/subscribers - Get all active subscribers
router.get('/subscribers', newsletterController.getAllSubscribers);

module.exports = router;