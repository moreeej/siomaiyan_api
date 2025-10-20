const CartModel = require('../models/AddToCart')

async function getCarts(req, res){
    try {
    const cart = await CartModel.find();
    res.json(cart);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
}

async function addToCart(req, res) {
  try {
    const { user_id, username, product_id, product_name, product_image, quantity, total_price } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingItem = await CartModel.findOne({ user_id, product_id });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      existingItem.total_price = existingItem.quantity * (total_price / quantity); 
      await existingItem.save();
      return res.status(200).json({ message: "Product quantity updated", cartItem: existingItem });
    }

    // Create a new cart item
    const newCartItem = new CartModel({
      user_id,
      username,
      product_id,
      product_name,
      product_image,
      quantity: quantity || 1,
      total_price,
    });

    await newCartItem.save();
    res.json({ message: "Product added to cart", cartItem: newCartItem });
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json({ error: "Error adding product to cart" });
  }
}


async function fetchUserCart(req, res) {
  try {
    const { user_id } = req.query; 

    if (!user_id) {
      return res.status(400).json({ error: "Missing user_id" });
    }

    const cartItems = await CartModel.find({ user_id });

    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ error: "Error fetching cart items" });
  }
}



module.exports = {
    getCarts,
    addToCart,
    fetchUserCart
}