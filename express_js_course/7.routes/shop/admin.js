const express = require('express');

//Router is like a mini express app that is tied to the other express app and connected to the other app
const router = express.Router();

//router.use works same as the app.use but just change the use to get so as to only allow the get req through the below middleware
router.get('/add-product', (req, res, next) => {
    res.send(`<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add-Product</button></form>`);
})

router.post('/product',  (req, res, next) => {
    console.log(JSON.stringify(req.body));
    res.redirect('/');
})

//export this code into the app.js file and we afgain have to import this there again
module.exports = router;
