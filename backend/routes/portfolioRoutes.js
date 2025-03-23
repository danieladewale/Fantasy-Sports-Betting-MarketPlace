// routes/portfolioRoutes.js
const express = require('express');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// Create a new portfolio
router.post('/create', async (req, res) => {
  const { name, userId } = req.body;
  try {
    const portfolio = new Portfolio({ name, user: userId });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
