const mongoose = require('mongoose');

const Login = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("login", Login);