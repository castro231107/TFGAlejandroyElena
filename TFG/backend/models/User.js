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
    unique: true,
    required: true
  },
  telefono: String,
  dinero: {
    type: Number,
    default: 2000
  }
});

// 🔥 AUTOINCREMENTO
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "users" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.id = counter.seq;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);