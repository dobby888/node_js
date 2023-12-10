// const http = require('http');

const express = require('express');

const app = express();
 
//use allows us to add a new middleware function: accepts an array of request handlers
//passed function will be executed for every incoming request
app.use((req, res, next) => {
    console.log("in the middleware!");
    //using next will let the request to continue to the nect middleware instead of dying in this funciton itself
    //so if we dont call next we should call a response, cuz otherwise the req cant continue its journey=>never reach the place of response
    next();
})

app.use((req, res, next) => {
    console.log("in the another middleware!");
    //....send the response: using express: send();=> we could end any type of response:ex: string, html, file...
    res.send(`<h1>hello from express!</h1>`);
})
 
// const server = http.createServer(app);
// server.listen(3000);

//we dont even need the http anymore
//instead:
////app.listen(3000);