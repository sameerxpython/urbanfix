const express = require("express");
const User = require("../models/User");
const { authMiddleware, roleCheck } = require("../middleware/auth");
const router = express.Router();

//List providers for admin
router.get('/providers', authMiddleware, roleCheck(['admin']), async (req, res, next) => {
    try {
        const providers = await User.find({ role: 'provider' }).select('-passwordHash');
        res.json({
            success: true,
            message: "Providers fetched successfully",
            data: providers
        });
    } catch (error) {
        next(error);
    }
});

// Approve provider
router.patch('/providers/:id/approve', authMiddleware, roleCheck(['admin']), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || user.role !== 'provider') {
            return res.status(404).json({ success: false, message: "Provider not found" });
        }
        user.isApproved = true;
        await user.save();
        res.json({
            success: true,
            message: "Provider approved successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
});

// Delete provider
router.delete('/providers/:id', authMiddleware, roleCheck(['admin']), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || user.role !== 'provider') {
            return res.status(404).json({ success: false, message: "Provider not found" });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Provider deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

// Admin Stats
router.get('/stats', authMiddleware, roleCheck(['admin']), async (req, res, next) => {
    try {
        const Service = require('../models/Service');
        const Booking = require('../models/Booking');

        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalProviders = await User.countDocuments({ role: 'provider' });
        const totalServices = await Service.countDocuments();
        const totalBookings = await Booking.countDocuments();

        res.json({
            success: true,
            data: {
                totalUsers,
                totalProviders,
                totalServices,
                totalBookings
            }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;