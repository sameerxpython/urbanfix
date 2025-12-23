const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    address: { type: String, required: true },
    totalPrice: Number,
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'In_progress', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
