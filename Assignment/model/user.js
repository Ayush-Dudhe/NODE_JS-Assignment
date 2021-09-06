const mongoose =require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{type: String, require :true, unique:true},
    password:{type: String, require :true} ,
    number: {type: Number  , require :true},
    email:{type: String, require :true} 
},{ collecton : 'users'}
)

const model= mongoose.model('UserSchema',UserSchema)
module.exports= model