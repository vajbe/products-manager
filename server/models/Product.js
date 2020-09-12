const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_id: String,
    product_name: String,
    cost_price: String,
    selling_price: String,
    quantity: String,
});

module.exports = mongoose.model("Products", ProductSchema, "products");