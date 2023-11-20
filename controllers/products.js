const path = require("path");

const rootDir = require("../util/path");

const products = [];

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    console.log(products)
    res.redirect("/");
}

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir,"views","add-product.html"))
}

exports.getProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "shop.html"))
};

exports.getContact = (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "contactus.html"));
};

exports.getSuccess = (req, res, next) => {
    res.redirect("/success");
};

exports.postSuccess = (req, res, next) => {
    res.send("<h1>Form successfully filled!</h1>");
};