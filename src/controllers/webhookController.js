const Order = require('../models/Order');
const TradeIn = require('../models/TradeIn');

exports.handlePaymentWebhook = async (req, res, next) => {
    try {
        const { transactionId, orderId, status } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (status === "success") {
            order.paymentStatus = "paid";
            
            //in-order to prevent double updates
            if (order.paymentStatus === "paid") {
                return res.json({ message: "Already processed" });
            }

            // Update trade-in lifecycle
            if (order.tradeIn) {
                await TradeIn.findByIdAndUpdate(order.tradeIn, {
                    status: "under_review",
                });
            }
        } else {
            order.paymentStatus = "failed";
        }

        await order.save();

        res.json({ received: true });
    } catch (error) {
        next(error);
    }
};