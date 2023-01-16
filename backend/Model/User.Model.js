const mongoose = require("mongoose");

const regSchema = mongoose.Schema({
  username: String,
  email: String,
  password :String,
 
});

const UserModel = mongoose.model("user", regSchema);

module.exports = {
  UserModel,
};
