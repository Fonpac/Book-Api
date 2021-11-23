import Joi from 'joi'

export interface CreateCommentData {
    text: string
    review_id: number
}

export const CreateCommentSchema = Joi.object({
    text: Joi.string().required(),
    review_id: Joi.number().required()
})

export interface UpdateCommentData {
    text: string
}

export const UpdateCommentSchema = Joi.object({
    text: Joi.string().required()
})
