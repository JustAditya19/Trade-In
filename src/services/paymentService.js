const TradeIn = require('../models/TradeIn');

const calculateFinalAmount = async ({ devicePrice, tradeInId }) => {
    let tradeInCredit = 0;

    if (tradeInId) {
        const tradeIn = await TradeIn.findById(tradeInId);

        if (!tradeIn || tradeIn.status !== "accepted") {
            throw new Error('Invalid trade-in');
        }

        tradeInCredit = tradeIn.quotedPrice;
    }

    const subtotal = devicePrice - tradeInCredit;

    if (subtotal < 0) {
        throw new Error("Invalid billing amount");
    }

    const tax = subtotal * 0.18; // 18% GST

    const finalAmount = subtotal + tax;

    return {
        tradeInCredit,
        tax: Math.round(tax),
        finalAmount: Math.round(finalAmount),
    };
};

module.exports = { calculateFinalAmount };