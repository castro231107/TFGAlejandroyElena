const bcrypt = require("bcrypt");
const User = require("../models/User");

// ========================
// LOGIN USUARIO
// ========================
exports.loginUsuario = async (req, res) => {

  try {

    const { correo, password } = req.body;

    console.log("LOGIN INTENTO:", correo);

    //  BUSCAR USUARIO
    const user = await User.findOne({ correo });

    //  USUARIO NO EXISTE
    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado"
      });
    }

    //  COMPARAR CONTRASEÑA
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    //  CONTRASEÑA INCORRECTA
    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta"
      });
    }

    //  LOGIN CORRECTO
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
};