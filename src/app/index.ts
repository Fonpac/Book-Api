import express from 'express'
import cors from 'cors'

const app: express.Application = express()

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: false
    })
)

app.use(express.json())

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: 'pass'
    })
})

import user from '../routes/user'
app.use('/user', user)

import book from '../routes/book'
app.use('/book', book)

import review from '../routes/review'
app.use('/review', review)

import comment from '../routes/comment'
app.use('/comment', comment)

export default app
