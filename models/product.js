const { json } = require("body-parser");
const fs = require("fs");

const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product{
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile(products => {            
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        });
    }

//     static fetchAll() {
//         const p = path.join(
//             path.dirname(process.mainModule.filename),
//             "data",
//             "products.json"
//         );
//         fs.readFile(p, (err, fileContent) => {
//             if (err) {
//                 return [];
//             }
//             return JSON.parse(fileContent);
//         })
//     }
    // }
    //the below code is same as the above one just that the below one will be be the asunchronous code where as the above one will be the synchronous code

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}