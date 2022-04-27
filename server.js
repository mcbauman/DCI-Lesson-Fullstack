import express from 'express'
import dotenv from 'dotenv'
import createError from 'http-errors'
import { connect } from './lib/database.js'
import questionRouter from './routes/questionRouter.js'
import userRouter from './routes/userRouter.js'

dotenv.config()
const app = express()
app.use(express.json())
connect()

app.get("/", (req, res) => {
    res.send("Hello world")
    // If we would want to, we could close the database connection
    // mongoose.connection.close()
})

app.use("/questions", questionRouter)
app.use("/users", userRouter)

// 404 handling middleware
app.use((req, res, next) => {
    next(
        createError(404, `Resource ${req.method} ${req.url} not found`)
    )
})

// Global error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: error.message || "Something went wrong"
    })
})

app.listen(process.env.PORT, () => {
    console.log("Up: http://localhost:" + process.env.PORT)
})