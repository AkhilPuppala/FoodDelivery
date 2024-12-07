const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "erhfgbiuw3eio2132iier";

router.post('/createuser',
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password').isLength({ min: 5 })
    ],
    async (req, res) => {
        console.log("ferf")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

router.post('/loginuser',
    [
        body('email').isEmail(),
        body('password','Incorrect password').isLength({ min: 5 })
    ],
    async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        console.log(email);
        console.log(password);
        try {
            const userData = await User.findOne({email});
            console.log(userData);
            if(!userData){
                return res.status(400).json({errors: "Use correct credentials"});
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if(!pwdCompare){
                return res.status(400).json({errors: "Use correct credentials"});
            }
            const data = {
                user:{
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.status(200).json({success: true, authToken: authToken});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

module.exports = router;
