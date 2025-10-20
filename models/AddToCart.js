const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  username: {
    type: String,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  product_name: {
    type: String,
  },
  product_image: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  total_price: {
    type: Number,
  },
}, { timestamps: true });

const CartModel = mongoose.model("Carts", CartSchema);
module.exports = CartModel;
