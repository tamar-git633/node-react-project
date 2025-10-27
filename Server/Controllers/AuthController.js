const express = require("express")
const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const logIn = async (req, res) => {
    const { userName, passWord } = req.body
    if (!userName || !passWord)
        return res.status(400).send("All fields are required!")
    const user = await User.findOne({ userName })
    if (!user)
        return res.status(404).send("User is not found")
    const match = await bcrypt.compare(passWord, user.passWord)
    if (!match)
        return res.status(401).send("unAuthorized")
    const userInfo = {
        _id: user._id, firstName: user.firstName, lastName: user.lastName,
        roles: user.roles, email: user.email, phone: user.phone, address: user.address
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
}
const register = async (req, res) => {
    const { firstName, lastName, userName, roles, email, passWord, phone, address } = req.body
    if (!firstName || !lastName || !userName || !email || !passWord || !phone)
        return res.status(404).send("all fields are required!")
    const duplicate = await User.findOne({ userName: userName }).lean()
    if (duplicate)
        return res.status(409).send("duplicated user")
    const hashePWD = await bcrypt.hash(passWord, 10)
    const newUser = {
        firstName,
        lastName,
        userName,
        email,
        passWord: hashePWD,
        phone,
        address,
        products:[],
    }
    if(passWord==process.env.MANAGER_PASSWORD)
        newUser.roles="manager"
    await User.create(newUser)
    res.json(newUser)
}
module.exports = { logIn, register }