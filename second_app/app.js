const http = require('http');

const server = http.createServer((req, res) => { 
    if (req.url === '/') {
        res.write("hello world");
        res.end();
    }
    // writing an array of obects using json 
    if (req.url === "/api/courses") {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

server.listen(3000);

console.log('Server listening on port 3000');