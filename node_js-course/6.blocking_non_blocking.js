const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res .end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {//make sure to place return infront of this event litener to stop code execution in this block if else we might get errors for header set after sending the response to the client 
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //Sync=synchronous:writeFileync: blocks the code execution until the message.txt file is created
            //writeFile funciton takes three arguments: that response will be sent after we are done working with the file=>event listener
            fs.writeFile('message.txt', message, (err) => {
                console.log(message);
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        }); 
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First page.</title></head>');
    res.write('<body><h1>Hello from my Node.js Server.</h1></body>');
    res.write('</html>');
    res.end();
}) 
 
server.listen(3000);

