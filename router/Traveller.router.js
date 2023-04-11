const express = require("express");
const {TravelModel} = require("../model/Traveller.model");

const travelRouter = express.Router();

travelRouter.get("/", async(req,res)=>{

    try {
        let qury = {}

    if(req.query.dest){
        qury.dest = req.query.dest;
        console.log(qury);
    }

    let sort = {}

    if(req.query.sort){
        const sortBy = req.query.sort.split(":");
        sort[sortBy[0]] = sortBy[1] === "desc" ? -1 : 1;
    }
    console.log(qury);
    console.log(sort);
        const travels = await TravelModel.find(qury).sort(sort);
        res.send({"travel":travels})
    } catch (err) {
        res.send({"msg":err.message});
    }
})

travelRouter.post("/create", async(req,res)=>{
     
       const payload = req.body;
       try {
          let travel = new TravelModel(payload);
          await travel.save();
          res.send({"msg":"New post added", "travel":travel})
       } catch (err) {
          res.send({"msg":err.message})
       }
})


module.exports = {
    travelRouter
}