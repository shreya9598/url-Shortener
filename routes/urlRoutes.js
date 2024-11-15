const express = require('express');
const urlController = require('../controllers/urlController');

const router = express.Router();

// Route to shorten a URL
router.post('/shorten', urlController.shortenUrl);

// Route to redirect using the short code
router.get('/:shortCode', urlController.redirect);

module.exports = router;
