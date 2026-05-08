const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Tarjeta = require("./models/Tarjeta");

const app = express();

require("dotenv").config();

// ========================
// GENERAR TARJETA
// ========================

// Número tarjeta
function generarNumeroTarjeta() {

  let numero = "";

  for (let i = 0; i < 4; i++) {

    numero += Math.floor(1000 + Math.random() * 9000);

    if (i < 3) {
      numero += " ";
    }
  }

  return numero;
}

// CVV
function generarCVV() {
  return Math.floor(100 + Math.random() * 900).toString();
}

// Fecha caducidad
function generarFechaCaducidad() {

  const mes = String(
    Math.floor(Math.random() * 12) + 1
  ).padStart(2, "0");

  const año = String(
    new Date().getFullYear() + 4
  ).slice(-2);

  return `${mes}/${año}`;
}

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
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    // 👤 CREAR USUARIO
    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });

    // 💳 CREAR TARJETA AUTOMÁTICA
    await Tarjeta.create({

      userId: user.id,

      numeroTarjeta: generarNumeroTarjeta(),

      cvv: generarCVV(),

      fechaCaducidad: generarFechaCaducidad()

    });

    console.log("USUARIO CREADO:", user);

    res.json(user);

  } catch (err) {

    console.log("ERROR REGISTRO:");
    console.log(err);

    res.status(500).json({
      message: "Error al crear usuario"
    });
  }
});

// ========================
// LOGIN USUARIO
// ========================
app.post("/api/login", async (req, res) => {

  try {

    const { correo, password } = req.body;

    console.log("LOGIN INTENTO:", correo);

    // 🔍 BUSCAR USUARIO
    const user = await User.findOne({ correo });

    // ❌ USUARIO NO EXISTE
    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado"
      });
    }

    // 🔐 COMPARAR CONTRASEÑA
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    // ❌ CONTRASEÑA INCORRECTA
    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta"
      });
    }

    // ✅ LOGIN CORRECTO
    res.json({
      message: "Login correcto",
      user
    });

  } catch (err) {

    console.log("ERROR LOGIN:");
    console.log(err);

    res.status(500).json({
      message: "Error en el servidor"
    });
  }
});

// ========================
// OBTENER USUARIO POR ID
// ========================
app.get("/api/usuarios/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let user;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id);
    } else {
      user = await User.findOne({ id: parseInt(id) });
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el usuario" });
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