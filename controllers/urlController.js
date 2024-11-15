const urlService = require('../services/urlService');

/**
 * Controller to shorten a URL.
 */
async function shortenUrl(req, res) {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const shortUrl = await urlService.shortenUrl(url);
        return res.status(200).json({ shortUrl });
    } catch (error) {
        return res.status(500).json({ error: 'Error shortening URL' });
    }
}

/**
 * Controller to redirect to the original URL.
 */
async function redirect(req, res) {
    const { shortCode } = req.params;

    try {
        const originalUrl = await urlService.getOriginalUrl(shortCode);

        if (originalUrl) {
            return res.redirect(originalUrl);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving URL' });
    }
}

module.exports = {
    shortenUrl,
    redirect,
};