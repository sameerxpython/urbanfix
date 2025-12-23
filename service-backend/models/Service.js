const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    durationMinutes: Number,
    category: { type: String, required: true },
    images: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', serviceSchema);