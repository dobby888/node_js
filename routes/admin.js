
// const path = require('path');

// const express = require('express');

// const adminController = require('../controllers/admin');

// const router = express.Router();

// // /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);

// // /admin/products => GET
// router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

// module.exports = router;



//learning code:

const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

//we can have the default url code like the url's which only starts with /admin shoul enter into the admin file not any eles: for that we might have to add the /admin in each of the route or we can directly use them in the middleware to filter the paths for that:
//like: /admin/add-product
router.get('/add-product', (req, res, next) => {
    //modify the post method also for add-product and make sure to add /admin at start
    res.sendFile(path.join(rootDir,'views','add-product.html'))
}) 

router.post('/add-product',  (req, res, next) => {
    console.log(JSON.stringify(req.body));
    res.redirect('/');
})

module.exports = router;
 