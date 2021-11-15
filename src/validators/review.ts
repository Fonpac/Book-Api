import Joi from 'joi'

export interface CreateReviewData {
    title: string
    text: string
    score: string
    book_id: string
}

export const CreateReviewSchema = Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    score: Joi.string().required(),
    book_id: Joi.string().required()
})

export interface UpdateReviewData {
    title?: string
    text?: string
    score?: string
}

export const UpdateReviewSchema = Joi.object({
    title: Joi.string(),
    text: Joi.string(),
    score: Joi.string()
})
