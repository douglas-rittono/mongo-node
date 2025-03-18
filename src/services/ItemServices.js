const ItemRepository = require("../repositories/ItemRepository");
const { v4: uuidv4 } = require("uuid");

const createItem = async (data) => {
    data.id = uuidv4();
    return await ItemRepository.create(data);
  };
const getAllItems = async () => await ItemRepository.findAll();
const getItemById = async (id) => await ItemRepository.findById(id);
const updateItem = async (id, data) => await ItemRepository.update(id, data);
const deleteItem = async (id) => await ItemRepository.remove(id);

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem };