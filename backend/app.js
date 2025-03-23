const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth'); // Import authentication routes
const leaderboardRoute = require('./routes/leaderboard'); // Import leaderboard route
const protect = require('./middleware/authMiddleware'); // Import protection middleware

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use authentication and leaderboard routes
app.use('/api/auth', authRoute); // Authentication routes for register and login
app.use('/api/leaderboard', leaderboardRoute); // Leaderboard route, protected

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Fantasy Sports Betting Marketplace Backend is running!');
});

// Protected route for testing user info (requires authentication)
app.get('/api/protected', protect, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Connect to MongoDB (assumes Mongo URI is in your .env file)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ Connected to MongoDB successfully');
}).catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
});

// Define PORT and start server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
