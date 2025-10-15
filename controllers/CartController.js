const CartModel = require('../models/AddToCart')

async function getCarts(res, req){
    try {
    const cart = await CartModel.find();
    res.json(cart);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
}


module.exports = {
    getCarts
}