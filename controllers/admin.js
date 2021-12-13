const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editingMode = req.query.edit;
  if (!editingMode) {
    return res.redirect("/");
  }
  Product.findById(req.params.productId, (prod) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editingMode,
      product: prod,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/admin/products");
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(productId, title, imageUrl, description, price);
  product.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.delete(productId);
  res.redirect("/admin/products");
};

exports.getProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      prods: products,
    });
  });
};
