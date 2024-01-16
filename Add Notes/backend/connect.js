const mongoose = require('mongoose')

const connectDB = async()=> {
    return mongoose.connect('mongodb://localhost:27017/add-notes').then(()=> console.log('Database connected')).catch((err)=> console.log("Database connection error",err))
}

module.exports = {connectDB}