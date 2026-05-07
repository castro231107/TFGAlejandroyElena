const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const app = express();

require("dotenv").config();

// ========================
// MIDDLEWARES
// ========================
app.use(express.json());
app.use(cors());

// ========================
// CONEXIÓN A MONGODB
// ========================
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// ========================
// RUTA PRUEBA
// ========================
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

// ========================
// REGISTRO USUARIO
// ========================
app.post("/api/usuarios", async (req, res) => {

  console.log("BODY RECIBIDO:", req.body);

  try {

    // 🔐 ENCRIPTAR CONTRASEÑA
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });

    console.log("USUARIO CREADO:", user);

    res.json(user);

  } catch (err) {

    console.log("ERROR REGISTRO:");
    console.log(err);

    res.status(500).json({ message: "Error al crear usuario" });
  }
});

// ========================
// LOGIN USUARIO
// ========================
app.post("/api/login", async (req, res) => {

  try {

    const { correo, password } = req.body;

    console.log("LOGIN INTENTO:", correo);

    // 🔍 buscar usuario
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // 🔐 comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // ✅ login correcto
    res.json({
      message: "Login correcto",
      user
    });

  } catch (err) {

    console.log("ERROR LOGIN:");
    console.log(err);

    res.status(500).json({ message: "Error en el servidor" });
  }
});

// ========================
// SERVIDOR
// ========================
app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});
// npm install cors porque no se puede llamar desde un puerto 5173 a 3000 sin permiso
// tienes que instalar npm install bcrypt para encriptar la contraseña