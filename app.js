const express = require("express");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login");
const chatRoute = require("./routes/chat");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Use the routes without a base path
app.use(loginRoute);
app.use(chatRoute);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
