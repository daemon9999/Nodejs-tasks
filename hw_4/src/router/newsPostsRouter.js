import { Router } from "express"
import { data as articles, data } from "../data.js"
import validateArticlePost from "../middleware/validateArticlePost.js"
import validateArticlePut from "../middleware/validateArticlePut.js"

const router = Router()

/* ARTICLE: GetWithPagination */
router.get('/newsposts', (req, res) => {
    const { page, size } = req.query

    if (!isNaN(page) && !isNaN(size)) {
        const start = (page - 1) * size
        const end = page * size

        const articlesLength = articles.length
        if (start >= articlesLength) {
            return res.status(200).end(JSON.stringify([]))

        } else if (end >= articlesLength) {
            return res.status(200).end(JSON.stringify(articles.slice(start, articlesLength)))

        } else {
            return res.status(200).end(JSON.stringify(articles.slice(start, end)))
        }

    } else {
        return res.status(500).end("Server error!")
    }
})



/* ARTICLE: GetById */
router.get('/newsposts/:id', (req, res) => {
    const { id } = req.params

    if (!isNaN(id)) {
        const articleToGet = articles.find(article => article.id === +id) || false

        if (articleToGet) {
            return res.status(200).end(JSON.stringify(articleToGet))
        } else {

            return res.status(404).end("404 | Article was not found!")
        }
    } else {
        return res.status(500).end("Server error!")
    }
})


/* ARTICLE: Create */
router.post('/newsposts', validateArticlePost, (req, res) => {
    const newArticle = { ...req.body, id: articles.length }

    articles.push(newArticle)

    return res.end('Article was created successfully!')
})



/* ARTICLE: UpdateById  */
router.put('/newsposts/:id', validateArticlePut, (req, res) => {
    const { id } = req.params
    if (!isNaN(id)) {

        const indexToUpdate = articles.findIndex(article => article.id === +id)
        if (indexToUpdate !== -1) {
            console.log(indexToUpdate)
            articles[indexToUpdate] = { ...articles[indexToUpdate], ...req.body }

            return res.status(201).end('Article was updated successfully!')
        }
        else {
            return res.status(404).end('Article was not found!')
        }
    }
    else {
        return res.status(500).end('Server error!')
    }
})

/* ARTICLE: DeleteById  */
router.delete('/newsposts/:id', (req, res) => {
    const { id } = req.params
    if (!isNaN(id)) {
        const indexToDelete = articles.findIndex(article => article.id === +id)
        if (indexToDelete !== -1) {
            articles.splice(indexToDelete, 1)
            return res.status(200).end("Article was deleted successfully!")
        } else {
            return res.status(404).end('Article was not found!')
        }
    } else {
        return res.status(500).end("Server error!")
    }

})

export default router