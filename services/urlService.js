// const redisClient = require('../config/redis');
// const { nanoid } = require('nanoid');

// const EXPIRATION_TIME = 60 * 60 * 24 * 7; // 7 days in seconds

// /**
//  * Shorten the original URL and store it in Redis.
//  * @param {string} originalUrl - The original URL to shorten.
//  * @returns {string} The generated short URL.
//  */
// async function shortenUrl(originalUrl) {
//     const shortCode = nanoid(6); // Generate a unique 6-character ID
//     await redisClient.setEx(shortCode, EXPIRATION_TIME, originalUrl); // Set the URL with expiration
//     return `http://localhost:3000/${shortCode}`;
// }

// /**
//  * Retrieve the original URL from Redis using the short code.
//  * @param {string} shortCode - The short code for the URL.
//  * @returns {string|null} The original URL or null if not found.
//  */
// async function getOriginalUrl(shortCode) {
//     const originalUrl = await redisClient.get(shortCode);
//     return originalUrl;
// }

// module.exports = {
//     shortenUrl,
//     getOriginalUrl,
// };

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


