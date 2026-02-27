const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
    registerUser,
    loginUser,
    getProfile,
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

//Register
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email required"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    validate,
    registerUser
);

//Login
router.post(
    "/login",
    [
        body("email").isEmail(),
        body("password").notEmpty(),
    ],
    validate,
    loginUser
);

// Get Profile (Protected)
router.get("/me", protect, getProfile);

module.exports = router;