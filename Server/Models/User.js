const mongoose = require("mongoose")
const Product = require("./Product")

const UserScheme = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        type: String,
        enum: ['user', 'manager'],
        default: 'user'
    },
    email: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        city: String,
        street: String,
        number: Number
    },
    basket: {
        type: [{
            barcode: String,
            name: String,
            price: Number,
            amount: Number,
            category: String,
            quantity: {
                type: Number,
                default: 1
            },
            amount: Number,
            img: String,
        }] , default: [],
    },
         totalSum: {
                type: Number,
                default: 0
            },

}, { timestamps: true })
module.exports = mongoose.model("User", UserScheme)