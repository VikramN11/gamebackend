const mongoose = require("mongoose");

const travelSchema = mongoose.Schema({
    name : String,
    email : String,
    dest : String,
    no_of_traveller : Number,
    budget : Number
})

const TravelModel = mongoose.model("travel", travelSchema);

module.exports = {
    TravelModel
}