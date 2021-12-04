import { Request, Response, Router } from 'express'
import { validationMiddleware } from '../middlewares/validation'
import { authenticationMiddleware } from '../middlewares/authenticated'
import { CreateCommentData, CreateCommentSchema, UpdateCommentData, UpdateCommentSchema } from '../validators/comment'
import CommentModel from '../models/comment'
import UserModel from '../models/user';
const router = Router()

router.get('/', authenticationMiddleware, async (req: Request, res: Response) => {
    const comments = await CommentModel.getAll();
    comments.map(async (comment) => {
        comment.user = await UserModel.byId(comment.created_by);
    })
    res.json(comments);
})

router.post(
    '/',
    authenticationMiddleware,
    validationMiddleware(CreateCommentSchema),
    async (req: Request, res: Response) => {
        const data: CreateCommentData = req.body

        const [id] = await CommentModel.new({ ...data, created_by: res.locals.payload.id })

        const newReview = await CommentModel.byId(id)

        return res.json(newReview)
    }
)

router.patch(
    '/:id',
    authenticationMiddleware,
    validationMiddleware(UpdateCommentSchema),
    async (req: Request, res: Response) => {
        const data: UpdateCommentData = req.body
        const id = Number(req.params.id)

        const comment = await CommentModel.byId(id)
        if (!comment || comment.created_by != res.locals.payload.id) {
            return res.status(401).json({
                error: {
                    code: 'UNAUTHENTICATED',
                    message: 'NOT_ENOUGH_PERMISSION'
                }
            })
        }

        await CommentModel.update(id, data)

        const updatedComment = await CommentModel.byId(id)

        return res.json(updatedComment)
    }
)

router.delete('/:id', authenticationMiddleware, async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const comment = await CommentModel.byId(id)
    if (!comment || comment.created_by != res.locals.payload.id) {
        return res.status(401).json({
            error: {
                code: 'UNAUTHENTICATED',
                message: 'NOT_ENOUGH_PERMISSION'
            }
        })
    }

    await CommentModel.delete(id)

    return res.send(200)
})

export default router
