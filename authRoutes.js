// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('models/User.js'); // Adjust path based on your folder structure

// Create account route
router.post('/api/create-account', async (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.json({ success: false, message: 'Username already exists' });
    }

    // Save new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ success: true, message: 'Account created successfully!' });
});

module.exports = router;
