const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    username:{
        type: String,
    },
    product_id:{
        type: Schema.Types.ObjectId,
        ref: "Products",
    },
    product_name:{
        type: String
    }
})

const CartModel = mongoose.model("Carts", CartSchema)

module.exports = CartModel;