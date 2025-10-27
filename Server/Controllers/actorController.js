
const express = require("express")
const Actor = require("../Models/actor")

const rishum = async (req, res) => {
    const { name } = req.body
    const newActor = {
        name: name
    }
    await Actor.create(newActor)
    res.json(newActor)
}
const randNumbers = (req, res) => {
    const numbers = [];
    while (numbers.length < 4) {
        const n = Math.floor(Math.random() * 7);
        if (!numbers.includes(n)) {
            numbers.push(n);
        }
    }
    const [num1, num2, num3, num4] = numbers;
    res.json({ num1, num2, num3, num4 });
}
const sendEmail = (req, res) => {
    const {winner}=req.body
    let nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tamar198633@gmail.com',
            pass: 'mdgb zdab oklv kiel'
        }
    });

    let mailOptions = {
        from: 'tamar198633@gmail.com',
        to: 'tamar198633@gmail.com',
        subject: 'Sending Email using Node.js',
        text: `${winner} is winner!!!`
    };
    debugger
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({ message: error })
        } else {
            return res.status(201).json({ message: 'good email' })
        }
    });
}
module.exports = { rishum, randNumbers, sendEmail }