const jwt = require("jsonwebtoken");
require("dotenv").config()
const authenticate = (req, res, next) => {
  const token=req.headers.authorization;
  if(!token){
    res.send({msg:"please login first"})
  }

  const decoded=jwt.verify(token, process.env.key);
  const {userId,email}=decoded
  if(decoded){
      req.body.email=email;
      req.body.userId=userId;
      next()
  }else{
      res.send({msg:"please login first"})
  }
};

module.exports = {
  authenticate,
};
