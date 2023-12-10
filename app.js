const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 

const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
 
//now adding /admin here to only filter those url through the admin file
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    console.log('404 error')
});

app.listen(3000); 
console.log("server is listening")
