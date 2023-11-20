const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const contactUsRoute = require("./routes/contactus");
const successRoute = require("./routes/success");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Use the routes without a base path
app.use('/admin',adminRoute);
app.use(shopRoute);
app.use("/contactUs",contactUsRoute)
app.use('/success', successRoute);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(8000)


 