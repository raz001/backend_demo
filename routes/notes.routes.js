const express = require("express");
const { NoteModel } = require("../model/note.model")
const notesRouter = express.Router();
const { auth } = require('../middleware/auth.middleware');

notesRouter.post('/create', auth, async(req, res) => {
  try {
    const note = new NoteModel(req.body);
    console.log(req.body)
    await note.save();
    res.json({ msg: 'new note is added', note: req.body })
  } catch (error) {
    res.json({ error: error })
  }
});
// {
//        "title": "title1",
//         "body": "body1",
//         "user": "user1",
//         "category": "category1"
//       }

notesRouter.get('/', auth, async (req, res) => {
  try {
    const notes = await NoteModel.find({ userID: req.body.userID });
    res.json({ notes })
  } catch (error) {
    res.json({ error })
  }
});

notesRouter.patch('/update/:noteID', auth, async (req, res) => {
  //userid is user doc === userid in note doc
  const userIDinUserDoc = req.body.userID
  const { noteID } = req.params;

  try {
    const note = await NoteModel.findOne({ _id: noteID })
    const userIDinNoteDoc = note.userID
    //console.log(note)
    if (userIDinUserDoc === userIDinNoteDoc) {
      //console.log(userIDinUserDoc, userIDinNoteDoc)
      //update
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.json({ msg: `${note.title} is updated` })
    } else {
      res.json({ msg: "Not Authorized!" })
    }
  } catch (error) {
    res.json({ error })
  }
});

notesRouter.delete('/delete/:noteID', auth, async (req, res) => {
  const userIDinUserDoc = req.body.userID
  const { noteID } = req.params;

  try {
    const note = await NoteModel.findOne({ _id: noteID })
    const userIDinNoteDoc = note.userID
   // console.log(note)
    if(userIDinUserDoc === userIDinNoteDoc) {
      //console.log(userIDinUserDoc, userIDinNoteDoc)
      //update
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.json({ msg: `${note.title} is deleted` })
    } else {
      res.json({ msg: "Not Authorized!" })
    }
  } catch (error) {
    res.json({ error })
  }
})
module.exports = { notesRouter };