const mongoose = require('mongoose');

const Roles = mongoose.Schema({
    roleType: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    permissions: {
        type: Array,
        default: []
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default : ""
    },
    isSuperAdmin: {
        type: Boolean,
        required: true
    },

},{timestamps : true});

module.exports = mongoose.model("roles", Roles)