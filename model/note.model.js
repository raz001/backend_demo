const mongoose = require("mongoose");

const noteSChema = mongoose.Schema({
    title: String,
    body: String,
    category: String,
     user: String,
     userID: String
}, {
    versionKey: false
});

const NoteModel = mongoose.model("note", noteSChema);
module.exports = { NoteModel }