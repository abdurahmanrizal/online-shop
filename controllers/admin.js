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

  req.user
    .getProducts({
      where: {
        id: req.params.productId,
      },
    })
    // Product.findByPk(req.params.productId)
    .then((products) => {
      const product = products[0];
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editingMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // cool way
  req.user
    .createProduct({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user.id,
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
  // alternative way
  // Product.create({
  //   title: title,
  //   price: price,
  //   description: description,
  //   imageUrl: imageUrl,
  //   userId: req.user.id,
  // })
  //   .then((result) => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // first way with association
  req.user
    .getProducts({
      where: {
        id: productId,
      },
    })
    // Product.findByPk(productId) // not with association
    .then((products) => {
      const product = products[0];
      if (!product) {
        res.redirect("/");
      }
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("updated");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  // second way
  // Product.update(
  //   {
  //     title: title,
  //     price: price,
  //     description: description,
  //     imageUrl: imageUrl,
  //   },
  //   {
  //     where: {
  //       id: productId,
  //     },
  //   }
  // )
  //   .then(() => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  // first way with association
  req.user
    .getProducts({
      where: {
        id: productId,
      },
    })
    // Product.findByPk(productId) // first way with not association
    .then((products) => {
      const product = products[0];
      if (!product) {
        res.redirect("/");
      }
      return product.destroy();
    })
    .then((result) => {
      console.log("deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  // second way
  // Product.destroy({
  //   where: {
  //     id: productId,
  //   },
  // })
  //   .then(() => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        prods: products,
      });
    })
    .catch((err) => console.log(err));
};
