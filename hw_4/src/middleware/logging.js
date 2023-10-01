

const logging = (req, res, next) => {
    const { method, url, query, body } = req
    console.log(`${method} ${url} query:${JSON.stringify(query)} body:${JSON.stringify(body)}`)
    next()

}

export default logging