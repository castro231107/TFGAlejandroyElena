const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

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