const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);
// /admin/products => GET
router.get("/products", adminController.getProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);
router.post("/edit-product", adminController.postEditProduct);
router.post("/delete-product", adminController.postDeleteProduct);

exports.routes = router;
