const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      unique: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
  },
  { timestamps: true }
);

ProductSchema.pre("save", function (next) {
  this.inStock = this.quantity >= 20;
  next();
});

const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;


