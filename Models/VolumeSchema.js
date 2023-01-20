const mongoose = require('mongoose');

const Volume = mongoose.Schema({
    volume: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("volume", Volume);