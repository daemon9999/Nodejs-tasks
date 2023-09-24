import http from "http"
let requestCount = 0
const server = http.createServer((req, res) => {



    if (req.url === '/') {
        res.end(JSON.stringify({ message: 'Request handled successfully', requestCount }));
        requestCount += 1
    }
})

const port = process.argv[2]?.split('=')[1] || 3000
server.listen(port)
