const TradeIn = require('../models/TradeIn');
const { calculateQuotation } = require('../services/quotationService');

exports.createTradeIn = async (req, res, next) => {
    try {
        const { deviceId, storage, condition } = req.body;

        const quotedPrice = await calculateQuotation({ deviceId, storage, condition });

        const tradeIn = await TradeIn.create({
            user: req.user._id,
            device: deviceId,
            storage,
            condition,
            quotedPrice,
            status: "quoted",
        });

        res.status(201).json({
            success: true,
            tradeIn,
        });
    } catch (error) {
        next(error);
    }
};