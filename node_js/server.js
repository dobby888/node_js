const http = require("http");
const server=http.createServer((req, res) => {
    console.log("my_name");
});
server.listen(4000);