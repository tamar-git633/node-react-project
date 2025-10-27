const express = require("express")
const Player = require("../Models/player")
const fs = require("fs")
const path = require("path")

const signUp = async (req, res) => {
    const { name } = req.body
    if (!name)
        return res.status(400).send("name is required!")
    const duplicate = await Player.findOne({ name })
    if (duplicate)
        return res.status(409).send("duplicated")
    const numBegin = Math.floor(Math.random() * 100) + 1;
    const numEnd = Math.floor(Math.random() * 51) + 100;
    const newPlayer = {
        name: name,
        numBegin: numBegin,
        numEnd: numEnd
    }
    await Player.create(newPlayer)
    res.json(newPlayer)
}
// const findByName = async (req, res) => {
//     const { names = [] } = req.body

//     if (!names)
//         return res.status(400).send("name is required!")
//    const firstP = await Player.findOne({ name: names[0] });
//    const secondP = await Player.findOne({ name: names[1] });
//     res.json([firstP,secondP])
// }
const game = (req, res) => {
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    let num3 = Math.floor((Math.random() * 51) + 100);
    let num4 = Math.floor((Math.random() * 51) + 100);

    res.json({
        start1: num1,
        start2: num2,
        end1: num3,
        end2: num4
    })
}
const log = async (req, res) => {
    const { content } = req.body
    fs.appendFile(path.join(__dirname, 'log.txt'), '\n'+ content+ '\n' , (err) => {
        if (err) throw err
    })
    res.send("AppendFile File Complete")
}

module.exports = { signUp, game, log }
