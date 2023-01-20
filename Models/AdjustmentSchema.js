const mongoose = require('mongoose');

const Adjustment = mongoose.Schema({
    product: {
        type: Object,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    isAdd: {
        type: Boolean,
        required: true
    },
    reason: {
        type: String,
        default: ""
    }

}, { timestamps: true });

module.exports = mongoose.model("adjustment", Adjustment);