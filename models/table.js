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