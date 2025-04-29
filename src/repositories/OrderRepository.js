const Order = require("../model/Order");

const create = async (data) => await new Order(data).save();
const findAll = async () => await Order.find();
const findById = async (id) => await Order.findById(id);
const findByItemId = async (itemId) => await Order.findOne({ "items._id": itemId});

module.exports = { create, findAll, findById, findByItemId };