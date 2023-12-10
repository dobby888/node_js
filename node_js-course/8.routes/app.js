const http = require('http');

const routes = require('./routes');

//model.1:
// const server = http.createServer(routes);

//model.2:
const server = http.createServer(routes.handler);
console.log(routes.someText);

//model.3:same as model 2

server.listen(3000);

 