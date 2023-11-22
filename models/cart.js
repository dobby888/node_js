const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProducts;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProducts = { ...existingProduct };
        updatedProducts.qty = updatedProducts.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProducts;
      } else {
        updatedProducts = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProducts];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
};