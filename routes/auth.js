const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import User model
const router = express.Router();

// POST request to create a new account
router.post('/create-account', async (req, res) => {
    const { username, password } = req.body;

    // Log the request body to check if the incoming data is correct
    console.log('Request body:', req.body);

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword
    });

    try {
        // Log the user data before saving
        console.log('User to save:', newUser);

        // Save the new user
        await newUser.save();

        // Log the success of the user save operation
        console.log('User saved:', newUser);

        res.status(201).json({ success: true, message: 'Account created successfully!' });
    } catch (error) {
        // Log the error if the user creation fails
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
    }
});

module.exports = router;
