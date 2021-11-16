import { Request, Response, Router } from 'express'
import { authenticationMiddleware } from '../middlewares/authenticated'
import BookModel from '../models/book'

const router = Router()

router.get('/:id', authenticationMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id
    const user_id = res.locals.payload.id
    const reviews = await BookModel.reviews(id)
    const comments = await BookModel.comments(id)
    const upvotes = await BookModel.upvotes(
        reviews.map((r) => r.id),
        comments.map((c) => c.id)
    )

    res.json({
        reviews: reviews.map((review) => {
            return {
                ...review,
                upvotes: upvotes.find((up) => up.review_id == review.id),
                liked_by_current_user: upvotes.find((up) => up.user_id == user_id && up.review_id != null)
            }
        }),
        comments: comments.map((comment) => {
            return {
                ...comment,
                upvotes: upvotes.find((up) => up.comment_id == comment.id),
                liked_by_current_user: upvotes.find((up) => up.user_id == user_id && up.comment != null)
            }
        })
    })
})

export default router
