const express = require("express")
const authMiddelware = require('../middlewares/auth')
const {addToCart,getCart,removeFromCart} = require('../controllers/cartController')

const cartRouter = express.Router()

cartRouter.post('/add',authMiddelware,addToCart)
cartRouter.get('/get',authMiddelware,getCart)
cartRouter.delete('/remove',authMiddelware,removeFromCart)

module.exports = cartRouter