const redisClient = require('../config/redisClient');

const cache = async (req, res, next) => {
  const { userId } = req.params;
  const cacheKey = `user:${userId}:recentlyViewed`;

  // Check if data for the user is cached in Redis
  const cachedData = await redisClient.get(cacheKey);
  
  if (cachedData) {
    // If found in cache, return the cached data
    return res.status(200).json(JSON.parse(cachedData));
  }
  next();
};

module.exports = cache;
