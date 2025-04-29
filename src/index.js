const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const itemRoutes = require("./controllers/ItemController");
const OrderController = require("./controllers/OrderController");
const HealthCheck = require("./controllers/HealthCheckController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/items", itemRoutes);
app.use("/api/orders", OrderController);
app.use("/api/health", HealthCheck);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));