const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));//this only parses the send through the form type of request body if the type is file/JSON or something else we might have to use some other type of parser
//this also includes the next() so that the req would be continued  to teh nexzt part of the cod einstead of dying in this req itself
//without using this the req.body=undefined
//extended:false => to avoid parsing the default values

app.use('/add-product',(req, res, next) => {
    res.send(`<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add-Product</button></form>`);
    //now the above form returns a postmethod form to the /product route/middleware so we now have to handle that
})

//now the below middleware always execute always executes not only for post req but also for get req
app.use('/product',  (req, res, next) => {
    //console.log(req.body);
    //to avoid getting [Object: null prototype] 
    console.log(JSON.stringify(req.body));
    res.redirect('/');
})

app.use('/', (req, res, next) => {
    res.send(`<h1>hello from express!</h1>`);
})
 
app.listen(4000);