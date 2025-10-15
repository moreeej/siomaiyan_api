const ProductModel = require('../models/Prodcuts')

async function getProducts(req, res) {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
}

async function getProductWithLimit(req, res) {
  try {
    const products = await ProductModel.find({}).limit(4);
    res.json(products);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
}

module.exports = {
  getProducts,
  getProductWithLimit
};