const express = require('express');
const router = express.Router();
const { createTradeIn } = require('../controllers/tradeInController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createTradeIn);

module.exports = router;