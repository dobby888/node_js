const path = require("path");

const rootDir = require("../util/path");

const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    //console.log(product)
    res.redirect("/");
}

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir,"views","add-product.html"))
}

// exports.getProduct = (req, res, next) => {
//     const products = Product.fetchAll();
//     res.sendFile(path.join(rootDir, "views", "shop.html"))
// };

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.sendFile(path.join(rootDir, "views", "shop.html"))
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId; 
    Product.findById(prodId, product => {
        console.log(product)
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product Detail',
            path: '/products'
          });
    })
    //res.redirect("/");
}

exports.getContact = (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "contactus.html"));
};

exports.getSuccess = (req, res, next) => {
    res.redirect("/success");
};

exports.postSuccess = (req, res, next) => {
    res.send("<h1>Form successfully filled!</h1>");
};