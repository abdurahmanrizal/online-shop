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
  Product.findByPk(req.params.productId)
    .then((rows) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editingMode,
        product: rows,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
  })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.update(
    {
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
    },
    {
      where: {
        id: productId,
      },
    }
  )
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  // Product.delete(productId)
  //   .then(() => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  Product.findAll()
    .then((rows) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        prods: rows,
      });
    })
    .catch((err) => console.log(err));
};
