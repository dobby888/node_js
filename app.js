const http = require("http");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:false}));//parser always before all the route handling middlewares bcuz the parser is a must even our req ends up else where
//urlencoded: registers a middleware, parses the input sent through the form.
//extended:false=>makes sure to only parse the non default features

//if we want a middleware to always run we should add it at the top bcuz the code always runs form top to bottom.
// app.use("/",(req, res, next) => {
//     //console.log("This always runs.");
//     next();
// });

app.use("/add-product",(req, res, next) => {
    //console.log("in the another missle ware");
    //next();//call next here(only if we dont send a response) allows the req to travel on to the next middleware in line if not the funciton just dies and cant continue to the next middleware
    res.send('<form action="/product" method="POST"><input type="text" name="title" placeholder="Product Name"><input type="text" name="size" placeholder="Product Size"><button type="submit">Add Product.</button></form>');//sends the response by attatching a body of any kind of data type
    //next();//add next is u dont want to send more than one response so that the process dies after sending a response
});

//this middleware always executes not only for post req but also for get req
//if we use post or get instead of use we will then only get those specific inputs only
app.use('/product', (req, res, next) => {
    console.log(req.body)//req gives us the body convenience property but by default req doesnt try to parse the incoming req body=>parser
    res.redirect("/");
})

//use middleware after creating app object but before we pass it to create a server
app.use("/",(req, res, next) => {
    //console.log("in the another missle ware");
    //next();//call next here(only if we dont send a response) allows the req to travel on to the next middleware in line if not the funciton just dies and cant continue to the next middleware
    res.send("<h1>Hello From Express.</h1>");//sends the response by attatching a body of any kind

});

// const server = http.createServer(app);

// server.listen(9000);

app.listen(3000);//listens along with creating the server