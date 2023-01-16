const express = require("express");
const { NoteModel } = require("../Model/Note.model");
const noteRoutes = express.Router();

noteRoutes.get("/", async (req, res) => {
  const { status } = req.query;
  const userId = req.body.userId;
  console.log(status, userId);
  if (status) {
    const result = await TodosModel.find({ "userId": userId });
    res.send(result);
  } else {
    console.log(err);
    res.send({"msg":"Something went wrong"});
  }
});

noteRoutes.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send({ msg: "Note Created" });
  } catch (err) {
    console.log(err);
    res.send({"msg":"Something went wrong"});
  }
});

noteRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  const note = await NoteModel.findOne({ "_id": id });
  const userId_in_note = note.userId;
  const userId_making_req = req.body.userId;
  try {
    if (userId_making_req !== userId_in_note) {
      res.send({ "msg": "You are not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate({ "_id": Id }, payload);
      res.send({ "msg": "You are not authorized" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

noteRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const note = await NoteModel.findOne({ "_id": id });
  const userId_in_note = note.userId;
  const userId_making_req = req.body.userId;
  try {
    if (userId_making_req !== userId_in_note) {
      res.send({ msg: "You are not Recognazed" });
    } else {
      await NoteModel.findByIdAndDelete({ "_id": Id });
      res.send("Deleted the Note");
    }
  } catch (err) {
    console.log(err);
    res.send({ "msg": "Something went wrong" });
  }
});

module.exports = {
  noteRoutes,
};
