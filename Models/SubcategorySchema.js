const mongoose = require('mongoose');

const SubCategory = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    subCategoryName: {
        type: String,
        required: true
    },
 
},{timestamps : true});

module.exports = mongoose.model("subcategory", SubCategory)