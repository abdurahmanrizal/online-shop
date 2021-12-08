const Product = require('../models/product');
exports.getProducts = (req,res,next) => {
    Product.fetchAll(products => {
        res.render("shop/product-list", {
            pageTitle: "Products",
            path: '/products',
            prods: products
        });
    })
}
exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/index", {
            pageTitle: "Shop",
            path: '/',
            prods: products
        });
    })
}

exports.getCart = (req,res,next) => {
    res.render('shop/cart', {
        pageTitle: "Your Cart",
        path: '/cart',
    })
}

exports.postCart = (req,res,next) => {
    const prodId = req.body.productId
    console.log(prodId)
    res.redirect('/cart')
}

exports.getOrders = (req,res,next) => {
    res.render('shop/orders', {
        pageTitle: "Your Orders",
        path: '/orders',
    })
}

exports.getProduct = (req,res, next) => {
    const id = req.params.id;
    Product.findById(id, product => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            path: '/products',
            product: product
        })
    })
}