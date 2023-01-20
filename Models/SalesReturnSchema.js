const mongoose = require('mongoose');

const SalesReturn = mongoose.Schema({
    invoiceNo: {
        type: String,
        required: true
    },
    returnDate: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        default : ""
    },
    products: {
        type: Array,
        required: true
    },

},{timestamps : true});

module.exports = mongoose.model("salesReturn", SalesReturn)