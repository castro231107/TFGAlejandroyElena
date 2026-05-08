const mongoose = require("mongoose");

const historialSchema = new mongoose.Schema({

  // ID del usuario
  userId: {
    type: Number,
    required: true
  },

  // Concepto del movimiento
  concepto: {
    type: String,
    required: true
  },

  // Cantidad del movimiento
  cantidad: {
    type: Number,
    required: true
  },

  // Categoría
  categoria: {
    type: String,
    enum: [
      "Comida",
      "Transporte",
      "Ocio",
      "Vestuario",
      "Otros"
    ],
    required: true
  },

  // Fecha automática
  fecha: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Historial", historialSchema);