// routes/bets.js
const express = require('express');
const Bet = require('../models/Bet');
const Portfolio = require('../models/portfolio');
const User = require('../models/user');
const router = express.Router();

// Create a new bet
router.post('/create', async (req, res) => {
  const { userId, description, odds, amountStaked, portfolioId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const portfolio = portfolioId ? await Portfolio.findById(portfolioId) : null;

    const bet = new Bet({
      user: user._id,
      description,
      odds,
      amountStaked,
      portfolio: portfolio ? portfolio._id : null,
    });

    await bet.save();
    res.status(201).json({ message: 'Bet created successfully', bet });
  } catch (error) {
    res.status(400).json({ message: 'Error creating bet', error });
  }
});

// routes/bets.js (continued)
router.put('/resolve/:betId', async (req, res) => {
    const { betId } = req.params;
    const { outcome, resolvedAt } = req.body;
  
    try {
      const bet = await Bet.findById(betId);
      if (!bet) return res.status(404).json({ message: 'Bet not found' });
  
      if (!['won', 'lost'].includes(outcome)) {
        return res.status(400).json({ message: 'Invalid outcome' });
      }
  
      bet.outcome = outcome;
      bet.resolvedAt = resolvedAt || new Date();
      await bet.save();
  
      res.status(200).json({ message: 'Bet outcome updated successfully', bet });
    } catch (error) {
      res.status(400).json({ message: 'Error resolving bet', error });
    }
  });
  
  
  
module.exports = router;

