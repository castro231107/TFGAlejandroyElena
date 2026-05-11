const Movimiento = require("../models/Movimiento");
const mongoose = require("mongoose");

exports.obtenerMovimientosUsuario = async (req, res) => {
  try {
    const userId = req.params.userId;

    //  VALIDACIÓN + CONVERSIÓN A OBJECTID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    const movimientos = await Movimiento.find({
      $or: [{ fromUserId: objectId }, { toUserId: objectId }],
    })
      .sort({ fecha: -1 })
      .populate("fromUserId", "nombre apellidos")
      .populate("toUserId", "nombre apellidos");

    res.json(movimientos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener movimientos" });
  }
};

exports.obtenerMovimientosUsuario = async (req, res) => {
  try {
    const userId = req.params.userId;

    const movimientos = await Movimiento.find({
      // Añadimos búsqueda por Texto y por ObjectId para que no falle nunca
      $or: [{ fromUserId: userId }, { toUserId: userId }],
    })
      .sort({ fecha: -1 })
      .populate("fromUserId", "nombre apellidos")
      .populate("toUserId", "nombre apellidos");

    res.json(movimientos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener movimientos" });
  }
};
