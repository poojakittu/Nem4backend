const express = require("express");
const { PostModel } = require("../Model/Post.model");
const postRoutes = express.Router();


postRoutes.get("/", async (req, res) => {
  const { status } = req.query;
  const userId = req.body.userID;
  console.log(status, userId);
  if (status) {
    const result = await PostModel.find({ "userId": userId });
    res.send(result);
  } else {
    console.log(err);
    res.send({"msg":"Something went wrong"});
  }
});
  

postRoutes.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_post = new PostModel(payload);
    await new_post.save();
    res.send({ "msg": "Note Created" });
  } catch (err) {
    console.log(err);
    res.send({"msg":"Something went wrong"});
  }
});

postRoutes.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const note = await PostModel.findOne({ "_id": id });
  const userId_in_note = note.userID;
  const userId_making_req = req.body.userID;
  try {
    if (userId_making_req !== userId_in_note) {
      res.send({ "msg": "You are not authorized" });
    } else {
      await PostModel.findByIdAndUpdate({ "_id": id }, payload);
      res.send( "update the post" );
    }
  } catch (err) {
    console.log(err);
    res.send({ "msg": "Something went wrong" });
  }
});

postRoutes.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const note = await PostModel.findOne({ "_id": id });
  const userId_in_note = note.userID;
  const userId_making_req = req.body.userID;
  try {
    if (userId_making_req !== userId_in_note) {
      res.send({ msg: "You are not Recognazed" });
    } else {
      await PostModel.findByIdAndDelete({ "_id": id });
      res.send("Deleted the Note");
    }
  } catch (err) {
    console.log(err);
    res.send({ "msg": "Something went wrong" });
  }
});

module.exports = {
  postRoutes,
};
