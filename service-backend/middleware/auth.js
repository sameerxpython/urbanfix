const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({
        success: false,
        message: 'No token'
    });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

};

const roleCheck = (roles = []) => (req, res, next) => {
    if (!req.user) return res.status(401).json({
        success: false,
        message: 'Not authenticated'
    });

    console.log(`[RoleCheck] User Role: ${req.user.role}, Allowed Roles: ${JSON.stringify(roles)}`);

    if (!roles.includes(req.user.role)) {
        console.log('[RoleCheck] Access Denied');
        return res.status(403).json({
            success: false,
            message: 'Unauthorized'
        });
    }
    next();
};

module.exports = {
    authMiddleware,
    roleCheck
};