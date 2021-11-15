import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'teste'

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers || !req.headers['authorization']) {
        return res.status(400).json({
            error: {
                code: 'UNAUTHENTICATED',
                message: 'UNAUTHENTICATED'
            }
        })
    }

    let [tokenType, token]: string[] = req.headers['authorization'].split(' ')

    if (tokenType != 'Bearer') {
        return res.status(400).json({
            error: {
                code: 'UNAUTHENTICATED',
                message: 'UNAUTHENTICATED'
            }
        })
    }

    try {
        let payload = jwt.verify(token, JWT_SECRET)
        res.locals.payload = payload
    } catch (e) {
        console.log(e)
    }

    next()
}
