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
        req.on('data', (chunk) => {//data event will be triggered whenever a new chunk is ready to be read(uses Buffer event)
            console.log(chunk);
            body.push(chunk);
        });//event listener
        //'end' will be triggered as soon as it completes parsing the incoming data
        //all the chucks are now stored in the body array
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            //console.log(parsedBody)//to print the input field data
            //to store the input field data inside a  file
            const mesage = parsedBody.split('=')[1];
            //buffer is like a bus stop: now we convert the any type of input from the body into a string
            //creates a new buffer and concats all the chunks inside the body to it
            fs.writeFileSync('message.txt', mesage);//placing this below makes this line to execute after this funciton execution 
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
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
