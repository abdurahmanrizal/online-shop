const Product = require('../models/product');
exports.getProduct = (req,res,next) => {
    Product.fetchAll(products => {
        res.render("shop/product-list", {
            pageTitle: "Beranda",
            path: '/product',
            productCss: true,
            formCss: true,
            prods: products
        });
    })
}

exports.getAddProduct = (req, res, next) => {
    res.render("admin/product-add", {
        pageTitle: "Tambah Produk",
        path: '/product/add',
        productCss: true,
        formCss: true,
    })
}

exports.postAddProduct = (req,res,next) => {
    const product = new Product(req.body.title)
    product.save();
    res.redirect('/product')
}