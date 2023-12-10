// const path = require('path');

// const express = require('express');

// const shopController = require('../controllers/shop');

// const router = express.Router();

// router.get('/', shopController.getIndex);

// router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

// module.exports = router;


//learning code:

//path is used to work with file and directory paths 
const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    //.join property concats the inputs to form an absolute path to the required variable
    //__dirname is the name of the current module 
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); 
    //the above is an absolute path to the shop.html file in views directory
    //along with res.sendFile it is used to send an html file as a response to the specific route
});
  
module.exports = router;  