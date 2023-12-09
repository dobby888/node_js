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

app.listen(3000);

//order always matters in middleware usage(not in importing the middleware): we cant place the '/' middleware above anything as that would mean that all the routes starting with '/' would be eligible to be open using the '/' route