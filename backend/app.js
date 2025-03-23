const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth'); // Import authentication routes
const leaderboardRoute = require('./routes/leaderboard'); // Import leaderboard route
const portfolioRoute = require('./routes/portfolio'); // Import portfolio routes
const protect = require('./middleware/authMiddleware'); // Import protection middleware

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/betiq');
    console.log('✅ Connected to MongoDB successfully');
    
    // Import models after connection is established
    const { User } = require('./models');
    
    // Add mock data if no users exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const mockUsers = [
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123', points: 1200, winRate: 65 },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password123', points: 1100, winRate: 60 },
        { firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', password: 'password123', points: 1000, winRate: 55 },
        { firstName: 'Sarah', lastName: 'Wilson', email: 'sarah@example.com', password: 'password123', points: 900, winRate: 50 },
        { firstName: 'Tom', lastName: 'Brown', email: 'tom@example.com', password: 'password123', points: 800, winRate: 45 }
      ];
      await User.insertMany(mockUsers);
      console.log('✅ Added mock users for testing');
    }
    
    // Make User model available to routes
    app.set('userModel', User);
    
    // Routes that depend on User model
    app.use('/api/auth', authRoute);
    app.use('/api/leaderboard', leaderboardRoute);
    app.use('/api/portfolio', portfolioRoute); // Add portfolio routes
    
    // Leaderboard Routes
    app.get('/api/leaderboard/global', async (req, res) => {
      try {
        const globalUsers = await User.find()
          .sort({ points: -1 })
          .select('firstName lastName points winRate');
        
        const leaderboard = globalUsers.map((user, index) => ({
          userId: user._id,
          name: `${user.firstName} ${user.lastName}`,
          points: user.points || 0,
          winRate: user.winRate || 0,
          rank: index + 1
        }));
        
        res.json(leaderboard);
      } catch (error) {
        console.error('Global leaderboard error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    });
    
    app.get('/api/leaderboard/weekly', async (req, res) => {
      try {
        const weeklyUsers = await User.find()
          .sort({ weeklyPoints: -1 })
          .select('firstName lastName weeklyPoints winRate');
        
        const leaderboard = weeklyUsers.map((user, index) => ({
          userId: user._id,
          name: `${user.firstName} ${user.lastName}`,
          points: user.weeklyPoints || 0,
          winRate: user.winRate || 0,
          rank: index + 1
        }));
        
        res.json(leaderboard);
      } catch (error) {
        console.error('Weekly leaderboard error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    });
    
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// Basic route for testing
app.get('/', (req, res) => {
  res.send('BetIQ Backend is running!');
});

// Protected route for testing user info (requires authentication)
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3001;

// Function to start server
const startServer = async (port) => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Then start the server
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${port} is in use, trying port ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Start the server
startServer(PORT);
