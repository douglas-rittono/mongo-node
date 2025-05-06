const OrderRepository = require("../repositories/OrderRepository");
const ItemServices = require("./ItemServices");
const CacheRepository = require("../repositories/CacheRepository");
const { v4: uuidv4 } = require("uuid");

const createOrder = async (data) => {
    data._id = uuidv4();
    data.totalValue = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = await OrderRepository.create(data);
    if(order){
      order.items.forEach(async (item) => {
        await ItemServices.quantityChange(item.id, item.quantity);
      });
    }
    await CacheRepository.set(data._id, order);
    return order;
  };
const getAllOrders = async () => await OrderRepository.findAll();

const getOrderById = async (id) => {
  const cachedOrder = await CacheRepository.get(id);
  if (cachedOrder) {
    return cachedOrder;
  }
  await OrderRepository.findById(id);
}
const getOrderByItemId = async (itemId) => await OrderRepository.findByItemId(itemId);

module.exports = { createOrder, getAllOrders, getOrderById , getOrderByItemId };