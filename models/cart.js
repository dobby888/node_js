const fs = require("fs");

const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart{
    static addProduct(id, productPrice) {
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                try {
                    // try to parse the file content as JSON
                    cart = JSON.parse(fileContent);
                } catch (err) {
                    // handle the case where the file content is not valid JSON
                    console.error("Error parsing cart.json:", err);
                }
            }
            const price = parseFloat(productPrice);
            //analyse the cart => find the existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct=cart.products[existingProductIndex]
            let updatedProduct;
            //add new product/ increase the quantity of the product
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
                updatedProduct.qty++;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += price;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }
}