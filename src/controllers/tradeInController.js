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

exports.acceptTradein = async (req, res, next) => {
    try {
        const tradeIn = await TradeIn.findById(req.params.id);

        if (!tradeIn) {
            return res.status(404).json({ success: false, message: 'Trade-in not found' });
        }

        if (tradeIn.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        tradeIn.status = 'accepted';
        await tradeIn.save();

        res.json({
            success: true,
            message: 'Trade-in accepted',
            tradeIn,
        });
    } catch (error) {
        next(error);
    }
};