const mongoose = require("mongoose");
const shortid = require("shortid");

const urlShema = mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate
    },
    click: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("shorturl", urlShema);