import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'

export const validationMiddleware =
    (validationSchema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            await validationSchema.validateAsync(req.body)
        } catch (e) {
            return res.status(400).json({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: e
                }
            })
        }
        next()
    }
