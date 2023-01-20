const mongoose = require('mongoose');

const Units = mongoose.Schema({
    unit: {
        type: String,
        required: true
    },

}, {timestamps : true});

module.exports = mongoose.model("units", Units);