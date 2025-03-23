const express = require('express');
const { User } = require('../models');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Get global leaderboard
router.get('/global', protect, async (req, res) => {
    try {
        const users = await User.find()
            .sort({ points: -1 })
            .select('firstName lastName points winRate');

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            name: `${user.firstName} ${user.lastName}`,
            points: user.points,
            winRate: user.winRate
        }));

        res.json(leaderboard);
    } catch (error) {
        console.error('Global leaderboard error:', error);
        res.status(500).json({ message: 'Error fetching leaderboard' });
    }
});

// Get weekly leaderboard
router.get('/weekly', protect, async (req, res) => {
    try {
        const users = await User.find()
            .sort({ weeklyPoints: -1 })
            .select('firstName lastName weeklyPoints winRate');

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            name: `${user.firstName} ${user.lastName}`,
            points: user.weeklyPoints,
            winRate: user.winRate
        }));

        res.json(leaderboard);
    } catch (error) {
        console.error('Weekly leaderboard error:', error);
        res.status(500).json({ message: 'Error fetching leaderboard' });
    }
});

module.exports = router; 