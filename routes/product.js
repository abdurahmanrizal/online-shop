const express = require("express");

const router = express.Router();

const productController = require("../controllers/products");


router.get("/", productController.getProduct)

router.get('/add', productController.getAddProduct)

router.post('/add', productController.postAddProduct)


exports.routes = router;
