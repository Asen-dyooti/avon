const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: true
    },

},{timestamps : true});

module.exports = mongoose.model("products", ProductSchema)