const express = require("express");
const Service = require("../models/Service");
const router = express.Router();
const { authMiddleware, roleCheck } = require("../middleware/auth");


//Create service (provider only)
router.post('/', authMiddleware, roleCheck(['provider']), async (req, res, next) => {
    try {
        const data = { ...req.body, providerId: req.user.userId };
        const service = await Service.create(data);
        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: service
        })
    } catch (error) {
        next(error);
    }
});

//List services (public)
router.get('/', async (req, res, next) => {
    try {
        const { category, providerId } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (providerId) filter.providerId = providerId;
        const services = await Service.find(filter).limit(50);
        res.status(200).json({
            success: true,
            message: "Services fetched successfully",
            data: services
        })
    } catch (error) {
        next(error);
    }
});

//Get service by id (public)
router.get('/:id', async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Service fetched successfully",
            data: service
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;