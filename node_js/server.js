// const http = require("http");
// const server=http.createServer((req, res) => {
//     console.log(req.url,req.method,req.headers);
//     //process.exit();
//     res.setHeader("Content-Type", "text/html");
//     res.write("<html>");
//     res.write("<head><title>My First Page</title></head>");
//     res.write("<body><h1>Hello From my Node.js Server</h1></body>")
//     res.write("</html>");
//     res.end();//we shouldnt write anything after end();
// });
// server.listen(1000);





const http = require("http");
const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>")
        res.write("</html>");
        return res.end();
    }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello From my Node.js Server</h1></body>")
    res.write("</html>");
    res.end();
//we shouldnt write anything after end();
});
//server.listen(1000);