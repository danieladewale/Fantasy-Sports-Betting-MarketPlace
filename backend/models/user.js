const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }, // Hash password for security
    balance: { type: Number, default: 0 },
    performance: {
        winRate: { type: Number, default: 0 }, // Percentage of bets won
        totalProfit: { type: Number, default: 0 },
    },
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
