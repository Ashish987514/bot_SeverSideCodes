const mongoose = require("mongoose");

const SerialNumberSchema = new mongoose.Schema({
  serial_number: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SerialNumber", SerialNumberSchema);