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

    await redisClient.setEx(shortCode, EXPIRATION_TIME, originalUrl);
    return `http://localhost:3000/${shortCode}`;
}

async function getOriginalUrl(shortCode) {
    return await redisClient.get(shortCode);
}

module.exports = {
    shortenUrl,
    getOriginalUrl,
};


