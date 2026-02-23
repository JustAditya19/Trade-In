const express = require('express');
const router = express.Router();
const { createTradeIn, acceptTradein } = require('../controllers/tradeInController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createTradeIn);
router.put('/:id/accept', protect, acceptTradein);

module.exports = router;