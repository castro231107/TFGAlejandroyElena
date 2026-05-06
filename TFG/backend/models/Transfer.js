const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  deQuien: String,
  haciaQuien: String,
  cantidad: Number,
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transfer", transferSchema);