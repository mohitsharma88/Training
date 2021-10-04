var http = require("http");
http.createServer(function(request , response)
{
    // response.writehead(200,{'Content-Type':'text/plain'});
    response.end("hello node js World 9\n");
}).listen(8081)

console.log("Server running at http://127.0.0.1:8081/")