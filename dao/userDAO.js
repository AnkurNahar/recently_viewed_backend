const { db } = require('../config/firebase');

const recentProducts = async (userId) => {

    try {
      const recentlyViewedRef = db.collection('users').doc(userId).collection('recentlyViewed').orderBy('viewedAt', 'desc').limit(10);
      const snapshot = await recentlyViewedRef.get();
      const recentlyViewed = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          viewedAt: new Date(data.viewedAt._seconds * 1000).toLocaleString(), // Convert timestamp to datetime
        };
      });
      return recentlyViewed;
    } catch (error) {
      throw error;
    }
  };
  
module.exports = { recentProducts };