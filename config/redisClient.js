const redis = require('redis');

// Connect to Redis server
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'redis', 
    port: process.env.REDIS_PORT || 6379,
  }
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect client
redisClient.connect().catch(console.error);

module.exports = redisClient;
