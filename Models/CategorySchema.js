const mongoose = require('mongoose');

const Category = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
  
},{timestamps : true});

module.exports = mongoose.model("category", Category)