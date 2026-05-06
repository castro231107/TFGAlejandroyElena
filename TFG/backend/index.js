const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

// Conexión

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend funcionando");
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});

app.post("/api/usuarios", async (req, res) => {
  try {
    const User = require("./models/User");
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// npm install cors porque no se puede llamar desde un puerto 5173 a 3000 sin permiso