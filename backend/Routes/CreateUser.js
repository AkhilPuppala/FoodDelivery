const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('../../logger/logging');

// JWT Secret Key
const jwtSecret = "erhfgbiuw3eio2132iier";

// Route: Create User
router.post('/createuser',
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error('Validation failed', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            const user = await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            logger.info('User created successfully', { userId: user.id });
            res.json({ success: true });
        } catch (error) {
            logger.error('Error creating user', { error: error.message });
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// Route: Login User
router.post('/loginuser',
    [
        body('email').isEmail(),
        body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
    ],
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const userData = await User.findOne({ email });

            if (!userData) {
                logger.warn('Login failed: User not found', { email });
                return res.status(400).json({ errors: "Invalid credentials" });
            }

            const pwdCompare = await bcrypt.compare(password, userData.password);
            if (!pwdCompare) {
                logger.warn('Login failed: Incorrect password', { email });
                return res.status(400).json({ errors: "Invalid credentials" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            };
            const authToken = jwt.sign(data, jwtSecret);

            logger.info('User logged in successfully', { userId: userData.id, email });
            return res.status(200).json({ success: true, authToken });
        } catch (error) {
            logger.error('Error logging in user', { error: error.message });
            res.status(500).json({ error: 'Server error' });
        }
    }
);

module.exports = router;
