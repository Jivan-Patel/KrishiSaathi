const mongoose = require('mongoose');

const TransportRequestSchema = new mongoose.Schema({
    crop: { type: String, required: true },
    quantity: { type: String, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TransportRequest', TransportRequestSchema);
