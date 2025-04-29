const express = require("express");
const router = express.Router();
const ItemService = require("../services/ItemServices");

router.post("/", async (req, res) => {
  const newItem = await ItemService.createItem(req.body);
  res.status(201).json(newItem);
});

router.get("/", async (req, res) => {
  const items = await ItemService.getAllItems();
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await ItemService.getItemById(req.params.id);
  res.json(item);
});

router.put("/:id", async (req, res) => {
  const updatedItem = await ItemService.updateItem(req.params.id, req.body);
  res.json(updatedItem);
});

router.delete("/:id", async (req, res) => {
  await ItemService.deleteItem(req.params.id);
  res.json({ message: "Item removido" });
});

module.exports = router;