const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }, // Hash password for security
    balance: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
