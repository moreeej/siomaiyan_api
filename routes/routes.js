const express = require("express");
const router = express.Router();

const userController = require('../controllers/UserController');
const productController = require('../controllers/ProductController')
const cartController = require('../controllers/CartController')

router.get("/getUsers", userController.getUsers);
router.post("/checkCreds", userController.checkCreds)

router.get("/getProducts", productController.getProducts)
router.get("/getProductWithLimit", productController.getProductWithLimit)

router.get("/getCarts", cartController.getCarts)

module.exports = router;  
