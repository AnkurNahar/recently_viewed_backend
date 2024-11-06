const redisClient = require('../config/redisClient');

const cacheData = async (userId, recentlyViewed) => {

    try {
        //caching data for a TTL of 3600sec/1hr
        const cacheKey = `user:${userId}:recentlyViewed`;
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(recentlyViewed));
    } catch(error) {
        console.error("Error caching recently viewed products:", error);
    }
};

module.exports = { cacheData };

