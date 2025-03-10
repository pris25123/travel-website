const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000

// CORS configuration
const corsOptions = {
  origin: 'http://127.0.0.1:3000', // Allow frontend requests
  methods: 'GET,POST', // Allow GET and POST requests
  credentials: true, // If needed for cookie-based authentication
};
app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wanderwise', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB successfully.'))
.catch((error) => console.error('MongoDB connection error:', error));

// MongoDB User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema); // Removed extra space

// MongoDB Contact schema and model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema); // Define the Contact model


// MongoDB Itinerary schema and model
const itinerarySchema = new mongoose.Schema({
  username: { type: String, required: true }, // Reference to the user
  city: { type: String, required: true },
  duration: { type: Number, required: true }, // Ensure this is a Number
  budget: { type: Number, required: true },
  itinerary: [{
      day: { type: Number, required: true },
      activity: { type: String, required: true },
      food: { type: String, required: true },
      category: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now },
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema); // Use the correct model name

// Route for account creation
app.post('/api/auth/create-account', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Creating account for:', username); // Log request data

    // Check if username already exists
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
      return res.status(400).json({ success: false, message: 'Username already exists.' });
    }

    // Hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ username, password: hashedPassword });
    await newUser .save();

    console.log('Account created successfully:', username);
    res.json({ success: true, message: 'Account created successfully!' });
  } catch (error) {
    console.error('Error creating account:', error); // Log error
    res.status(500).json({ success: false, message: 'Error creating account.' });
  }
});

// Route for user login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Attempting login for:', username); // Log request data

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.error('Incorrect username or password for:', username);
      return res.status(400).json({ success: false, message: 'Incorrect username or password.' });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.error('Incorrect password for:', username);
      return res.status(400).json({ success: false, message: 'Incorrect username or password.' });
    }

    console.log('Login successful for:', username);
    res.json({ success: true, message: 'Login successful!' });
  } catch (error) {
    console.error('Error logging in:', error); // Log error
    res.status(500).json({ success: false, message: 'Error logging in.' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  console.log(`Contact form submission received. Name: ${name}, Email: ${email}`);

  try {
    // Validate input
    if (!name || !email || !message) {
      console.warn('Contact form submission failed: Missing required fields.');
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Save contact data to the database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log(`Contact message saved successfully. Name: ${name}, Email: ${email}`);
    res.json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Failed to send your message. Please try again later.' });
  }
});



// POST route for saving an itinerary
app.post('/api/save-itinerary', async (req, res) => {
  console.log('Received data:', req.body);
  const { username, city, duration, budget, itinerary } = req.body;

  // Validate input
  if (!username || !city || typeof duration !== 'number' || typeof budget !== 'number' || !Array.isArray(itinerary)) {
      return res.status(400).json({ success: false, message: 'Invalid input data.' });
  }

  // Further validation for itinerary items
  for (const item of itinerary) {
      if (!item.day || !item.activity || !item.food || !item.category) {
          return res.status(400).json({ success: false, message: 'Invalid itinerary item.' });
      }
  }

  // Create a new itinerary document
  const newItinerary = new Itinerary({
      username,
      city,
      duration,
      budget,
      itinerary
  });

  try {
      // Save to the database
      await newItinerary.save();
      res.json({ success: true, message: 'Itinerary saved successfully!' });
  } catch (error) {
      console.error('Error saving itinerary:', error);
      res.status(500).json({ success: false, message: 'Error saving itinerary.' });
  }
});



app.listen(5000, '127.0.0.1', (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log('Server is running on http://127.0.0.1:5000');
  }
});
