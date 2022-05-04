// Written by Nicholas Hussain 
// Inspired by https://github.com/profjake/APWJS_Final_Lab
// And isnpired by https://github.com/athoutam1/Restaurant-Reservation/tree/master/api

const mongoose = require("mongoose");

const newResSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    capacity: String,
    tableName: String
})

const newRes = mongoose.model("NewReservation", newResSchema);

module.exports = newRes;
//modules.exports.schema = newResSchema;