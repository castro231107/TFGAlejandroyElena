const Tarjeta = require("../models/Tarjeta");

exports.obtenerTarjetaPorUsuario = async (req, res) => {
  try {
    const tarjeta = await Tarjeta
      .findOne({ userId: req.params.userId })
      .populate("userId", "nombre apellidos");
    //.populate coge el usuario con ese id y le saca el nombre y los apellidos

    if (!tarjeta) {
      return res.status(404).json({ message: "Tarjeta no encontrada" });
    }

    res.json(tarjeta);
    //Nos devuelve en formato JSON los datos de la tarjeta y el nombre y apellidos del usuario

  } catch (err) {
    res.status(500).json({ message: "Error al obtener tarjeta" });
  }
};