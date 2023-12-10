const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 

//using the relative path to the required import folder from the current folder
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
 
//now we can just use the import as a direct middleware
app.use(adminRoutes);
app.use(shopRoutes);

//req alwways acts from top to bottom so if there is any req related to the abve routes then that req will be executed anf if not we can have a error 404 req for that:
app.use((req, res, next) => {
    res.status(404).send(`<h1>Page not found!</h1>`);//statusCode 404: normal code for page not found error and when we add something like this we can add it anywhere even in admin.js or shop.js for any rutes but we just have to make sure that sned is the las one
});

app.listen(3000);
console.log("server is listening")

//order always matters in middleware usage(not in importing the middleware): we cant place the '/' middleware above anything as that would mean that all the routes starting with '/' would be eligible to be open using the '/' route
//but in thsi code we are using get req in shop.js instead of use req so the order wont matter but if we use 'use' req the order must be considered


