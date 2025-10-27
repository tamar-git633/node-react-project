const mongoose = require("mongoose")

const playerScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numBegin: {
        type: Number
    },
    numEnd: {
        type: Number,
    },
    winner: {
        type: Boolean,
        required: false
    },
    active: {
        type: Boolean,
        required: false
    },
}, {timestamps:true})

module.exports= mongoose.model("player", playerScheme)