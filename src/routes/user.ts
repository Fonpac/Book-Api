import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { LoginData, LoginSchema, RegisterData, RegisterSchema } from '../validators/user'
import { validationMiddleware } from '../middlewares/validation'
import { authenticationMiddleware } from '../middlewares/authenticated'
import userModel from '../models/user'

const router = Router()

const JWT_SECRET = 'teste'

router.post('/login', validationMiddleware(LoginSchema), async (req: Request, res: Response) => {
    const data: LoginData = req.body

    const user = await userModel.byEmail(data.email)

    if (!user) {
        return res.status(400).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'USER_NOT_FOUND'
            }
        })
    }

    let valid = await bcrypt.compare(data.password, user.password)

    if (!valid) {
        return res.status(400).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'INVALID_CREDENTIALS'
            }
        })
    }

    let token = await jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
        },
        JWT_SECRET
    )

    return res.json({ token })
})

router.post('/register', validationMiddleware(RegisterSchema), async (req: Request, res: Response) => {
    const data: RegisterData = req.body
    const user = await userModel.byEmail(data.email)
    if (user) {
        return res.status(400).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'EMAIL_ALREADY_REGISTERED'
            }
        })
    }

    data.password = await bcrypt.hash(data.password, 10)

    const [id] = await userModel.new(data)

    const { password, ...infoForToken } = data

    let token = await jwt.sign(
        {
            id,
            ...infoForToken
        },
        JWT_SECRET
    )

    return res.json({ token })
})

router.get('/me', authenticationMiddleware, async (req: Request, res: Response) => {
    let user = await userModel.byId(res.locals.payload.id)
    delete user.password
    return res.json(user)
})

export default router
