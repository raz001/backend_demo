const express = require("express");
const {connection} = require("./db")
const app = express();
const {userRouter} = require("./routes/user.routes");
const {notesRouter} = require('./routes/notes.routes');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/users', userRouter)
app.use('/notes', notesRouter)



app.listen(4500, async() => {
    try {
       await connection;
       console.log("connected to db");
       console.log("server is running at port 4500");
    } catch (error) {
        console.log(error)
    }
    
})