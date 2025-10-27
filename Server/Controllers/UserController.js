const express = require("express")
const User = require("../Models/User")

const getUser = async (req, res) => {
    const users = await User.find().lean()
    res.json(users)
}
const logIn = async (req, res) => {
    const { userName, passWord } = req.body
    const user = await User.find(userName,passWord).lean()
    if (!user)
        return res.status(404).send("user is not found")
    res.json(user)
}
const register = async (req, res) => {
    const { firstName, lastName, userName, email, passWord, phone, address } = req.body
    if (!firstName || !lastName || !userName || !email || !passWord || !phone)
        return res.status(404).send("all fields are required!")
    const newUser = {
        firstName,
        lastName,
        userName,
        email,
        passWord,
        phone,
        address
    }
    await User.create(newUser)
    res.json(newUser)
}
const putUser = async (req, res) => {
    const { _id, firstName, lastName, userName, email, passWord, phone, address } = req.body
    const user = await User.findById(_id)
    user.firstName = firstName
    user.lastName = lastName
    user.userName = userName
    user.email = email
    user.passWord = passWord
    user.phone = phone
    user.address = address
    await user.save()
    res.json(user)
}

const deleteUser = async (req, res) => {
    const { _id } = req.body
    const user = await User.findById(_id)
    if (!user)
        return res.status(404).send("user is not found")
    await user.deleteOne()
    res.send("user is delete successfully")
}
module.exports = { getUser, register, putUser, logIn, deleteUser }
