const mongoose = require("mongoose");

const tarjetaSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  numeroTarjeta: String,
  cvv: String,
  fechaCaducidad: String

});

module.exports = mongoose.model("Tarjeta", tarjetaSchema);