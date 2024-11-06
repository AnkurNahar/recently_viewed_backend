// routes/userRoutes.js
const express = require('express');
const { getRecentlyViewed } = require('../controllers/userController');
const auth = require('../middleware/auth');
const getCache = require('../middleware/cache')
const router = express.Router();


router.get('/:userId/recentlyViewed', auth, getCache, getRecentlyViewed);

module.exports = router;
