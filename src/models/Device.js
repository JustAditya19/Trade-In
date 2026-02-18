const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    brand: String,
    model: String,
    basePrice: Number,
});

module.exports = mongoose.model('Device', deviceSchema);