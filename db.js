const mongoose = require("mongoose");

const connection = mongoose.connect('mongodb+srv://razbhagat:raz@cluster0.tp7gwwn.mongodb.net/notes?retryWrites=true&w=majority');

module.exports = { connection }