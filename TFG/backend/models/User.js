const mongoose = require("mongoose");
const Counter = require("./Counter");

const userSchema = new mongoose.Schema({

  id: {
    type: Number,
    unique: true
  },

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

// AUTOINCREMENTO
userSchema.pre("save", async function () {

  if (this.isNew) {

    const counter = await Counter.findByIdAndUpdate(
      { _id: "users" },
      { $inc: { seq: 1 } },
      {
        returnDocument: "after",
        upsert: true
      }
    );

    this.id = counter.seq;
  }

});

module.exports = mongoose.model("User", userSchema);