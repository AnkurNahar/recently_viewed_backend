const { recentProducts } = require('../dao/userDAO');
const { cacheData } = require('../services/cacheData');

const getRecentlyViewed = async (req, res) => {
  const { userId } = req.params;
  
  try {
    let recentlyViewed = await recentProducts(userId);
    cacheData(userId, recentlyViewed);
    return res.status(200).json(recentlyViewed);
  } catch (error) {
    console.error("Error retrieving recently viewed products:", error);
    res.status(500).json({ error: "Failed to retrieve recently viewed products" });
  }
};

module.exports = { getRecentlyViewed };
