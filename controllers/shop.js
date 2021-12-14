const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((rows) => {
      res.render("shop/product-list", {
        pageTitle: "Products",
        path: "/products",
        prods: rows,
      });
    })
    .catch((err) => err);
};
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((rows) => {
      res.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        prods: rows,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const checkProductData = cart.products.find((p) => p.id === product.id);
        if (checkProductData) {
          cartProducts.push({
            productData: product,
            qty: checkProductData.qty,
          });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.deleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
  });

  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((rows) => {
      res.render("shop/product-detail", {
        pageTitle: rows.title,
        path: "/products",
        product: rows,
      });
    })
    .catch((err) => console.log(err));
};
