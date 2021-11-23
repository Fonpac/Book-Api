import mysql from '../libraries/mysql'

export default {
    reviews(id: string) {
        return mysql('review').where('book_id', id)
    },
    comments(id: number[]) {
        return mysql('comment').whereIn('review_id', id)
    },
    upvotes(comments: number[], reviews: number[]) {
        return mysql('upvote').whereIn('comment_id', comments).orWhereIn('review_id', reviews)
    }
}
