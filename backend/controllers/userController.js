const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require("validator")


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_TOKEN_SECRET)
} 

const loginUser = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(!user) return res.status(400).json({'message':'Invalid Email or Password'})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(400).json({'message':'Invalid Email or Password'})
        const token = createToken(user._id)
        res.status(200).json({token})
    }
    catch(error){
        console.log(error)
        res.status(500).json({'message':'Invalid Server Error'})
    }
}

const registerUser = async (req,res)=>{
    const {name,email,password} = req.body
    try{
        const exists = await userModel.findOne({email})
        if(exists)
            return res.status(400).json({'message':'Email already exists'})
        if(!validator.isEmail(email))
            return res.status(400).json({'message':'Invalid E-mail '})
        if(password.legth<8)
            return res.status(400).json({'message':'Password must be atleast 8 chars long'})

        const hashedpassword = await bcrypt.hash(password,10)
        const user = await userModel.create({
            name,
            email,
            password:hashedpassword
        })
        res.status(201).json({'message':'User registered Successfully',user})
    }
    catch(error){
        console.log(error)
        res.status(500).json({'message':'Invalid Server Error'})
    }   
}

module.exports = {loginUser,registerUser}