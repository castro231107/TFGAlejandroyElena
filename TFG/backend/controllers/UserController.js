const bcrypt = require("bcrypt");
const User = require("../models/User");
const Tarjeta = require("../models/Tarjeta");

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
// REGISTRO USUARIO
// ========================
exports.registroUsuario = async (req, res) => {

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
    //User.create es una funcion de mongoose que crea un usuario
    //...req.body es para pasar los datos del body sacados del registro.jsx
    //password: hashedPassword es para pasar la contraseña encriptada

    // 💳 CREAR TARJETA AUTOMÁTICA
    await Tarjeta.create({

      userId: user._id,

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
};

// ========================
// OBTENER USUARIO POR ID
// ========================
exports.obtenerUsuario = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscamos la tarjeta asociada a este usuario
    const tarjeta = await Tarjeta.findOne({ userId: user._id });

    // Devolvemos el usuario con su tarjeta
    res.json({
      ...user._doc,
      tarjeta: tarjeta || null
    });

  } catch (err) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};