const mongoose = require('mongoose')
const connectDB = async ()=>{
    await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DataBase is Connected");
    })
}
module.exports = connectDB