const express = require('express');
const urlController = require('../controllers/urlController');

const router = express.Router();

// // Route to shorten a URL
// router.post('/shorten', urlController.shortenUrl);

// // Route to redirect using the short code
// router.get('/:shortCode', urlController.redirect);

router.post('/shorten', urlController.shortenUrl); // Create shortened URL
router.get('/:shortCode', urlController.redirect); // Redirect to the original URL
router.get('/:shortCode/analytics', urlController.getAnalytics); // Get URL analytics

module.exports = router;
