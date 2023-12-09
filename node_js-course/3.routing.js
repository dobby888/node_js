const http = require('http');
const fs = require('fs');//enables us to work with the file systems

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
        res.write('</html>');
        return res.end();//returns from this anonymous funciton and stops executing the code at this point
    }
    if (url === '/message' && method === 'POST') {//coditions must be same as the above form conditions if we wnat the page to be redirected to this
        fs.writeFileSync('message.txt', 'DUMMY');//path to the file,content of the file
        //fs.writeHead(302,{});//write some meta information in one go:302:redirection; {}: setting the header.........OR
        res.statusCode = 302;
        res.setHeader('Location', '/');//default header
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First page.</title></head>');
    res.write('<body><h1>Hello from my Node.js Server.</h1></body>');
    res.write('</html>');
    res.end();
})
 
server.listen(3000);


