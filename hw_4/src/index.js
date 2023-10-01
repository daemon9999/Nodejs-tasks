import express from "express"
import newsPostsRouter from "./router/newsPostsRouter.js"
import logging from "./middleware/logging.js"
import 'dotenv/config'

const HOST = process.env.HOST
const PORT = process.env.PORT



const app = express()
app.use(express.json())
app.use(logging)

app.use('/api', newsPostsRouter)



app.listen(PORT, HOST, () => {
    console.log(`Server is running: http://${HOST}:${PORT}`)
})