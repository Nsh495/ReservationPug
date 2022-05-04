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