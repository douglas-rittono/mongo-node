const Item = require("../model/Item");

const create = async (data) => await new Item(data).save();
const findAll = async () => await Item.find();
const findById = async (id) => await Item.findById(id);
const update = async (id, data) => await Item.findByIdAndUpdate(id, data, { new: true });
const remove = async (id) => await Item.findByIdAndDelete(id);

module.exports = { create, findAll, findById, update, remove };