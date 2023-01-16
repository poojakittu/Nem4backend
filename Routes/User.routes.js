const express = require("express");
const { UserModel } = require("../Model/User.Model");
const userRoutes = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {connection}=require("../db")

userRoutes.post("/register",async (req,res)=>{
  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const {name,email,password}=req.body;
    const isUser=await UserModel.findOne({email});
    if(isUser){

        res.send({msg:"User Already Exists"})
    }else{

        bcrypt.hash(password,4,async function(err,hash){
            if(err){
                res.send({msg:"Something went wrong please try after sometime..."})
            }
            const new_user = new UserModel({
                name,email,password:hash
            });
            try{
                await new_user.save();
                res.send({msg:"Signup Sucessfull"})
            }catch(err){
                console.log(err)
                res.send({msg:"someting went wrong"})
            }

        })
    }
})


userRoutes.post("/login",async (req,res)=>{
  const {email,password}=req.body
const user=await UserModel.findOne({email});

if(user){
    const hashPass=user.password;
    const user_id=user._id;
    bcrypt.compare(password,hashPass,function(err,result){
        if(err){
            res.send({msg:"Something went wrong try after sometime"})
        }
        if(result){
            const token=jwt.sign({user_id:user_id,email:email},process.env.key)
        res.send({msg:"Login succesfull",token})
        }else{
            res.send({msg:"Login Failed...!"})
        }
    })
    
}else{
    res.send({msg:"User not Found"})
}
  })


module.exports = {
  userRoutes,
};
