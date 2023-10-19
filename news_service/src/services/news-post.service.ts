import { AppDataSource } from "../data-source.ts";
import { CreateNewsPostDto, UpdateNewsPostDto } from "../dto/news-post.dto.ts";
import { NewsPost } from "../entity/news-post.entity.ts";





const getNewsPosts = async() => {
    const newsPosts = await AppDataSource.getRepository(NewsPost).find()
    return newsPosts
}


const getNewsPostById = async(id: number) => {
    const newsPost = await AppDataSource.getRepository(NewsPost).findOneBy({
        id
    })
    return newsPost
}


const createNewsPost = async(body: CreateNewsPostDto) => {
    const newsPost = AppDataSource.getRepository(NewsPost).create(body)
    const result = AppDataSource.getRepository(NewsPost).save(newsPost)
    return result
}


const updateNewsPostById = async(id: number, body: UpdateNewsPostDto) => {
    const newsPostToUpdate = await AppDataSource.getRepository(NewsPost).findOneBy({id})
    AppDataSource.getRepository(NewsPost).merge(newsPostToUpdate, body)
    const result = await AppDataSource.getRepository(NewsPost).save(newsPostToUpdate)
    return result
}

const deleteNewsPostById = async(id: number) => {
    const result = await AppDataSource.getRepository(NewsPost).delete(id)
    return result
}


export default {
    getNewsPosts,
    getNewsPostById,
    createNewsPost,
    updateNewsPostById,
    deleteNewsPostById
}