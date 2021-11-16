import Joi from 'joi'

export interface CreateCommentData {
    text: string
    book_id: string
}

export const CreateCommentSchema = Joi.object({
    text: Joi.string().required(),
    book_id: Joi.string().required()
})

export interface UpdateCommentData {
    text: string
}

export const UpdateCommentSchema = Joi.object({
    text: Joi.string().required()
})
