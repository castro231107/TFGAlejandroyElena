const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const { registroUsuario, obtenerUsuario } = require("./controllers/UserController");
const { loginUsuario } = require("./controllers/AuthController");
const { obtenerTarjetaPorUsuario } = require("./controllers/TarjetaController");  
const {
  crearMovimiento,
  obtenerMovimientosUsuario
} = require("./controllers/MovimientoController");

const app = express();

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
// RUTAS (AHORA USAN CONTROLLERS)
// ========================
app.post("/api/usuarios", registroUsuario);
// REGISTRO DE USUARIO
// .post se usa cuando quiero enviar datos al back
// .get se usa cuando quiero recibir datos del back

app.post("/api/login", loginUsuario);
// LOGIN DE USUARIO

app.get("/api/usuarios/:id", obtenerUsuario);
// OBTENER USUARIO

app.get("/api/tarjetas/:userId", obtenerTarjetaPorUsuario);
// OBTENER TARJETA

app.post("/api/movimientos", crearMovimiento);
app.get("/api/movimientos/:userId", obtenerMovimientosUsuario);

// ========================
// SERVIDOR
// ========================
app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});