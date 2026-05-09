const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  nombre: String,

  apellidos: String,

  correo: {
    type: String,
    unique: true
  },

  telefono: String,

  password: {
    type: String,
    required: true
  },

  dinero: {
    type: Number,
    default: 2000
  }

});

module.exports = mongoose.model("User", userSchema);