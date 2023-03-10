const express = require("express");
const { UserModel } = require("../Model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userRouter = express.Router();


userRouter.post("/register", async(req, res)=>{
    const {fname, lname, email, password, score, diamonds} = req.body;
    try {
      const data = await UserModel.find({email});
      if(data.length>0){
           res.send({"msg":"User already Registered"});
      }  
      else{
        bcrypt.hash(password, 7, async(err, hash)=>{
            if(err) res.send({"msg":"Wrong Credentials"});
            else{
                const user = new UserModel({fname, lname, email, password:hash, score:0, diamonds:0});
                await user.save();
                res.send(user);
            }
        });
      }
    } 
    catch(err){
        res.status(400).send({"msg":err.message});
    }
})


userRouter.get("/", async(req, res)=>{
    try {
       const data = await UserModel.find();
       res.send(data);
    }
    catch(err){
       res.status(400).send({"msg":err.message}); 
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email,password}=req.body;
    try {
        const data = await UserModel.find({email});
        if(data.length>0){
            bcrypt.compare(password, data[0].password, function(err, result) {
                if(result){
                    const token = jwt.sign({ userID: data[0]._id}, 'chidiyaudd');
                    res.send({"msg":"Login Successful", "token":token, "currentUser":data[0]});
                }
                else{
                    res.send({"msg":"Something went Wrong"});
                }
            });
           
        }
        else{
            res.send({"msg":"Wrong Credentials"});
        }
    } 
    catch(err){
        res.status(400).send({"msg":err.message});
    }
})


userRouter.patch("/update/:id", async (req, res) =>{
    try{
        const ID = req.params.id;
        const payload = req.body;
        await UserModel.findByIdAndUpdate({_id:ID}, payload);
        res.send({"msg":"User has been updated"});
    }
    catch(err){
        res.send(err.message);
    }
})

userRouter.delete("/delete/:id", async (req, res) =>{
    try{
        const ID = req.params.id;
        await UserModel.findByIdAndDelete({_id:ID});
        res.send({"msg":"User has been deleted"});
    }
    catch(err){
        res.status(400).send({"msg":err.message});
    }
})

module.exports = {userRouter};