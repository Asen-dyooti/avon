const mongoose = require('mongoose');

const PurchaseEntry = mongoose.Schema({
    invoiceNo: {
        type: String,
        required: true
    },
    purchasedDate: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        required: true
    },
    stocks: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        default : ""
    },
    returnedStock : {
        type : String,
        default : "0"
    },
    adjustmentStock : {
        type : String,
        default : "0"  
    },
    saledStock : {
        type : String,
        default : "0"  
    },

},{timestamps : true});

module.exports = mongoose.model("purchaseEntry", PurchaseEntry);