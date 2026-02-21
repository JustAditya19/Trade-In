const Device = require('../models/Device');

const calculateQuotation = async ({ deviceId, storage, condition }) => {
    const device = await Device.findById(deviceId);

    if(!device) {
        throw new Error("Device not found");
    }

    let price = device.basePrice;

    // Storage adjustment
    if (storage === "128GB") {
        price += price * 0.05;
    } else if (storage === "256GB") {
        price += price * 0.10;
    }

    //Condition deduction
    if (condition === "good") {
        price -= price * 0.10;
    } else if (condition === "damaged") {
        price -= price * 0.25;
    }

    return Math.round
};

module.exports = { calculateQuotation };