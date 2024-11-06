// routes/userRoutes.js
const express = require('express');
const { getRecentlyViewed } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/:userId/recentlyViewed', auth, getRecentlyViewed);

module.exports = router;
