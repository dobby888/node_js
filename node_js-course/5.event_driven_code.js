const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const mesage = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', mesage);//thsi line will be executed after the response is sent.....so move the response inside the event listener
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
    //js continues to execute the code and the event listeners are registered internally (start to parse the request body and they would be executed after the parsing of the body is completely done)(call back) and rightaway tarts to executes the next line of code
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First page.</title></head>');
    res.write('<body><h1>Hello from my Node.js Server.</h1></body>');
    res.write('</html>');
    res.end();
})
 
server.listen(3000);
//now we'll get error bcuz when the events are structured like this then the event listeners are registered internally and last function would be executed first then it stops executing before even entering(executing) into  the event listeners as they are the callback functions
//if not then the browser will slow down(code execution is blocked)
//to avoid this: return req.on('end',(=>{......}))//code execution will be stopped here 