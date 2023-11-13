const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>")
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            //console.log(chunk);
            body.push(chunk);
        });//the data event will be triggered whenever a new chunk is ready to be read.
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split("=")[1];
            res.write("<html>");
            res.write("<head><title>Enter Message</title></head>");
            res.write("<body>"+message+"<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>")
            res.write("</html>");
            return res.end();
            //fs.writeFileSync("message.txt", message);
            //sync:synchronous=>we are blocking the execution of the next line of code until this file is done.So,
            //writefile also takes a 3 arguments:filePath,data,callback
            fs.writeFile("message.txt", message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    // res.setHeader("Content-Type", "text/html");
    // res.write("<html>");
    // res.write("<head><title>My First Page</title></head>");
    // res.write("<body><h1>Hello From my Node.js Server</h1></body>")
    // res.write("</html>");
    //res.end();
//we shouldnt write anything after end();
});
server.listen(3000);