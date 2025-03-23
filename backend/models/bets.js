// models/Bet.js
const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  portfolio: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' },
  description: { type: String, required: true },
  odds: { type: Number, required: true },  // The odds of the bet (e.g., 1.5 for a 50% chance)
  amountStaked: { type: Number, required: true },  // Amount of money staked on the bet
  outcome: {
    type: String,
    enum: ['pending', 'won', 'lost'],
    default: 'pending',  // Default to pending, will be updated later
  },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },  // Timestamp for when bet is resolved
});

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;
