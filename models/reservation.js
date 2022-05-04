// Written by Nicholas Hussain 
// Inspired by https://github.com/profjake/APWJS_Final_Lab
// And isnpired by https://github.com/athoutam1/Restaurant-Reservation/tree/master/api

const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: String,
  phone_num: String,
  email: String

});
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;
