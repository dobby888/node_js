const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/", productsController.getContact);

router.post("/submit", productsController.getSuccess);

module.exports = router;