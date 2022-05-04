// Written by Nicholas Hussain 
// Inspired by https://github.com/profjake/APWJS_Final_Lab
// And isnpired by https://github.com/athoutam1/Restaurant-Reservation/tree/master/api

const mongoose = require("mongoose");

const reservationSchema = require("./reservation").schema;

const tableSchema = new mongoose.Schema({
  tableName: String,
  capacity: Number,
  isAvailable: Boolean,
  reservation: {
    required: false,
    type: reservationSchema
  },
  date: Date
});
const Table = mongoose.model("Table", tableSchema);

module.exports.model = Table;
module.exports.schema = tableSchema;