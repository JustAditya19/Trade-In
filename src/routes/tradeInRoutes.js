const express = require('express');
const router = express.Router();
const { createTradeIn, acceptTradein } = require('../controllers/tradeInController');
const protect = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');

router.post(
    "/",
    protect,
    [
        body("deviceId").notEmpty().withMessage("Device ID is required"),
        body("storage").notEmpty(),
        body("condition").isIn(["excellent", "good", "damaged"]),
    ],
    validate,
    createTradeIn
);
router.put('/:id/accept', protect, acceptTradein);

module.exports = router;