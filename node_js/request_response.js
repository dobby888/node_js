const http = require("http");
const server = http.createServer((req, res) => {
    const url = req.url;
    res.setHeader("Content-Type", "text/html");
    if (url === "/home") {
        res.write("<html><body><h1>Welcome home</h1></body></html>");
    } else if (url === "/about") {
        res.write("<html><body><h1>Welcome to About us Page</h1></body></html>")
    } else if (url === "/node") {
        res.write("<html><body><h1>Welcome to my Node.js Project.</h1></body></html>")
    }
    res.end();
});
server.listen(2000);