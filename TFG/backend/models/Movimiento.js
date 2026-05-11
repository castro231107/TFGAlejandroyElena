const mongoose = require("mongoose");

const movimientoSchema = new mongoose.Schema({

  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  comercio: String,
  descripcion: String,

  cantidad: {
    type: Number,
    required: true
  },

  categoria: {
    type: String,
    enum: ["alimentacion", "ocio", "transporte", "vivienda", "suscripciones", "otros"]
  },

  fecha: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Movimiento", movimientoSchema);