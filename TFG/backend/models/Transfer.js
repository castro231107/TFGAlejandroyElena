const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({

  // ID del usuario que envía
  emisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // ID del receptor
  receptorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Cantidad transferida
  cantidad: {
    type: Number,
    required: true
  },

  // Concepto de la transferencia
  concepto: {
    type: String,
    required: true
  },

  // Categoría
  categoria: {
    type: String,
    required: true,
    enum: [
      "Alimentación",
      "Ocio",
      "Transporte",
      "Vivienda",
      "Suscripciones",
      "Otros gastos"
    ],
    required: true
  },

  // Fecha automática
  fecha: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Transfer", transferSchema);
