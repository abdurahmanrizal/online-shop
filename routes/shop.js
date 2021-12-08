const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop")

// Admin Route
router.get("/", shopController.getIndex)
router.get("/products", shopController.getProducts)
router.get("/cart", shopController.getCart)
router.post("/cart",shopController.postCart)
router.get("/orders", shopController.getOrders)
router.get("/product/:id", shopController.getProduct)
router.post('/checkout')

exports.routes = router;
