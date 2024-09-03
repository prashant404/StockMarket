const express = require('express');
const { addToWatchlist, removeFromWatchlist, getWatchlist } = require('../controllers/watchlistController');
const { protect } = require('../utils/authMiddleware');

const router = express.Router();

router.post('/', protect, addToWatchlist);
router.delete('/:stockId', protect, removeFromWatchlist);
router.get('/', protect, getWatchlist);

module.exports = router;
