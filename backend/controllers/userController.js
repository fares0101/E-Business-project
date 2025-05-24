const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        }
    } catch (error) {
        res.status(500).json({ message: 'خطأ في تسجيل الدخول' });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, address, phoneNumber } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'المستخدم موجود بالفعل' });
        }

        const user = await User.create({
            name,
            email,
            password,
            address,
            phoneNumber,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'بيانات المستخدم غير صالحة' });
        }
    } catch (error) {
        res.status(500).json({ message: 'خطأ في إنشاء الحساب' });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Public (for development, should be Private)
const getUserProfile = async (req, res) => {
    try {
        // For development, we'll use a mock user ID
        // In production, this would come from req.user._id after authentication
        const mockUserId = '65f0d5e1e9b0a9a9a9a9a9a9'; // Replace with a valid user ID from your database

        const user = await User.findById(mockUserId);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                address: user.address,
                phoneNumber: user.phoneNumber,
            });
        } else {
            res.status(404).json({ message: 'المستخدم غير موجود' });
        }
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ message: 'خطأ في جلب بيانات المستخدم' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Public (for development, should be Private)
const updateUserProfile = async (req, res) => {
    try {
        // For development, we'll use a mock user ID
        // In production, this would come from req.user._id after authentication
        const mockUserId = '65f0d5e1e9b0a9a9a9a9a9a9'; // Replace with a valid user ID from your database

        const user = await User.findById(mockUserId);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.address) {
                user.address = {
                    ...user.address,
                    ...req.body.address,
                };
            }

            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                address: updatedUser.address,
                phoneNumber: updatedUser.phoneNumber,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'المستخدم غير موجود' });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'خطأ في تحديث بيانات المستخدم' });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'خطأ في جلب المستخدمين' });
    }
};

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
}; 