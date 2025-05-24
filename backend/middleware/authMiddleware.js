const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'abc123');

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'غير مصرح به، رمز المصادقة غير صالح' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'غير مصرح به، لا يوجد رمز مصادقة' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'غير مصرح به، يجب أن تكون مسؤول' });
    }
};

module.exports = { protect, admin }; 