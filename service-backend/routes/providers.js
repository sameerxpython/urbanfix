const express = require('express');
const ProviderProfile = require('../models/ProvidersProfile');
const { authMiddleware, roleCheck } = require('../middleware/auth');
const router = express.Router();

// create or update provider profile (provider only)
router.post('/', authMiddleware, roleCheck(['provider']), async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { businessName, location, bio, availability } = req.body;

        let profile = await ProviderProfile.findOne({ userId });
        if (profile) {
            profile.businessName = businessName || profile.businessName;
            profile.location = location || profile.location;
            profile.bio = bio || profile.bio;
            profile.availability = availability || profile.availability;
            await profile.save();
        } else {
            profile = await ProviderProfile.create({
                userId,
                businessName,
                location,
                bio,
                availability,
                servicesOffered: []
            });
        }

        res.status(201).json({ success: true, message: 'Provider profile saved', data: profile });
    } catch (err) {
        next(err);
    }
});

// get all providers (public)
router.get('/', async (req, res, next) => {
    try {
        const profiles = await ProviderProfile.find().populate('userId', 'name email');
        res.status(200).json({ success: true, count: profiles.length, data: profiles });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
