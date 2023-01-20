const mongoose = require('mongoose');

const Brands = mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },

},{timestamps : true});

module.exports = mongoose.model("brands", Brands);