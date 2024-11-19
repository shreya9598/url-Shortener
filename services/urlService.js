const redisClient = require('../config/redis');

const EXPIRATION_TIME = 60 * 60 * 24 * 7;

async function shortenUrl(originalUrl, customCode = null) {
    const { nanoid } = await import('nanoid');
    const shortCode = customCode || nanoid(6);
    if (customCode) {
        const existingUrl = await redisClient.get(shortCode);
        if (existingUrl) {
            throw new Error('Custom short code is already in use.');
        }
    }

    const urlData = {
        originalUrl,
        clicks: 0,
        metadata: [],
    };

    await redisClient.setEx(shortCode, EXPIRATION_TIME, JSON.stringify(urlData));
    return `http://localhost:3000/${shortCode}`;

    // await redisClient.setEx(shortCode, EXPIRATION_TIME, originalUrl);
    // return `http://localhost:3000/${shortCode}`;
}

async function getOriginalUrl(shortCode) {
    return await redisClient.get(shortCode);
}

async function getOriginalUrlAndTrack(shortCode, ip) {
    try {
        const data = await redisClient.get(shortCode);

        if (!data) return null;

        const urlData = JSON.parse(data);

        // Increment click count
        urlData.clicks += 1;

        // Save updated data back to Redis
        await redisClient.setEx(shortCode, EXPIRATION_TIME, JSON.stringify(urlData));

        return urlData.originalUrl;
    } catch (error) {
        console.error("Error in getOriginalUrlAndTrack:", error);
        throw error;
    }
}

async function getAnalytics(shortCode) {
    try {
        const data = await redisClient.get(shortCode);

        if (!data) return null;

        const urlData = JSON.parse(data);
        return {
            clicks: urlData.clicks,
        };
    } catch (error) {
        console.error("Error in getAnalytics:", error);
        throw error;
    }
}

module.exports = {
    shortenUrl,
    getOriginalUrlAndTrack,
    getAnalytics,
};

// module.exports = {
//     shortenUrl,
//     getOriginalUrl,
// };


