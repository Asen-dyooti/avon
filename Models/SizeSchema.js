const mongoose = require('mongoose');

const Sizes = mongoose.Schema({
    size: {
        type: String,
        required: true
    },

},{timestamps : true});

module.exports = mongoose.model("size", Sizes);