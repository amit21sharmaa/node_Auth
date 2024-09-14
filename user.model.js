const mongoose = require("mongoose");

const usermodel = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("user", usermodel)