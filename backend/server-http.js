//1.Create an http servr that runs on port 8080 of my localhost.
//do this using http & Express JS
//library in nodejs: http

const http = require('http');
//industry standards for choosing
//3000->ui
//8080->http1 server
//8082->http2 server
//5432->postgres server
//...


//ip address - 32bit address of the server - 127.0.0.1
const hostname = '127.0.0.1';
const port =8080// 0 to 100000

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader ('Conten-Type', 'text/plain');
    response.end('Hello World');
})
server.listen(port, hostname, () =>{
    console.log('Server is listening on port' + port)
})
