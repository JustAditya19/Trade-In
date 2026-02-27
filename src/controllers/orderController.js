const Order = require('../models/Order');
const { calculateFinalAmount } = require('../services/paymentService');
const { initiatePayment } = require('../services/paymentGatewayService');
const { initiateESign } = require('../services/esignService');

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
            paymentStatus: 'pending',
        });

        const payment = await initiatePayment(order);

        res.status(201).json({
            success: true,
            order,
            payment,
        });

        if (status === "success") {
            order.paymentStatus = "paid";

            const esign = await initiateESign(order._id);

            console.log("eSign initiated: ", esign);
        }
    } catch (error) {
        next(error);
    }
};