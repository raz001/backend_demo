const mongoose = require("mongoose");

const userSChema = mongoose.Schema({
    name: String,
    email: String,
    pass: String
}, {
    versionKey: false
});

const UserModel = mongoose.model("user", userSChema);
module.exports = { UserModel }