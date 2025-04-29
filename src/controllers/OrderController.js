const express = require("express");
const router = express.Router();
const OrderService = require("../services/OrderServices");

router.post("/", async (req, res) => {
  const newOrder = await OrderService.createOrder(req.body);
  res.status(201).json(newOrder);
});

router.get("/", async (req, res) => {
  const orders = await OrderService.getAllOrders();
  res.json(orders);
});

router.get("/:id", async (req, res) => {
  const order = await OrderService.getOrderById(req.params.id);
  res.json(order);
});

router.get("/itemid/:id", async (req, res) => {
  const orders = await OrderService.getOrderByItemId(req.params.id);
  res.json(orders);
});

module.exports = router;