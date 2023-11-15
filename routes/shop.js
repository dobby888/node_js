const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {//bcuz of using get instead of use in thjs line we will be getting "Add Product" instead of getting inside this function whrn the /add-product url is reloaded and it remains the same even if the order of adminRoutes,shopRoutes is cahnged
    //and get method also makes sure that the method is:"/"
    res.send("<h1>Hello from Express!</h1>")
});

module.exports = router;