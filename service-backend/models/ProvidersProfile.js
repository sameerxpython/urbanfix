const mongoose = require('mongoose');

const providersProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    servicesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    location: { city: String, lat: Number, lng: Number },
    ratingAvg: { type: Number, default: 0 },
    bio: String,
    availability: [{ day: String, startTime: String, endTime: String }],
});

module.exports = mongoose.model('ProvidersProfile', providersProfileSchema);
