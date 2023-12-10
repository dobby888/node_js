const http = require('http');

//require():imports files to the node.js
//input:paths to files(even our own files(starts with "/":absolute path or "./":relativepath=>looks in the same folder)) or any core modules
//automaticaaly adds .js at the end
//if no ./ or / at start it looks for a global module(even if we have a file with that name)

// function reqListener(req,res) {
// }

// http.createServer(reqListener)

//pass the reqListener reference to the createServer: execute the function for every incoming request
 
//".":access methods or functions or properties related to that object in js

//createServer: takes a requestLitener and returns an intance server

//requestLitencer: takes two arguments the request(type: incoming message object) and the response object

//OR

//if a req happens please execute this funciton

const server=http.createServer((req, res) => {
    console.log(req);
    //process.exit();//tops the server after executing the code for once: we cant access the web page anymore
})
 
server.listen(3000);//starts listening to the server for requests

//starts the server: event loop: keeps on running  as long as there are event listeners registered: reqListener

