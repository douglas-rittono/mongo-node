const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ItemSchema = require("./Item").schema;

const OrderSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    clientId: Number,
    clientName: String,
    totalValue: Number,
    date: { type: Date, default: Date.now },
    items: [ItemSchema]
});

module.exports = mongoose.model("Orders", OrderSchema);