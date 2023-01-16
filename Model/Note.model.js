const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title:String,
    note:String,
    category:String,
    user_id:String
  });
  
  const NoteModel = mongoose.model("Notes", noteSchema);

  module.exports = {
    NoteModel,
  };