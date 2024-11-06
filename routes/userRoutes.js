// routes/userRoutes.js
const express = require('express');
const { getRecentlyViewed } = require('../controllers/userController');
const auth = require('../middleware/auth');
const getCache = require('../middleware/cache')
const router = express.Router();

/**
 * @swagger
 * /api/v1/users/{userId}/recentlyViewed:
 *   get:
 *     summary: Get recently viewed products for a user
 *     description: Retrieves a list of recently viewed products for the specified user  
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved recently viewed products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     description: ID of the viewed product
 *                   viewedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/:userId/recentlyViewed', auth, getCache, getRecentlyViewed);

module.exports = router;
