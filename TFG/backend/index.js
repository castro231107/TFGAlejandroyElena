const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Conexión

mongoose.connect("mongodb+srv://elenab:holaquetal@cluster0.xlwvdhu.mongodb.net/?appName=Cluster0")
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend funcionando");
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});