const axios = require('axios');

const initiatePayment = async (order) => {
    // Simulating payment gateway call

    return {
        paymentUrl: `https://fakepayment.com/pay/${order._id}`,
        transactionId: "TXN_" + Date.now(),
    };
};

module.exports = { initiatePayment };