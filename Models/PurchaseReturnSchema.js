const mongoose = require('mongoose');

const PurchaseReturn = mongoose.Schema({
    invoiceNo: {
        type: String,
        required: true
    },
    returnDate: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        required: true
    },
    returnStock: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        default : ""
    },

},{timestamps : true});

module.exports = mongoose.model("purchaseReturn", PurchaseReturn);