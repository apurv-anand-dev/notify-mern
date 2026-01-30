const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");
const { model } = require("mongoose");

router.post("/", auth, async(req, res)=>{

    try{
        const{title, content} = req.body;

        if(!title || !content){

            return res.status(400).json({message:"All field are required"})
        }

        const note = new Note({
            title,
            content,
            user: req.user.id
        });

        await note.save();

        res.status(201).json(note)
    } catch(error){

        res.status(500).json({message: "Server seeror"})
    }
});


router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    console.log("NOTE ID:", req.params.id);
   console.log("USER FROM TOKEN:", req.user.id);


    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async(req , res)=>{

  try{
    
    const note = await Note.findOne({

      _id: req.params.id,
      user: req.user.id

    });

    if(!note){

      return res.status(404).json({message :"Note not found"})
    }

      await note.deleteOne();

      res.json({message : "Note deleted successfully"});

  }catch(error){

    res.status(500).json({message : "Server error"})
  }





});


module.exports = router;