const express = require("express")
const {placeOrder,updateStatus,verifyOrder,userOrders,listOrders} = require('../controllers/orderController')
const orderRouter = express.Router()
const authMiddelware = require('../middlewares/auth')

orderRouter.post('/place',authMiddelware,placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.get('/userorders',authMiddelware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)

module.exports = orderRouter