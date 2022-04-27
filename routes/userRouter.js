import express from 'express'
import createError from 'http-errors'
import User from '../models/User.js'

const userRouter = express.Router()

userRouter
    .get("/", async (req, res, next) => {
        const users = await User.find(req.query)
        res.send(users)
    })
    .get("/:id", async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return next(createError(404, "Question not found"))
            }
            res.send(user)
        } catch (e) {
            next(e)
        }
    })
    .post("/", async (req, res, next) => {
        try {
            const user = await User.create(req.body)
            res.send(user)
        } catch (err) {
            next(createError(400, err.message))
        }
    })
    .delete("/:id", async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return next(createError(404, "User not found"))
            }
            user.remove()
            res.send({ ok: true })
        } catch (err) {
            next(createError(400, err.message))
        }
    })

export default userRouter