const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Logging the MONGO_URI to check if it's loaded properly (for debugging, optional)
console.log('Mongo URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB successfully'))
.catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Fantasy Sports Betting Marketplace Backend is running!');
});

// Define PORT and start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
