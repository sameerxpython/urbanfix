const express = require('express');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { authMiddleware, roleCheck } = require('../middleware/auth');

const router = express.Router();

//Create booking (user)
router.post('/', authMiddleware, roleCheck(['user']), async (req, res, next) => {
    try {
        const { serviceId, providerId, date, timeSlot, address } = req.body;
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        //basic conflict check: same provider, same date/timeSlot and cancelled/completed
        const conflict = await Booking.findOne({
            providerId,
            date: new Date(date),
            timeSlot,
            status: { $in: ['pending', 'accepted', 'In_progress'] }
        });
        if (conflict) {
            return res.status(409).json({
                message: 'Time slot not available'
            });
        }

        const booking = await Booking.create({
            userId: req.user.userId,
            providerId,
            serviceId,
            date: new Date(date),
            timeSlot,
            address,
            totalPrice: service.price
        });
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });
    } catch (error) {
        next(error);
    }
});

// Get booking (user or provider)
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const { role, userId } = req.query;
        let filter = {};
        if (role === 'user') {
            filter.userId = userId;
        }
        if (role === 'provider') {
            filter.providerId = userId;
        }
        if (role === 'admin') {
            filter = {};
        }
        const bookings = await Booking.find(filter)
            .populate('serviceId')
            .populate('providerId', 'name email')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
            data: bookings
        });
    } catch (error) {
        next(error);
    }
});

//Provider updates status
router.patch('/:id/status', authMiddleware, roleCheck(['provider']), async (req, res, next) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        if (booking.providerId.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this booking"
            });
        }
        booking.status = status;
        await booking.save();
        res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            data: booking
        });
    } catch (error) {
        next(error);
    }
});

// Cancel booking (user)
router.delete('/:id', authMiddleware, roleCheck(['user']), async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        if (booking.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to cancel this booking"
            });
        }

        // Only allow cancellation if pending or accepted
        if (['In_progress', 'completed', 'cancelled'].includes(booking.status)) {
            return res.status(400).json({
                success: false,
                message: "Cannot cancel booking in current status"
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;