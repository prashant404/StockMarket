const express = require('express');
const { searchAndSaveStock, getAllStocks } = require('../controllers/stockController');
const { protect } = require('../utils/authMiddleware');


const router = express.Router();


router.get('/search/:symbol', searchAndSaveStock);


router.get('/', getAllStocks);


module.exports = router;
