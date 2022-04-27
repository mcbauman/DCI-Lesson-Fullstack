import mongoose from 'mongoose'

const { Schema, model } = mongoose
const required = true
const trim = true
const unique = true

const questionSchema = new Schema({
    author:   { type: Schema.Types.ObjectId,ref:"user", required },
    title:    { type: String, required, trim, unique },
    content:  { type: String, required, trim },
    category: { type: String, required, default: "Random" },
    type:     { type: String, required, enum: ["internal", "external"] },
    source:   String,
})

const Question = model("question", questionSchema)

export default Question

// the enum is _very_ basic validation
// the trim is _very_ basic sanitization / sanitation
