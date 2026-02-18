const mongoose = require('mongoose');

const tradeInSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        device: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
        
        storage: String,
        condition: {
            type: String,
            enum: ["excellent", "good", "damaged"],
        },

        quotedPrice: Number,

        status: {
            type: String,
            enum: [
                "initiated",
                "quoted",
                "accepted",
                "under_review",
                "completed",
            ],
            default: "initiated",
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('TradeIn', tradeInSchema);