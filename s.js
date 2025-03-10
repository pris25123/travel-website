const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS to handle cross-origin requests

const User = require('./models/User');  // Ensure the User model is defined correctly

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());  // Allow cross-origin requests (if accessing from a different origin)
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wanderwise', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB:", err));

// Registration Route
app.post('/api/create-account', async (req, res) => {
    const { username, password } = req.body;

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already exists." });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ success: true, message: "Account created successfully." });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
