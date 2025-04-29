const OrderRepository = require("../repositories/OrderRepository");
const { v4: uuidv4 } = require("uuid");

const createOrder = async (data) => {
    data.id = uuidv4();
    data.totalValue = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return await OrderRepository.create(data);
  };
const getAllOrders = async () => await OrderRepository.findAll();
const getOrderById = async (id) => await OrderRepository.findById(id);
const getOrderByItemId = async (itemId) => await OrderRepository.findByItemId(itemId);

module.exports = { createOrder, getAllOrders, getOrderById , getOrderByItemId };