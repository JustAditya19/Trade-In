const initiateESign = async (orderId) => {
    return {
        documentUrl: `https://fakesign.com/document/${orderId}`,
        signingStatus: "pending",
    };
};

module.exports = { initiateESign };