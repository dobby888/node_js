const http = require('http');
const server=http.createServer((req, res) => {
    //console.log("URL:",req.url, "METHOD:",req.method, "HEADERS:",req.headers);
    console.log(req.url, req.method, req.headers)
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First page.</title></head>');
    res.write('<body><h1>Hello from my Node.js Server.</h1></body>');
    res.write('</html>');
    res.end();//dont change response after ending it=>error
    //.write: write some data to our response and it works in chunks
    //Content-Type: default header type for the browser
    //text/html: attatches a header to our response where its type is set to html

}) 
  
server.listen(3000);

// url: /
// methos: GET
// headers:
// {
//   host: 'localhost:3000',
//   connection: 'keep-alive',
//   'cache-control': 'max-age=0',
//   'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
//   'sec-ch-ua-mobile': '?0',
//   'sec-ch-ua-platform': '"Windows"',
//   'upgrade-insecure-requests': '1',
//   'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
//   accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//   'sec-fetch-site': 'cross-site',
//   'sec-fetch-mode': 'navigate',
//   'sec-fetch-user': '?1',
//   'sec-fetch-dest': 'document',
//   'accept-encoding': 'gzip, deflate, br',
//   'accept-language': 'en-US,en;q=0.9,hi;q=0.8,te;q=0.7'
// }



//RESPONSES: 
