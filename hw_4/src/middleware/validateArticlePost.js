import * as Yup from "yup"


const articleSchema = Yup.object().shape({

    title: Yup.string().required('Title is required!'),
    text: Yup.string().required('Text is required!')

}).noUnknown(true).strict()

const validateArticlePost = async (req, res, next) => {
    try {
        await articleSchema.validate(req.body)
        return next()
    } catch (err) {
        return res.status(404).json({ type: err.name, message: err.message })
    }
}

export default validateArticlePost