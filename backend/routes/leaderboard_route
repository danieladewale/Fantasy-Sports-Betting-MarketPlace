const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Leaderboard Route with Sorting & Search Functionality
router.get('/', async (req, res) => {
    try {
        // Get search query parameters (if provided)
        const { name, minWinRate, maxWinRate, minProfit, maxProfit, sortBy, order } = req.query;

        // Build the filter object
        let filter = {};

        if (name) {
            filter.name = { $regex: name, $options: 'i' }; // case-insensitive search
        }

        if (minWinRate || maxWinRate) {
            filter['performance.winRate'] = {};
            if (minWinRate) filter['performance.winRate'].$gte = minWinRate;
            if (maxWinRate) filter['performance.winRate'].$lte = maxWinRate;
        }

        if (minProfit || maxProfit) {
            filter['performance.totalProfit'] = {};
            if (minProfit) filter['performance.totalProfit'].$gte = minProfit;
            if (maxProfit) filter['performance.totalProfit'].$lte = maxProfit;
        }

        // Build the sorting object based on query params
        let sort = {};
        if (sortBy) {
            sort[sortBy] = order === 'desc' ? -1 : 1; // Default ascending order, or descending if specified
        }

        // Fetch users from DB based on filters and sorting
        const users = await User.find(filter).sort(sort);

        res.json(users);
    } catch (err) {
        console.error('Error fetching leaderboard:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
