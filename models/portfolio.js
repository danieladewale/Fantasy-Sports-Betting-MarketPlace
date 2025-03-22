// models/Portfolio.js
const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bet' }],
  profit: { type: Number, default: 0 },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
