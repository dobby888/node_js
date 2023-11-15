const http = require("http");

const express = require("express");

const app = express();

//use middleware after creating app object but before we pass it to create a server
app.use((req, res, next) => {
    console.log("in the missle ware");
    next();//call next here(only if we dont send a response) allows the req to travel on to the next middleware in line if not the funciton just dies and cant continue to the next middleware
});//add  a new middleware function:accepts an array of request handlers, third argument is a function: this function has to be executed to allow the request to travel on net middleware

app.use((req, res, next) => {
    console.log("in the another missle ware");
    res.send("<h1>Hello From Express.</h1>");//sends the response by attatching a body of any kind

});

// const server = http.createServer(app);

// server.listen(9000);

app.listen(3000);//listens along with creating the server