const mongoose = require("mongoose")


const dbconnection = async () => {
    mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connection successfully")
}

module.exports = dbconnection