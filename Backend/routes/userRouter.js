const { jwtAuthMiddleware, generateJWT } = require('../auth/jwt');
const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
        return res.status(400).json({ error: "Please fill all the fiels." });
    }

    try {
        // check if the user exists or not
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(200).json({ error: "User with this email already exists." });
        }

        // create the user data
        const newUser = new User(req.body);
        const response = await newUser.save();
        console.log('data saved');

        // now, generate the token
        const payload = {
            id: response.id
        };

        const token = generateJWT(payload);
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true, // Set httpOnly to true
            sameSite: 'None',
            secure: true
        };

        res.status(200).cookie('jwt_token', token, cookieOptions).json({
            message: "User registered successfully",
            response: response,
            token: token
        });
    } catch (err) {
        res.status(400).json({ error: `Error in registering the user: ${err}` });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // check if user exists or not
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "User does not exist. Please create a new account." });
        }

        // compare password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Password does not match. Please try again!" });
        }

        // check for role
        if (user.role !== role) {
            return res.status(400).json({ error: `User does not have the role - ${role}` });
        }

        const payload = {
            id: user.id
        };
        const token = generateJWT(payload);
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true, // Set httpOnly to true
            sameSite: 'None',
            secure: true
        };
        res.status(200).cookie('jwt_token', token, cookieOptions).json({
            message: "User logged in successfully!",
            response: user,
            token: token
        });
    } catch (err) {
        res.status(500).json({ error: `Internal server error : ${err}` });
    }
});

router.get('/logout', jwtAuthMiddleware, (req, res) => {
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Set httpOnly to true
        sameSite: 'None',
        secure: true
    };
    res.clearCookie('jwt_token', cookieOptions);
    res.status(200).json({
        message: "User logged out successfully!"
    });
});

router.get('/profile', jwtAuthMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;