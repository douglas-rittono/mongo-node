const ItemRepository = require("../repositories/ItemRepository");
const CacheRepository = require("../repositories/CacheRepository");

const { v4: uuidv4 } = require("uuid");

const createItem = async (data) => {
    data.id = uuidv4();
    const createdItem = await ItemRepository.create(data);
    if (createdItem) {
      CacheRepository.set(createdItem.id, createdItem);
    }
    return createdItem;
  };

const getAllItems = async () => {
  const items = await ItemRepository.findAll();
  items.forEach((item) => {
    CacheRepository.delete(item.id);
    CacheRepository.set(item.id, item);
  });
  return items;
}

const getItemById = async (id) => {
  const cachedItem = await CacheRepository.get(id);
  if (cachedItem) {
    return cachedItem;
  }
  const item = await ItemRepository.findById(id);
  if (item) {
    CacheRepository.set(id, item);
  }
  return item;
}

const updateItem = async (id, data) => 
  {    
    await ItemRepository.update(id, data);
    CacheRepository.delete(id);
    const updatedItem = await ItemRepository.findById(id);
    CacheRepository.set(id, updatedItem);
  }

const deleteItem = async (id) => {
  const itemRemoved = await ItemRepository.remove(id);
  if (itemRemoved) {
    CacheRepository.delete(id);
  }
  return itemRemoved;
}

const quantityChange = async (id, quantity) => {
  const item = await ItemRepository.findById(id);
  const newQuantity = item.quantity - quantity;
  if (newQuantity < 0) {
    throw new Error("Insufficient quantity");
  }
  await ItemRepository.update(id, { quantity: newQuantity });
  CacheRepository.delete(id);
  const updatedItem = await ItemRepository.findById(id);
  CacheRepository.set(id, updatedItem);
  return updatedItem;
}

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem, quantityChange };