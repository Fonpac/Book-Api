import { Request, Response, Router } from 'express'
import { authenticationMiddleware } from '../middlewares/authenticated'
import { validationMiddleware } from '../middlewares/validation'
import { CreateReviewData, CreateReviewSchema, UpdateReviewData, UpdateReviewSchema } from '../validators/review'
import ReviewModel from '../models/review'

const router = Router()

router.post(
    '/',
    authenticationMiddleware,
    validationMiddleware(CreateReviewSchema),
    async (req: Request, res: Response) => {
        const data: CreateReviewData = req.body

        const [id] = await ReviewModel.new({ ...data, created_by: res.locals.payload.id })

        const newReview = await ReviewModel.byId(id)

        return res.json(newReview)
    }
)

router.patch(
    '/:id',
    authenticationMiddleware,
    validationMiddleware(UpdateReviewSchema),
    async (req: Request, res: Response) => {
        const data: UpdateReviewData = req.body
        const id = Number(req.params.id)

        const review = await ReviewModel.byId(id)
        if (!review || review.created_by != res.locals.payload.id) {
            return res.status(401).json({
                error: {
                    code: 'UNAUTHENTICATED',
                    message: 'NOT_ENOUGH_PERMISSION'
                }
            })
        }

        await ReviewModel.update(id, data)

        const updatedReview = await ReviewModel.byId(id)

        return res.json(updatedReview)
    }
)

router.delete('/:id', authenticationMiddleware, async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const review = await ReviewModel.byId(id)
    if (!review || review.created_by != res.locals.payload.id) {
        return res.status(401).json({
            error: {
                code: 'UNAUTHENTICATED',
                message: 'NOT_ENOUGH_PERMISSION'
            }
        })
    }

    await ReviewModel.delete(id)

    return res.send(200)
})

export default router
