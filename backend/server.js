const express = require('express')
const app = express()
const connectDB = require('./config/dbConnection')
const userRouter = require('./routes/userRouter')
const PORT = process.env.PORT || 4000

// Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const cors = require('cors')
app.use(cors())
require('dotenv').config()
app.use('/image',express.static('uploads'))

connectDB()

app.use('/api/food',require('./routes/foodRouter'))
app.use('/api/user',userRouter)
app.use('/api/cart',require('./routes/cartRouter'))
app.use('/api/order',require('./routes/orderRouter'))



app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})