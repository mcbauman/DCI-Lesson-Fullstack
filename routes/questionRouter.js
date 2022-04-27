import express from 'express'
import createError from 'http-errors'
import Question from '../models/Question.js'
import User from '../models/User.js'

const questionRouter = express.Router()

questionRouter.get("/", async (req, res) => {
    const questions = await Question.find(req.query)
    res.send(questions)
})

questionRouter.get("/:id", async (req, res, next) => {
    try {
        const q = await Question.findById(req.params.id)
        if (!q) {
            next(createError(404, "Question not found"))
        } else {
            res.send(q)
        }
    } catch (e) {
        next(e)
    }
})

questionRouter.post("/", async (req, res, next) => {
    try {
        const author=await User.findById(req.body.author)
        if(!author){
            return next(createError(404,"User not found"))
        }
        const question = await Question.create(req.body)
        res.send(question)
    } catch (err) {
        next(createError(400, err.message))
    }
})

questionRouter.patch("/:id", async (req, res, next) => {
    try {
        const options = { new: true, runValidators: true }
        const id = req.params.id
        const question = await Question.findByIdAndUpdate(id, req.body, options)
        if (!question) {
            return next(createError(404, "Question not found"))
        }
        res.send(question)
    } catch (error) {
        next(createError(400, error.message))
    }
})

questionRouter.delete("/:id", async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id)
        if (!question) {
            return next(createError(404, "Question not found"))
        }
        question.remove()
        res.send({ ok: true })
    } catch (err) {
        next(createError(400, err.message))
    }
})

export default questionRouter