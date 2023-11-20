const path = require("path");
const express = require("express");
const rootDir = require("../util/path");

const router = express.Router();

// Display the form
router.get("/", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "contactus.html"));
});

// Handle the form submission
router.post("/submit", (req, res, next) => {
    // Handle the form data (for now, just redirect to success page)
    res.redirect("/success");
});

module.exports = router;
