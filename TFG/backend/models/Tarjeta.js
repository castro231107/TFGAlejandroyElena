const mongoose = require("mongoose");

const tarjetaSchema = new mongoose.Schema({

  // Usuario dueño de la tarjeta
  userId: {
    type: Number,
    required: true
  },

  // Número de tarjeta
  numeroTarjeta: {
    type: String,
    required: true
  },

  // CVV
  cvv: {
    type: String,
    required: true
  },

  // Fecha de caducidad
  fechaCaducidad: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model("Tarjeta", tarjetaSchema);