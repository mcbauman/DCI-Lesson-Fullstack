import mongoose from 'mongoose'

const { Schema, model } = mongoose
const required = true
const trim = true
const unique = true

const userSchema = new Schema({
    username: { type: String, required, trim, unique },
    email:    { type: String, required, trim, unique },
})

const User = model("user", userSchema)

export default User