const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

//   /admin/add-product=>GET
router.get("/add-product",(req, res, next) => {//if we have the paths in the router file starting with same segment ("/admin"):remove  from here and add them in the app.js as a filter
    //console.log("in the another missle ware");
    res.sendFile(path.join(rootDir,"views","add-product.html"))
});
 
//this middleware always executes not only for post req but also for get req
//if we use post or get instead of "use" we will then only get those specific inputs only, we can also use delete, patch, put

//   /admin/add-product=>POST
router.post('/add-product', (req, res, next) => {//we can repeat the same path bcuz we have different paths or different methods to handle the input
    console.log(req.body)//req gives us the body convenience property but by default req doesnt try to parse the incoming req body=>parser
    res.redirect("/");
}); 

module.exports = router;