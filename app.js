//const http = require("http");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");//imports the router object form the admin file
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({extended:false}));//parser always before all the route handling middlewares bcuz the parser is a must even our req ends up else where
//urlencoded: registers a middleware, parses the input sent through the form.
//extended:false=>makes sure to only parse the non default features

app.use("/admin", adminRoutes);//we use place this at the top so that the route get available before using it for any other operaitons
//now only routes starting with /admin will go into the adminRoutes file and express.js ignores the /admin in the url when we try to match with the req in the admin.js
app.use("/shop",shopRoutes);


app.use((req, res, next) => {
       res.status(404).send("<h1>Page not found.</h1>");//error:page not found
});

//if we want a middleware to always run we should add it at the top bcuz the code always runs form top to bottom.
// app.use("/",(req, res, next) => {
//     //console.log("This always runs.");
//     next();//call next here(only if we dont send a response) allows the req to travel on to the next middleware in line if not the funciton just dies and cant continue to the next middleware
       //add next is u dont want to send more than one response so that the process dies after sending a response

// });



//use middleware after creating app object but before we pass it to create a server
// app.use("/",(req, res, next) => {
//     //console.log("in the another missle ware");
//     //next();//call next here(only if we dont send a response) allows the req to travel on to the next middleware in line if not the funciton just dies and cant continue to the next middleware
//     res.send("<h1>Hello From Express.</h1>");//sends the response by attatching a body of any kind
//we can add any other method like status ot setHeader to the req along with the send but send have to be the last method in the list
// });

// const server = http.createServer(app);

// server.listen(9000);

app.listen(3000);//listens along with creating the server