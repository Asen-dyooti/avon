const mongoose = require('mongoose');

const Trackstock = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
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
    quantity: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
   

}, { timestamps: true });

module.exports = mongoose.model("trackstock", Trackstock);