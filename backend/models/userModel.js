const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cartData:{
        type:Object,
        default:{}
    }
})
const userModel = mongoose.models.User || mongoose.model("User",userSchema)
module.exports = userModel  