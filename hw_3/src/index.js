import 'dotenv/config'
import http from "http"
import { data as articles } from './data.js'


const server = http.createServer((req, res) => {

    if (req.url !== '/favicon.ico') {

        if (req.method === 'GET') {

            const page = req.url?.split('&')[0]?.split('=')[1] || undefined
            const size = req.url?.split('&')[1]?.split('=')[1] || undefined

            if (!isNaN(page) && !isNaN(size)) {

                const start = (page - 1) * size
                const end = page * size

                const articlesLength = articles.length
                if (start >= articlesLength) {
                    res.end(JSON.stringify([]))

                } else if (end >= articlesLength) {
                    res.end(JSON.stringify(articles.slice(start, articlesLength)))

                } else {
                    res.end(JSON.stringify(articles.slice(start, end)))
                }

            } else {

                res.writeHead(500).end()
            }
        }

    }


})

const PORT = process.env.PORT
const HOST = process.env.HOST

server.listen(+PORT, HOST, () => {
    console.log(`Server is running: http://${HOST}:${PORT}`)
})
