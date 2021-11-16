require('dotenv').config()

import app from './app'

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
