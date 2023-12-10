const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
 
//now adding /admin here to only filter those url through the admin file
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send(`<h1>Page not found!</h1>`);//statusCode 404: normal code for page not found error and when we add something like this we can add it anywhere even in admin.js or shop.js for any rutes but we just have to make sure that sned is the las one
});

app.listen(3000);
console.log("server is listening")
