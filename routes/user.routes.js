const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userRouter = express.Router();


userRouter.post("/register", (req, res) => {
    const { name, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.json({ error: err.message })
            } else {
                const user = new UserModel({ email, pass: hash, name });
                await user.save()
                res.json({ msg: "user is registered", user: req.body })
            }
        })

    } catch (error) {
        res.json({ error: error.message })
    }
});
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user._id, user: user.name }, "masai")
                    res.json({ msg: "login successful", token })
                } else {
                    res.json({ msg: "wrong credentials" })
                }
            })
        } else {
            res.json({ msg: "user not found" })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
});


module.exports = { userRouter }