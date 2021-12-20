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
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: products,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({
        where: {
          id: prodId,
        },
      });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: newQuantity,
        },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.deleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({
        where: {
          id: prodId,
        },
      });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      req.user
        .createOrder()
        .then((order) => {
          return order.addProduct(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
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
