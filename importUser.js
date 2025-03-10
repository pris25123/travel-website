const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Use bcryptjs for consistency with your auth.js file
const User = require('./models/User'); // Adjust path if necessary

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    importUsers();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const importUsers = () => {
  const results = [];

  // Path to your CSV file (ensure this is correct)
  fs.createReadStream('data/users.csv') // Adjust this path as needed
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const user of results) {
        const { email, password } = user;

        try {
          // Check if user already exists
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();
            console.log(`User created: ${email}`);
          } else {
            console.log(`User already exists: ${email}`);
          }
        } catch (error) {
          console.error(`Error processing user ${email}: ${error.message}`);
        }
      }
      mongoose.connection.close();
    })
    .on('error', (error) => {
      console.error('Error reading the CSV file:', error.message);
    });
};