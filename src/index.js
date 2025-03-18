const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const itemRoutes = require("./controllers/ItemController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", itemRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));