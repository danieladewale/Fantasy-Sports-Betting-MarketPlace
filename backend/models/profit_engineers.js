const mongoose = require('mongoose');

const profitEngineerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    totalProfit: { type: Number, default: 0 },  // Total profit from bets
    profitPercentage: { type: Number, default: 0 }, // Profit percentage relative to bet volume
    betVolume: { type: Number, default: 0 },  // Number of bets made
    followers: { type: Number, default: 0 },  // Number of followers/subscribers
    portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bet' }], // Portfolio with bet IDs
    dateJoined: { type: Date, default: Date.now }
});

// Method to calculate profit percentage
profitEngineerSchema.methods.calculateProfitPercentage = function () {
    if (this.betVolume === 0) return 0;
    return ((this.totalProfit / this.betVolume) * 100).toFixed(2); // Calculate profit percentage
};

// Method to update total profit and bet volume
profitEngineerSchema.methods.updateStats = function (newProfit, betCount) {
    this.totalProfit += newProfit;
    this.betVolume += betCount;
    this.profitPercentage = this.calculateProfitPercentage();
    return this.save();
};

module.exports = mongoose.model('ProfitEngineer', profitEngineerSchema);
