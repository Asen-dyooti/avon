const mongoose = require('mongoose');

const POS = mongoose.Schema({
    product: {
        type: Array,
        required: true
    },
    invoiceNo : {
        type : String,
        required : true
    },
    
}, { timestamps: true });

module.exports = mongoose.model("posSale", POS);