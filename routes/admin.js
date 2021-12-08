const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

// /admin/add-product => GET
router.get('/add-product',adminController.getAddProduct)

// /admin/products => GET
router.get('/products', adminController.getProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

exports.routes = router;