import mongoose from 'mongoose'

const { Schema, model } = mongoose
const required = true
const trim = true
const unique = true

/* Subducoment, like nested
 {
    name:name
    adress:{
        street:
        number
    }
 }*/
const adressSchema= new Schema({
    street:{type:String,trim},
    number:{type:Number},
    zip:{type:Number,required},
    city:{type:String,required},
    country:{type:String,required}
},{_id:false})

const userSchema = new Schema({
    username:   { type: String, required, trim, unique },
    email:      { type: String, required, trim, unique },
    mainAdress: {type:adressSchema,required},
    altAdress:  {type:[adressSchema]},
    questions:  {type:[Schema.Types.ObjectId],ref:"question"}
})

const User = model("user", userSchema)

export default User