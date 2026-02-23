const Order = require('../models/Order');
const { calculateFinalAmount } = require('../services/paymentService');

exports.createOrder = async (req, res, next) => {
    try {
        const { devicePrice, tradeInId } = req.body;

        const { tradeInCredit, tax, finalAmount } = await calculateFinalAmount({ devicePrice, tradeInId, });

        const order = await Order.create({
            user: req.user._id,
            tradeIn: tradeInId || null,
            devicePrice,
            tradeInCredit,
            finalAmount,
        });

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
    }
};