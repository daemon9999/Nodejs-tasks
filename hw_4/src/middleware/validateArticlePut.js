import * as Yup from "yup"



const articleSchema = Yup.object().shape({

    title: Yup.string(),
    text: Yup.string()

}).noUnknown(true).strict()

const validateArticlePut = async (req, res, next) => {
    try {
        await articleSchema.validate(req.body)
        return next()
    } catch (err) {
        return res.status(404).json({ type: err.name, message: err.message })
    }
}

export default validateArticlePut