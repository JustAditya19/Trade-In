const mongoose = require('mongoose');

const oderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        tradeIn: { type: mongoose.Schema.Types.ObjectId, ref: "TradeIn" },

        devicePrice: Number,
        tradeInCredit: Number,
        finalAmount: Number,

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', oderSchema);