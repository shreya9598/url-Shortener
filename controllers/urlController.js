const urlService = require('../services/urlService');

/**
 * Controller to shorten a URL.
 */
async function shortenUrl(req, res) {
    const { url, customCode } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const shortUrl = await urlService.shortenUrl(url, customCode);
        console.log("shortUrl   ", shortUrl);
        return res.status(200).json({ shortUrl });
    } catch (error) {
        return res.status(500).json({ error: 'Error shortening URL' });
    }
}

/**
 * Controller to redirect to the original URL.
 */
// async function redirect(req, res) {
//     const { shortCode } = req.params;

//     try {
//         const originalUrl = await urlService.getOriginalUrl(shortCode);

//         if (originalUrl) {
//             return res.redirect(originalUrl);
//         } else {
//             return res.status(404).json({ error: 'URL not found' });
//         }
//     } catch (error) {
//         return res.status(500).json({ error: 'Error retrieving URL' });
//     }
// }

async function redirect(req, res) {
    const { shortCode } = req.params;

    try {
        const ip = req.ip; // Client IP address
        const originalUrl = await urlService.getOriginalUrlAndTrack(shortCode, ip);

        if (originalUrl) {
            return res.redirect(originalUrl);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error("Error in redirect controller:", error);
        return res.status(500).json({ error: 'Error redirecting to URL' });
    }
}


async function getAnalytics(req, res) {
    const { shortCode } = req.params;

    try {
        const analytics = await urlService.getAnalytics(shortCode);

        if (analytics) {
            return res.status(200).json(analytics);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error("Error in getAnalytics controller:", error);
        return res.status(500).json({ error: 'Error fetching analytics' });
    }
}

module.exports = {
    shortenUrl,
    redirect,
    getAnalytics
};
