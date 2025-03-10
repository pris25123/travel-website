const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const UserModel = require('./models/User'); // Assuming you have a User model for authentication
const ItineraryModel = require('./models/Itinerary'); // Model for storing itineraries

const app = express();

// Use environment variables from .env file
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: 'http://127.0.0.1:3000', // Allow frontend requests
  methods: 'GET,POST', // Allow GET and POST requests
  credentials: true, // If needed for cookie-based authentication
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize session with cookie settings
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 } // Set secure: true for production with HTTPS
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travel', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

// POST route for login (Authenticate user)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = username; // Store username in session
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route for saving an itinerary
app.post('/api/save-itinerary', async (req, res) => {
    const { city, duration, budget, itinerary } = req.body;

    // Check if the user is logged in
    console.log('Checking user session:', req.session.username);
    if (!req.session.username) {
        return res.status(401).json({ message: 'You must be logged in to save an itinerary.' });
    }

    try {
        // Log the received itinerary data
        console.log('Received itinerary data:', { city, duration, budget, itinerary });

        // Create a new itinerary and associate it with the logged-in user
        const newItinerary = new ItineraryModel({
            username,
            city,
            duration,
            budget,
            itinerary
        });

        console.log('Saving itinerary:', newItinerary);

        await newItinerary.save();

        console.log('Itinerary saved successfully!');
        res.status(201).json({ message: 'Itinerary saved successfully!' });
    } catch (error) {
        console.error('Error saving itinerary:', error);
        res.status(500).json({ message: 'Failed to save itinerary.' });
    }
});

// GET route to fetch itineraries for the logged-in user
app.get('/api/get-itineraries', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ message: 'You must be logged in to view itineraries.' });
    }

    try {
        const itineraries = await ItineraryModel.find({ username: req.session.username });
        res.status(200).json(itineraries);
    } catch (error) {
        console.error('Error fetching itineraries:', error);
        res.status(500).json({ message: 'Failed to fetch itineraries.' });
    }
});
