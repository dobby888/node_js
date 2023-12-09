const express = require('express');

const app = express();

//app.use([path],callback,[callback]....)//more than one callbacks

//using '/' default below: but thi doesnt mean that the path has to be '/' but it means that the path has to start with '/'

app.use('/',(req, res, next)=> {
    console.log("this always runs");
    next();
})

app.use('/add-product',(req, res, next) => {
    console.log("in the product middleware!");
    res.send(`<h1>the "Add-Product" page.</h1>`);
})

app.use('/', (req, res, next) => {
    console.log("in the another middleware!");
    res.send(`<h1>hello from express!</h1>`);
})

app.listen(4000);