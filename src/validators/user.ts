import Joi from 'joi'

export interface LoginData {
    email: string
    password: string
}

export const LoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export interface RegisterData {
    name: string
    surname: string
    email: string
    password: string
}

export const RegisterSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})
